package br.com.gtechsolutions.intelliwatts.modules.analise.api.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record AnaliseEnergeticaRequest(
        @NotNull(message = "consumoKwh é obrigatório")
        @DecimalMin(value = "0.0", inclusive = false, message = "consumoKwh deve ser maior que zero")
        BigDecimal consumoKwh,

        @NotNull(message = "usoHorarioPico é obrigatório")
        Boolean usoHorarioPico,

        @NotNull(message = "quantidadeEquipamentos é obrigatória")
        @Min(value = 0, message = "quantidadeEquipamentos não pode ser negativa")
        Integer quantidadeEquipamentos,

        @NotBlank(message = "tipoImovel é obrigatório")
        @Pattern(
                regexp = "Casa|Apartamento|Comércio",
                message = "tipoImovel deve ser Casa, Apartamento ou Comércio"
        )
        String tipoImovel,

        @NotNull(message = "horasAltoConsumo é obrigatório")
        @Min(value = 0, message = "horasAltoConsumo deve ser no mínimo zero")
        @Max(value = 24, message = "horasAltoConsumo deve ser no máximo 24")
        Integer horasAltoConsumo
) {
}
