package br.com.gtechsolutions.intelliwatts.integrations.datascience.dto;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record DataScienceAnaliseResponse(
        @NotBlank
        @Pattern(regexp = "Eficiente|Moderado|Ineficiente")
        String categoria,

        @NotNull
        @DecimalMin("0.0")
        @DecimalMax("1.0")
        BigDecimal probabilidade,

        @NotNull
        @Size(min = 1)
        List<@Valid Recomendacao> recomendacoes,

        @NotNull
        @Valid
        @JsonProperty("estimativa_financeira")
        EstimativaFinanceira estimativaFinanceira,

        @NotBlank
        @JsonProperty("modelo_versao")
        String modeloVersao
) {

    public record Recomendacao(
            @NotBlank String causa,
            @NotBlank String descricao
    ) {
    }

    public record EstimativaFinanceira(
            @NotNull
            @DecimalMin(value = "0.0", inclusive = false)
            @JsonProperty("consumo_kwh")
            BigDecimal consumoKwh,

            @NotNull
            @DecimalMin(value = "0.0", inclusive = false)
            @JsonProperty("tarifa_referencia")
            BigDecimal tarifaReferencia,

            @NotNull
            @DecimalMin("0.0")
            @JsonProperty("custo_estimado")
            BigDecimal custoEstimado
    ) {
    }
}
