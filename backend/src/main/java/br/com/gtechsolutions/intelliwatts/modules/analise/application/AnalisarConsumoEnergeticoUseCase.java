package br.com.gtechsolutions.intelliwatts.modules.analise.application;

import java.math.BigDecimal;

import br.com.gtechsolutions.intelliwatts.core.config.AnaliseProperties;
import br.com.gtechsolutions.intelliwatts.core.exceptions.ServicoInferenciaIndisponivelException;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.DataScienceClient;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.DataScienceMapper;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseRequest;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseResponse;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaRequest;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaResponse;
import org.springframework.stereotype.Service;

@Service
public class AnalisarConsumoEnergeticoUseCase {

    private final AnaliseProperties properties;
    private final DataScienceClient dataScienceClient;
    private final DataScienceMapper mapper;

    public AnalisarConsumoEnergeticoUseCase(
            AnaliseProperties properties,
            DataScienceClient dataScienceClient,
            DataScienceMapper mapper
    ) {
        this.properties = properties;
        this.dataScienceClient = dataScienceClient;
        this.mapper = mapper;
    }

    public AnaliseEnergeticaResponse executar(AnaliseEnergeticaRequest request) {
        DataScienceAnaliseRequest dataScienceRequest = mapper.toDataScienceRequest(
                request,
                properties.tarifaReferencia()
        );

        DataScienceAnaliseResponse dataScienceResponse = dataScienceClient.analisar(dataScienceRequest);
        validarConsistencia(dataScienceRequest, dataScienceResponse);

        return mapper.toApiResponse(dataScienceResponse);
    }

    private void validarConsistencia(
            DataScienceAnaliseRequest request,
            DataScienceAnaliseResponse response
    ) {
        DataScienceAnaliseResponse.EstimativaFinanceira estimativa = response.estimativaFinanceira();

        if (diferente(request.consumoKwh(), estimativa.consumoKwh())
                || diferente(request.tarifaReferencia(), estimativa.tarifaReferencia())) {
            throw new ServicoInferenciaIndisponivelException(
                    "O serviço de inferência retornou dados incompatíveis com a requisição"
            );
        }
    }

    private boolean diferente(BigDecimal expected, BigDecimal actual) {
        return expected.compareTo(actual) != 0;
    }
}
