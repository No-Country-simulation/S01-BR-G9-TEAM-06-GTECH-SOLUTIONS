package br.com.gtechsolutions.intelliwatts.core.ratelimit;

import java.time.Duration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "intelliwatts.rate-limit")
public record RateLimitProperties(
        @NotNull Duration janela,
        @Min(1) @Max(100_000) int analisesPorJanela,
        @Min(1) @Max(100_000) int loginsPorJanela,
        @Min(1) @Max(100_000) int cadastrosPorJanela,
        @Min(1) @Max(100_000) int csrfPorJanela,
        @Min(1) @Max(100_000) int maximoChaves
) {

    private static final Duration JANELA_MAXIMA = Duration.ofHours(1);

    @AssertTrue(message = "deve durar de um milissegundo até menos de uma hora")
    public boolean isJanelaValida() {
        return janela != null
                && janela.toMillis() >= 1
                && janela.compareTo(JANELA_MAXIMA) < 0;
    }
}
