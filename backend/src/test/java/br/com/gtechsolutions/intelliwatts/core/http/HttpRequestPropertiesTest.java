package br.com.gtechsolutions.intelliwatts.core.http;

import static org.assertj.core.api.Assertions.assertThat;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class HttpRequestPropertiesTest {

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
    void deveAceitarLimitePadrao() {
        HttpRequestProperties properties =
                new HttpRequestProperties(16_384);

        assertThat(validator.validate(properties)).isEmpty();
    }

    @Test
    void deveRejeitarLimiteMenorQueUmByte() {
        HttpRequestProperties properties =
                new HttpRequestProperties(0);

        assertThat(validator.validate(properties)).isNotEmpty();
    }

    @Test
    void deveRejeitarLimiteAcimaDeUmMebibyte() {
        HttpRequestProperties properties =
                new HttpRequestProperties(1_048_577);

        assertThat(validator.validate(properties)).isNotEmpty();
    }
}
