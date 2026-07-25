package br.com.gtechsolutions.intelliwatts.core.security;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

class CorsSecurityPropertiesTest {

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
    void deveAceitarListaVaziaHttpsELoopbackHttp() {
        assertThat(validator.validate(
                new CorsSecurityProperties(""))).isEmpty();
        assertThat(validator.validate(
                new CorsSecurityProperties(
                        "https://app.intelliwatts.example,"
                                + "http://localhost:5173,"
                                + "http://127.0.0.1:3000,"
                                + "http://[::1]:4200")))
                .isEmpty();
    }

    @Test
    void deveSepararEEliminarEspacosDasOrigens() {
        CorsSecurityProperties properties = new CorsSecurityProperties(
                " https://app.intelliwatts.example ,"
                        + " http://localhost:5173 ");

        assertThat(properties.origens())
                .containsExactly(
                        "https://app.intelliwatts.example",
                        "http://localhost:5173");
    }

    @Test
    void deveRejeitarCuringasNullEHttpRemoto() {
        assertThat(validator.validate(
                new CorsSecurityProperties("*"))).isNotEmpty();
        assertThat(validator.validate(
                new CorsSecurityProperties("null"))).isNotEmpty();
        assertThat(validator.validate(
                new CorsSecurityProperties(
                        "http://app.intelliwatts.example")))
                .isNotEmpty();
    }

    @Test
    void deveRejeitarOrigemComCaminhoQueryFragmentoOuCredenciais() {
        assertThat(validator.validate(
                new CorsSecurityProperties(
                        "https://app.intelliwatts.example/login")))
                .isNotEmpty();
        assertThat(validator.validate(
                new CorsSecurityProperties(
                        "https://app.intelliwatts.example?modo=teste")))
                .isNotEmpty();
        assertThat(validator.validate(
                new CorsSecurityProperties(
                        "https://app.intelliwatts.example#inicio")))
                .isNotEmpty();
        assertThat(validator.validate(
                new CorsSecurityProperties(
                        "https://usuario@app.intelliwatts.example")))
                .isNotEmpty();
    }
}
