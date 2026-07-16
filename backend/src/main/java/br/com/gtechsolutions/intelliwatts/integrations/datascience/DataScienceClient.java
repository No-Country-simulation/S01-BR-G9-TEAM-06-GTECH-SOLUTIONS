package br.com.gtechsolutions.intelliwatts.integrations.datascience;

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

@Component
public class DataScienceClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataScienceClient.class);

    private final RestClient restClient;
    private final DataScienceProperties properties;
    private final Validator validator;

    public DataScienceClient(
            RestClient dataScienceRestClient,
            DataScienceProperties properties,
            Validator validator
    ) {
        this.restClient = dataScienceRestClient;
        this.properties = properties;
        this.validator = validator;
    }

    public DataScienceAnaliseResponse analisar(DataScienceAnaliseRequest request) {
        DataScienceAnaliseResponse response;

        try {
            response = restClient.post()
                    .uri(properties.caminhoInferencia())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(DataScienceAnaliseResponse.class);
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
