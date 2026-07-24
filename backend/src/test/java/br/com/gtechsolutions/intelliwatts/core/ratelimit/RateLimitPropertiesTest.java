package br.com.gtechsolutions.intelliwatts.core.ratelimit;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

class RateLimitPropertiesTest {

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
    void deveAceitarConfiguracaoValida() {
        assertThat(validator.validate(properties(Duration.ofMinutes(1))))
                .isEmpty();
    }

    @Test
    void deveRejeitarJanelaNulaZeroOuMaiorQueUmaHora() {
        assertThat(validator.validate(properties(null))).isNotEmpty();
        assertThat(validator.validate(properties(Duration.ZERO))).isNotEmpty();
        assertThat(validator.validate(properties(Duration.ofHours(1))))
                .isNotEmpty();
    }

    @Test
    void deveRejeitarLimitesSemCapacidade() {
        RateLimitProperties properties = new RateLimitProperties(
                Duration.ofMinutes(1),
                0,
                0,
                0,
                0,
                0);

        assertThat(validator.validate(properties)).hasSize(5);
    }

    private RateLimitProperties properties(Duration janela) {
        return new RateLimitProperties(
                janela,
                30,
                10,
                5,
                60,
                10_000);
    }
}
