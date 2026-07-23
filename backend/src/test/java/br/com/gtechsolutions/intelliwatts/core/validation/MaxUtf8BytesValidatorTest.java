package br.com.gtechsolutions.intelliwatts.core.validation;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

class MaxUtf8BytesValidatorTest {

    private static final String EMOJI_QUATRO_BYTES = "\uD83D\uDE00";

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    @BeforeAll
    static void setUp() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @AfterAll
    static void tearDown() {
        validatorFactory.close();
    }

    @Test
    void deveAceitarExatamente72BytesEmUtf8() {
        Senha senha = new Senha(EMOJI_QUATRO_BYTES.repeat(18));

        assertThat(validator.validate(senha)).isEmpty();
    }

    @Test
    void deveRejeitarMaisDe72BytesEmUtf8() {
        Senha senha = new Senha(EMOJI_QUATRO_BYTES.repeat(19));

        assertThat(validator.validate(senha))
                .singleElement()
                .satisfies(violacao ->
                        assertThat(violacao.getPropertyPath().toString())
                                .isEqualTo("valor"));
    }

    @Test
    void deveIgnorarValorNuloParaComporComNotBlank() {
        Senha senha = new Senha(null);

        assertThat(validator.validate(senha)).isEmpty();
    }

    private record Senha(
            @MaxUtf8Bytes(72) String valor) {
    }
}
