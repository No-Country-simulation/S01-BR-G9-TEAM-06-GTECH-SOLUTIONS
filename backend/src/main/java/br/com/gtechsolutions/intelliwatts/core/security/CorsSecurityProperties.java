package br.com.gtechsolutions.intelliwatts.core.security;

import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.AssertTrue;

@Validated
@ConfigurationProperties(prefix = "intelliwatts.security.cors")
public record CorsSecurityProperties(
        String origensPermitidas
) {

    private static final Set<String> HOSTS_LOOPBACK = Set.of(
            "localhost",
            "127.0.0.1",
            "::1",
            "[::1]"
    );

    public CorsSecurityProperties {
        origensPermitidas = origensPermitidas == null
                ? ""
                : origensPermitidas.trim();
    }

    public List<String> origens() {
        if (origensPermitidas.isBlank()) {
            return List.of();
        }

        return Arrays.stream(origensPermitidas.split(",", -1))
                .map(String::trim)
                .toList();
    }

    @AssertTrue(message = "deve conter somente origens HTTPS exatas "
            + "ou HTTP em localhost e loopback")
    public boolean isOrigensPermitidasValidas() {
        return origens().stream().allMatch(
                CorsSecurityProperties::isOrigemSegura);
    }

    private static boolean isOrigemSegura(String origem) {
        if (origem.isBlank()
                || "*".equals(origem)
                || "null".equalsIgnoreCase(origem)
                || origem.contains("*")) {
            return false;
        }

        try {
            URI uri = URI.create(origem);
            if (uri.getScheme() == null
                    || uri.getHost() == null
                    || uri.getUserInfo() != null
                    || uri.getQuery() != null
                    || uri.getFragment() != null
                    || (uri.getRawPath() != null
                            && !uri.getRawPath().isEmpty())
                    || uri.getPort() == 0
                    || uri.getPort() > 65_535) {
                return false;
            }

            String scheme = uri.getScheme().toLowerCase(Locale.ROOT);
            if ("https".equals(scheme)) {
                return true;
            }

            return "http".equals(scheme)
                    && HOSTS_LOOPBACK.contains(
                            uri.getHost().toLowerCase(Locale.ROOT));
        } catch (IllegalArgumentException exception) {
            return false;
        }
    }
}
