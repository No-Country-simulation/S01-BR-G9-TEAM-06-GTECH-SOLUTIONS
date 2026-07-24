package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URI;
import java.time.Duration;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DataSciencePropertiesTest {

    private static final String TOKEN_TESTE =
            "0123456789abcdef0123456789abcdef";

    private ValidatorFactory validatorFactory;
    private Validator validator;

    @BeforeEach
    void setUp() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @AfterEach
    void tearDown() {
        validatorFactory.close();
    }

    @Test
    void deveAceitarTimeoutTotalInferiorADoisSegundos() {
        DataScienceProperties properties = properties(
                Duration.ofMillis(300),
                Duration.ofMillis(1500)
        );

        assertThat(validator.validate(properties)).isEmpty();
    }

    @Test
    void deveRejeitarTimeoutTotalIgualADoisSegundos() {
        DataScienceProperties properties = properties(
                Duration.ofMillis(500),
                Duration.ofMillis(1500),
                16_384
        );

        assertThat(validator.validate(properties))
                .anyMatch(violation -> violation.getPropertyPath().toString()
                        .equals("tempoTotalValido"));
    }

    @Test
    void deveRejeitarLimiteDeRespostaMenorQueUmByte() {
        DataScienceProperties properties = properties(
                Duration.ofMillis(300),
                Duration.ofMillis(1500),
                0
        );

        assertThat(validator.validate(properties))
                .anyMatch(violation -> violation.getPropertyPath().toString()
                        .equals("tamanhoMaximoRespostaBytes"));
    }

    @Test
    void deveRejeitarLimiteDeRespostaMaiorQueUmMebibyte() {
        DataScienceProperties properties = properties(
                Duration.ofMillis(300),
                Duration.ofMillis(1500),
                1_048_577
        );

        assertThat(validator.validate(properties))
                .anyMatch(violation -> violation.getPropertyPath().toString()
                        .equals("tamanhoMaximoRespostaBytes"));
    }

    @Test
    void deveAceitarHttpSomenteNoLoopbackEHttpsForaDele() {
        assertThat(validator.validate(properties(
                URI.create("http://localhost:8000"),
                TOKEN_TESTE))).isEmpty();
        assertThat(validator.validate(properties(
                URI.create("http://127.0.0.1:8000"),
                TOKEN_TESTE))).isEmpty();
        assertThat(validator.validate(properties(
                URI.create("https://datascience.internal"),
                TOKEN_TESTE))).isEmpty();
    }

    @Test
    void deveRejeitarHttpForaDoLoopback() {
        DataScienceProperties properties = properties(
                URI.create("http://datascience.internal:8000"),
                TOKEN_TESTE);

        assertThat(validator.validate(properties))
                .anyMatch(violation -> violation.getPropertyPath().toString()
                        .equals("baseUrlSegura"));
    }

    @Test
    void deveRejeitarTokenCurtoOuComEspaco() {
        assertThat(validator.validate(properties(
                URI.create("http://localhost:8000"),
                "token-curto"))).isNotEmpty();
        assertThat(validator.validate(properties(
                URI.create("http://localhost:8000"),
                TOKEN_TESTE + " token"))).isNotEmpty();
    }

    @Test
    void deveRejeitarTokenLocalPadraoEmDestinoRemoto() {
        DataScienceProperties properties = properties(
                URI.create("https://datascience.internal"),
                DataScienceProperties.TOKEN_LOCAL_PADRAO);

        assertThat(validator.validate(properties))
                .anyMatch(violation -> violation.getPropertyPath().toString()
                        .equals("serviceTokenSeguroParaDestino"));
    }

    private DataScienceProperties properties(Duration conexao, Duration resposta) {
        return properties(conexao, resposta, 16_384);
    }

    private DataScienceProperties properties(
            Duration conexao,
            Duration resposta,
            int tamanhoMaximoRespostaBytes
    ) {
        return new DataScienceProperties(
                URI.create("http://localhost:8000"),
                "/v1/inferencias",
                conexao,
                resposta,
                tamanhoMaximoRespostaBytes,
                TOKEN_TESTE
        );
    }

    private DataScienceProperties properties(
            URI baseUrl,
            String serviceToken
    ) {
        return new DataScienceProperties(
                baseUrl,
                "/v1/inferencias",
                Duration.ofMillis(300),
                Duration.ofMillis(1500),
                16_384,
                serviceToken
        );
    }
}
