package br.com.gtechsolutions.intelliwatts.core.exceptions;

public class CredenciaisInvalidasException extends RuntimeException {

    public CredenciaisInvalidasException(Throwable cause) {
        super("E-mail ou senha inválidos", cause);
    }
}
