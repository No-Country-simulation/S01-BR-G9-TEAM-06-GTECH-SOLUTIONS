package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import java.math.BigDecimal;
import java.util.List;

import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseRequest;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseResponse;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaRequest;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaResponse;
import org.springframework.stereotype.Component;

@Component
public class DataScienceMapper {

    public DataScienceAnaliseRequest toDataScienceRequest(
            AnaliseEnergeticaRequest request,
            BigDecimal tarifaReferencia
    ) {
        return new DataScienceAnaliseRequest(
                request.consumoKwh(),
                request.usoHorarioPico(),
                request.quantidadeEquipamentos(),
                request.tipoImovel(),
                request.horasAltoConsumo(),
                tarifaReferencia
        );
    }

    public AnaliseEnergeticaResponse toApiResponse(DataScienceAnaliseResponse response) {
        List<AnaliseEnergeticaResponse.Recomendacao> recomendacoes = response.recomendacoes().stream()
                .map(recomendacao -> new AnaliseEnergeticaResponse.Recomendacao(
                        recomendacao.causa(),
                        recomendacao.descricao()
                ))
                .toList();

        DataScienceAnaliseResponse.EstimativaFinanceira estimativa = response.estimativaFinanceira();

        return new AnaliseEnergeticaResponse(
                response.categoria(),
                response.probabilidade(),
                recomendacoes,
                new AnaliseEnergeticaResponse.EstimativaFinanceira(
                        estimativa.consumoKwh(),
                        estimativa.tarifaReferencia(),
                        estimativa.custoEstimado()
                ),
                response.modeloVersao()
        );
    }
}
