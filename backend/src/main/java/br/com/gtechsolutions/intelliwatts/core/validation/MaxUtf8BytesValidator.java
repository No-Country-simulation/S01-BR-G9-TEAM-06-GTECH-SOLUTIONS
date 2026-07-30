package br.com.gtechsolutions.intelliwatts.core.validation;

import java.nio.charset.StandardCharsets;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MaxUtf8BytesValidator
        implements ConstraintValidator<MaxUtf8Bytes, CharSequence> {

    private int maximo;

    @Override
    public void initialize(MaxUtf8Bytes constraint) {
        maximo = constraint.value();
    }

    @Override
    public boolean isValid(
            CharSequence valor,
            ConstraintValidatorContext context) {
        if (valor == null) {
            return true;
        }

        return valor.toString()
                .getBytes(StandardCharsets.UTF_8)
                .length <= maximo;
    }
}
