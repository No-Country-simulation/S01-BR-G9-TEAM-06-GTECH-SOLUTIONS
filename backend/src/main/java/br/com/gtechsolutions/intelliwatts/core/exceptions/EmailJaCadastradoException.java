package br.com.gtechsolutions.intelliwatts.core.exceptions;

public class EmailJaCadastradoException extends RuntimeException {

    public EmailJaCadastradoException() {
        super("E-mail já cadastrado");
    }

    public EmailJaCadastradoException(Throwable cause) {
        super("E-mail já cadastrado", cause);
    }
}
