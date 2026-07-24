package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import java.net.URI;
import java.time.Duration;
import java.util.Locale;
import java.util.Set;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "intelliwatts.datascience")
public record DataScienceProperties(
        @NotNull URI baseUrl,
        @NotBlank String caminhoInferencia,
        @NotNull Duration tempoConexao,
        @NotNull Duration tempoResposta,
        @Min(1) @Max(1_048_576) int tamanhoMaximoRespostaBytes,
        @NotBlank
        @Size(min = 32, max = 256)
        @Pattern(regexp = "^[\\x21-\\x7E]+$")
        String serviceToken
) {

    static final String TOKEN_LOCAL_PADRAO =
            "intelliwatts-local-only-token-000000";

    private static final Duration TEMPO_MAXIMO = Duration.ofSeconds(2);
    private static final Set<String> HOSTS_LOOPBACK = Set.of(
            "localhost",
            "127.0.0.1",
            "::1",
            "[::1]"
    );

    @AssertTrue(message = "a soma dos timeouts deve ser positiva e inferior a dois segundos")
    public boolean isTempoTotalValido() {
        if (tempoConexao == null || tempoResposta == null) {
            return false;
        }

        if (tempoConexao.isZero() || tempoConexao.isNegative()
                || tempoResposta.isZero() || tempoResposta.isNegative()) {
            return false;
        }

        return tempoConexao.plus(tempoResposta).compareTo(TEMPO_MAXIMO) < 0;
    }

    @AssertTrue(message = "deve usar HTTPS fora de localhost ou loopback")
    public boolean isBaseUrlSegura() {
        if (baseUrl == null
                || baseUrl.getScheme() == null
                || baseUrl.getHost() == null
                || baseUrl.getUserInfo() != null
                || baseUrl.getQuery() != null
                || baseUrl.getFragment() != null) {
            return false;
        }

        String scheme = baseUrl.getScheme().toLowerCase(Locale.ROOT);
        if ("https".equals(scheme)) {
            return true;
        }

        return "http".equals(scheme) && isLoopback();
    }

    @AssertTrue(message = "deve ser substituído fora do ambiente local")
    public boolean isServiceTokenSeguroParaDestino() {
        return serviceToken == null
                || isLoopback()
                || !TOKEN_LOCAL_PADRAO.equals(serviceToken);
    }

    private boolean isLoopback() {
        if (baseUrl == null || baseUrl.getHost() == null) {
            return false;
        }

        return HOSTS_LOOPBACK.contains(
                baseUrl.getHost().toLowerCase(Locale.ROOT));
    }

    @Override
    public String toString() {
        return "DataScienceProperties[baseUrl=" + baseUrl
                + ", caminhoInferencia=" + caminhoInferencia
                + ", tempoConexao=" + tempoConexao
                + ", tempoResposta=" + tempoResposta
                + ", tamanhoMaximoRespostaBytes="
                + tamanhoMaximoRespostaBytes
                + ", serviceToken=***]";
    }
}
