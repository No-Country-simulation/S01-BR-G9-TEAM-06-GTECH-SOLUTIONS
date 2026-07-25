package br.com.gtechsolutions.intelliwatts.modules.analise.api.dto;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AnaliseEnergeticaResponse(
        String categoria,
        BigDecimal probabilidade,
        List<String> recomendacoes,

        @JsonProperty("custo_estimado_mensal") BigDecimal custoEstimadoMensal) {
}
