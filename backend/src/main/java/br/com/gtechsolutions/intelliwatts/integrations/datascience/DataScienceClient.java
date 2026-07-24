package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

import br.com.gtechsolutions.intelliwatts.core.exceptions.ServicoInferenciaIndisponivelException;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseRequest;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.json.JsonMapper;

@Component
public class DataScienceClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataScienceClient.class);

    private final RestClient restClient;
    private final DataScienceProperties properties;
    private final Validator validator;
    private final JsonMapper jsonMapper;

    public DataScienceClient(
            RestClient dataScienceRestClient,
            DataScienceProperties properties,
            Validator validator,
            JsonMapper jsonMapper
    ) {
        this.restClient = dataScienceRestClient;
        this.properties = properties;
        this.validator = validator;
        this.jsonMapper = jsonMapper;
    }

    public DataScienceAnaliseResponse analisar(DataScienceAnaliseRequest request) {
        DataScienceAnaliseResponse response;

        try {
            response = restClient.post()
                    .uri(properties.caminhoInferencia())
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .body(request)
                    .exchange((requestHttp, responseHttp) ->
                            lerResponseLimitada(responseHttp));
        } catch (ServicoInferenciaIndisponivelException exception) {
            throw exception;
        } catch (RestClientException exception) {
            LOGGER.warn("Falha ao chamar o serviço de inferência: {}", exception.getMessage());
            LOGGER.debug("Detalhes da falha no serviço de inferência", exception);
            throw new ServicoInferenciaIndisponivelException(
                    "Não foi possível obter a análise energética",
                    exception
            );
        }

        if (response == null) {
            throw new ServicoInferenciaIndisponivelException(
                    "O serviço de inferência retornou uma resposta vazia"
            );
        }

        validarResponse(response);
        return response;
    }

    private DataScienceAnaliseResponse lerResponseLimitada(
            RestClient.RequestHeadersSpec.ConvertibleClientHttpResponse response
    ) throws IOException {
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw response.createException();
        }

        MediaType contentType = response.getHeaders().getContentType();
        if (contentType == null
                || !MediaType.APPLICATION_JSON.isCompatibleWith(contentType)) {
            throw new ServicoInferenciaIndisponivelException(
                    "O serviço de inferência retornou um tipo de conteúdo inválido"
            );
        }

        int limite = properties.tamanhoMaximoRespostaBytes();
        byte[] body = response.getBody().readNBytes(limite + 1);

        if (body.length > limite) {
            throw new ServicoInferenciaIndisponivelException(
                    "A resposta excedeu o limite permitido"
            );
        }

        if (body.length == 0) {
            return null;
        }

        try {
            return jsonMapper.readValue(body, DataScienceAnaliseResponse.class);
        } catch (JacksonException exception) {
            LOGGER.warn(
                    "O serviço de inferência retornou JSON inválido: {}",
                    exception.getOriginalMessage());
            LOGGER.debug(
                    "Detalhes da desserialização da resposta de inferência",
                    exception);
            throw new ServicoInferenciaIndisponivelException(
                    "O serviço de inferência retornou uma resposta inválida",
                    exception
            );
        }
    }

    private void validarResponse(DataScienceAnaliseResponse response) {
        Set<ConstraintViolation<DataScienceAnaliseResponse>> violations = validator.validate(response);

        if (!violations.isEmpty()) {
            String details = violations.stream()
                    .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
                    .sorted()
                    .collect(Collectors.joining(", "));

            LOGGER.warn("Resposta inválida do serviço de inferência: {}", details);
            throw new ServicoInferenciaIndisponivelException(
                    "O serviço de inferência retornou uma resposta inválida"
            );
        }
    }
}
