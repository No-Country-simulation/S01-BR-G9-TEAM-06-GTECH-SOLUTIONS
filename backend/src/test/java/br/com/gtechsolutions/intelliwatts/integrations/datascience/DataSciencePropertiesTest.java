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
                Duration.ofMillis(1500)
        );

        assertThat(validator.validate(properties))
                .anyMatch(violation -> violation.getPropertyPath().toString()
                        .equals("tempoTotalValido"));
    }

    private DataScienceProperties properties(Duration conexao, Duration resposta) {
        return new DataScienceProperties(
                URI.create("http://localhost:8000"),
                "/v1/inferencias",
                conexao,
                resposta
        );
    }
}
