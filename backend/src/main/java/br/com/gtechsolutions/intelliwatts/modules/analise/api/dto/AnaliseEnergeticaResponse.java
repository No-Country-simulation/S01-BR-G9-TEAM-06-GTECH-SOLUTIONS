package br.com.gtechsolutions.intelliwatts.modules.analise.api.dto;

import java.math.BigDecimal;
import java.util.List;

public record AnaliseEnergeticaResponse(
        String categoria,
        BigDecimal probabilidade,
        List<Recomendacao> recomendacoes,
        EstimativaFinanceira estimativaFinanceira,
        String modeloVersao
) {

    public record Recomendacao(
            String causa,
            String descricao
    ) {
    }

    public record EstimativaFinanceira(
            BigDecimal consumoKwh,
            BigDecimal tarifaReferencia,
            BigDecimal custoEstimado
    ) {
    }
}
