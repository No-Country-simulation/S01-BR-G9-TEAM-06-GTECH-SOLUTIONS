package br.com.gtechsolutions.intelliwatts.core.api;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.gtechsolutions.intelliwatts.core.exceptions.ServicoInferenciaIndisponivelException;
import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private String toSnakeCase(String fieldName) {
        return fieldName
                .replaceAll("([a-z0-9])([A-Z])", "$1_$2")
                .toLowerCase(Locale.ROOT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidation(
            MethodArgumentNotValidException exception,
            HttpServletRequest request) {
        Map<String, String> errors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        fieldError -> toSnakeCase(fieldError.getField()),
                        DefaultMessageSourceResolvable::getDefaultMessage,
                        (firstMessage, ignoredMessage) -> firstMessage,
                        LinkedHashMap::new));

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "ENTRADA_INVALIDA",
                "A requisição possui campos inválidos",
                request,
                errors);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponse> handleUnreadableMessage(
            HttpMessageNotReadableException exception,
            HttpServletRequest request) {
        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "JSON_INVALIDO",
                "O corpo da requisição não contém um JSON válido",
                request,
                Map.of());
    }

    @ExceptionHandler(ServicoInferenciaIndisponivelException.class)
    public ResponseEntity<ApiErrorResponse> handleInferenceUnavailable(
            ServicoInferenciaIndisponivelException exception,
            HttpServletRequest request) {
        return buildResponse(
                HttpStatus.SERVICE_UNAVAILABLE,
                "SERVICO_INFERENCIA_INDISPONIVEL",
                "O serviço de análise energética está temporariamente indisponível",
                request,
                Map.of());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleUnexpected(
            Exception exception,
            HttpServletRequest request) {
        LOGGER.error("Erro inesperado ao processar a requisição", exception);

        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "ERRO_INTERNO",
                "Ocorreu um erro inesperado ao processar a requisição",
                request,
                Map.of());
    }

    private ResponseEntity<ApiErrorResponse> buildResponse(
            HttpStatus status,
            String codigo,
            String mensagem,
            HttpServletRequest request,
            Map<String, String> erros) {
        ApiErrorResponse response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                codigo,
                mensagem,
                request.getRequestURI(),
                erros);

        return ResponseEntity.status(status).body(response);
    }
}
