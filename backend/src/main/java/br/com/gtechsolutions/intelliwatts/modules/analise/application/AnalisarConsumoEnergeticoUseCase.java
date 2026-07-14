package br.com.gtechsolutions.intelliwatts.modules.analise.application;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.stereotype.Service;

import br.com.gtechsolutions.intelliwatts.core.config.AnaliseProperties;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.DataScienceClient;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.DataScienceMapper;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseRequest;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseResponse;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaRequest;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaResponse;

@Service
public class AnalisarConsumoEnergeticoUseCase {

    private final AnaliseProperties properties;
    private final DataScienceClient dataScienceClient;
    private final DataScienceMapper mapper;

    public AnalisarConsumoEnergeticoUseCase(
            AnaliseProperties properties,
            DataScienceClient dataScienceClient,
            DataScienceMapper mapper) {
        this.properties = properties;
        this.dataScienceClient = dataScienceClient;
        this.mapper = mapper;
    }

    public AnaliseEnergeticaResponse executar(AnaliseEnergeticaRequest request) {
        DataScienceAnaliseRequest dataScienceRequest = mapper.toDataScienceRequest(
                request);

        DataScienceAnaliseResponse dataScienceResponse = dataScienceClient.analisar(
                dataScienceRequest);

        BigDecimal custoEstimadoMensal = calcularCustoMensal(
                request.consumoKwh());

        return mapper.toApiResponse(
                dataScienceResponse,
                custoEstimadoMensal);
    }

    private BigDecimal calcularCustoMensal(BigDecimal consumoKwh) {
        return consumoKwh
                .multiply(properties.tarifaReferencia())
                .setScale(2, RoundingMode.HALF_UP);
    }
}
