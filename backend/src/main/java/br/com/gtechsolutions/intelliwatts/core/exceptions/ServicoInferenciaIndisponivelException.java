package br.com.gtechsolutions.intelliwatts.core.exceptions;

public class ServicoInferenciaIndisponivelException extends RuntimeException {

    public ServicoInferenciaIndisponivelException(String message) {
        super(message);
    }

    public ServicoInferenciaIndisponivelException(String message, Throwable cause) {
        super(message, cause);
    }
}
