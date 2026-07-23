package br.com.gtechsolutions.intelliwatts.modules.analise.api.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record AnaliseEnergeticaRequest(
        @JsonProperty("consumo_kwh")
        @NotNull(message = "consumo_kwh é obrigatório")
        @DecimalMin(
                value = "0.0",
                inclusive = false,
                message = "consumo_kwh deve ser maior que zero")
        @DecimalMax(
                value = "700",
                message = "consumo_kwh deve ser no máximo 700")
        BigDecimal consumoKwh,

        @JsonProperty("uso_horario_pico")
        @NotNull(message = "uso_horario_pico é obrigatório")
        Boolean usoHorarioPico,

        @JsonProperty("quantidade_equipamentos")
        @NotNull(message = "quantidade_equipamentos é obrigatória")
        @Min(
                value = 1,
                message = "quantidade_equipamentos deve ser no mínimo 1")
        @Max(
                value = 17,
                message = "quantidade_equipamentos deve ser no máximo 17")
        Integer quantidadeEquipamentos,

        @JsonProperty("tipo_imovel")
        @NotBlank(message = "tipo_imovel é obrigatório")
        @Pattern(
                regexp = "Casa|Apartamento|Comércio",
                message = "tipo_imovel deve ser Casa, Apartamento ou Comércio")
        String tipoImovel,

        @JsonProperty("horas_alto_consumo")
        @NotNull(message = "horas_alto_consumo é obrigatório")
        @Min(
                value = 1,
                message = "horas_alto_consumo deve ser no mínimo 1")
        @Max(
                value = 24,
                message = "horas_alto_consumo deve ser no máximo 24")
        Integer horasAltoConsumo
) {
}
