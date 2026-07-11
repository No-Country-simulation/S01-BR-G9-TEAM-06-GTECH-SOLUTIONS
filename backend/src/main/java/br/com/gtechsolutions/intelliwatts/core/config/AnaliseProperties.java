package br.com.gtechsolutions.intelliwatts.core.config;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "intelliwatts.analise")
public record AnaliseProperties(
        @NotNull
        @DecimalMin(value = "0.0", inclusive = false)
        BigDecimal tarifaReferencia
) {
}
