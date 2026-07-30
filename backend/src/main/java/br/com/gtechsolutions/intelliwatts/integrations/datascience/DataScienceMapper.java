package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import java.math.BigDecimal;

import org.springframework.stereotype.Component;

import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseRequest;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseResponse;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaRequest;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaResponse;

@Component
public class DataScienceMapper {

    public DataScienceAnaliseRequest toDataScienceRequest(
            AnaliseEnergeticaRequest request) {
        return new DataScienceAnaliseRequest(
                request.consumoKwh(),
                request.usoHorarioPico(),
                request.quantidadeEquipamentos(),
                request.tipoImovel(),
                request.horasAltoConsumo());
    }

    public AnaliseEnergeticaResponse toApiResponse(
            DataScienceAnaliseResponse response,
            BigDecimal custoEstimadoMensal) {
        return new AnaliseEnergeticaResponse(
                response.categoria(),
                response.probabilidade(),
                response.recomendacoes(),
                custoEstimadoMensal);
    }
}
