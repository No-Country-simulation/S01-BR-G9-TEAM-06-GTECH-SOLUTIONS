package br.com.gtechsolutions.intelliwatts.core.http;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Validated
@ConfigurationProperties(prefix = "intelliwatts.http")
public record HttpRequestProperties(
        @Min(1)
        @Max(1_048_576)
        int tamanhoMaximoCorpoBytes
) {
}
