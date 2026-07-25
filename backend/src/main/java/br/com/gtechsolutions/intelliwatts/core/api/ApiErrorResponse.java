package br.com.gtechsolutions.intelliwatts.core.api;

import java.time.Instant;
import java.util.Map;

public record ApiErrorResponse(
        Instant timestamp,
        int status,
        String codigo,
        String mensagem,
        String caminho,
        Map<String, String> erros
) {
}
