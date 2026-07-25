package br.com.gtechsolutions.intelliwatts.core.security;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

class SessionSecurityPropertiesTest {

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
    void deveAceitarTimeoutEntreCincoMinutosEVinteEQuatroHoras() {
        assertThat(validator.validate(
                new SessionSecurityProperties(Duration.ofMinutes(5))))
                .isEmpty();
        assertThat(validator.validate(
                new SessionSecurityProperties(Duration.ofHours(24))))
                .isEmpty();
    }

    @Test
    void deveRejeitarTimeoutNuloZeroCurtoOuLongoDemais() {
        assertThat(validator.validate(
                new SessionSecurityProperties(null))).isNotEmpty();
        assertThat(validator.validate(
                new SessionSecurityProperties(Duration.ZERO))).isNotEmpty();
        assertThat(validator.validate(
                new SessionSecurityProperties(
                        Duration.ofMinutes(4).plusSeconds(59))))
                .isNotEmpty();
        assertThat(validator.validate(
                new SessionSecurityProperties(
                        Duration.ofHours(24).plusSeconds(1))))
                .isNotEmpty();
    }
}
