package br.com.gtechsolutions.intelliwatts.core.security;

import java.time.Duration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "intelliwatts.security.session")
public record SessionSecurityProperties(
        @NotNull Duration timeout
) {

    private static final Duration MINIMO = Duration.ofMinutes(5);
    private static final Duration MAXIMO = Duration.ofHours(24);

    @AssertTrue(message = "deve durar entre cinco minutos e vinte e quatro horas")
    public boolean isTimeoutValido() {
        return timeout != null
                && timeout.compareTo(MINIMO) >= 0
                && timeout.compareTo(MAXIMO) <= 0;
    }
}
