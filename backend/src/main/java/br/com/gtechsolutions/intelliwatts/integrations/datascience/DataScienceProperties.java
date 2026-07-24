package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import java.net.URI;
import java.time.Duration;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "intelliwatts.datascience")
public record DataScienceProperties(
        @NotNull URI baseUrl,
        @NotBlank String caminhoInferencia,
        @NotNull Duration tempoConexao,
        @NotNull Duration tempoResposta,
        @Min(1) @Max(1_048_576) int tamanhoMaximoRespostaBytes
) {

    private static final Duration TEMPO_MAXIMO = Duration.ofSeconds(2);

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
}
