package br.com.gtechsolutions.intelliwatts.integrations.datascience.dto;

import java.math.BigDecimal;
import java.util.List;

import br.com.gtechsolutions.intelliwatts.core.validation.MaxUtf8Bytes;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record DataScienceAnaliseResponse(
        @NotBlank @Pattern(regexp = "Eficiente|Moderado|Ineficiente") String categoria,

        @NotNull @DecimalMin("0.0") @DecimalMax("1.0") BigDecimal probabilidade,

        @NotNull
        @Size(min = 1, max = 10)
        List<@NotBlank @MaxUtf8Bytes(500) String> recomendacoes) {
}
