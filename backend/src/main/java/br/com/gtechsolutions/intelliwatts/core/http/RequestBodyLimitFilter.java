package br.com.gtechsolutions.intelliwatts.core.http;

import java.io.IOException;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.gtechsolutions.intelliwatts.core.api.ApiErrorResponseWriter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 10)
public class RequestBodyLimitFilter extends OncePerRequestFilter {

    private static final String CODIGO_ERRO =
            "CORPO_REQUISICAO_MUITO_GRANDE";
    private static final String MENSAGEM_ERRO =
            "O corpo da requisição excede o limite permitido";

    private final HttpRequestProperties properties;
    private final ApiErrorResponseWriter errorWriter;

    public RequestBodyLimitFilter(
            HttpRequestProperties properties,
            ApiErrorResponseWriter errorWriter) {
        this.properties = properties;
        this.errorWriter = errorWriter;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        int limiteBytes = properties.tamanhoMaximoCorpoBytes();
        long tamanhoDeclarado = request.getContentLengthLong();

        if (tamanhoDeclarado > limiteBytes) {
            escreverPayloadMuitoGrande(request, response);
            return;
        }

        byte[] corpo = request.getInputStream()
                .readNBytes(limiteBytes + 1);
        if (corpo.length > limiteBytes) {
            escreverPayloadMuitoGrande(request, response);
            return;
        }

        filterChain.doFilter(
                new RequisicaoComCorpoEmMemoria(request, corpo),
                response);
    }

    private void escreverPayloadMuitoGrande(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        errorWriter.escrever(
                request,
                response,
                HttpStatus.CONTENT_TOO_LARGE,
                CODIGO_ERRO,
                MENSAGEM_ERRO);
    }
}
