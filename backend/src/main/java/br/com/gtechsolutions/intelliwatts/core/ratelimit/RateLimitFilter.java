package br.com.gtechsolutions.intelliwatts.core.ratelimit;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.gtechsolutions.intelliwatts.core.api.ApiErrorResponseWriter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 5)
public class RateLimitFilter extends OncePerRequestFilter {

    private static final String CODIGO_ERRO =
            "LIMITE_REQUISICOES_EXCEDIDO";
    private static final String MENSAGEM_ERRO =
            "Muitas requisições. Tente novamente mais tarde";

    private final RateLimitProperties properties;
    private final ApiErrorResponseWriter errorWriter;
    private final Map<Chave, Janela> janelas = new HashMap<>();

    private long proximaLimpezaMillis;

    public RateLimitFilter(
            RateLimitProperties properties,
            ApiErrorResponseWriter errorWriter) {
        this.properties = properties;
        this.errorWriter = errorWriter;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        Regra regra = encontrarRegra(
                request.getMethod(),
                request.getServletPath());

        if (regra == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String enderecoRemoto = request.getRemoteAddr();
        if (enderecoRemoto == null || enderecoRemoto.isBlank()) {
            enderecoRemoto = "desconhecido";
        }

        Decisao decisao = consumir(
                new Chave(regra.identificador(), enderecoRemoto),
                regra.limite(),
                System.currentTimeMillis());

        if (decisao.permitida()) {
            filterChain.doFilter(request, response);
            return;
        }

        response.setHeader(
                HttpHeaders.RETRY_AFTER,
                Long.toString(decisao.tentarNovamenteEmSegundos()));
        errorWriter.escrever(
                request,
                response,
                HttpStatus.TOO_MANY_REQUESTS,
                CODIGO_ERRO,
                MENSAGEM_ERRO);
    }

    private Regra encontrarRegra(String metodo, String caminho) {
        if ("POST".equals(metodo)
                && "/analise-energetica".equals(caminho)) {
            return new Regra(
                    "analise",
                    properties.analisesPorJanela());
        }
        if ("POST".equals(metodo) && "/auth/login".equals(caminho)) {
            return new Regra("login", properties.loginsPorJanela());
        }
        if ("POST".equals(metodo) && "/auth/cadastro".equals(caminho)) {
            return new Regra(
                    "cadastro",
                    properties.cadastrosPorJanela());
        }
        if ("GET".equals(metodo) && "/auth/csrf".equals(caminho)) {
            return new Regra("csrf", properties.csrfPorJanela());
        }
        return null;
    }

    private synchronized Decisao consumir(
            Chave chave,
            int limite,
            long agoraMillis) {
        long duracaoJanelaMillis = properties.janela().toMillis();

        if (agoraMillis >= proximaLimpezaMillis) {
            janelas.entrySet().removeIf(entry ->
                    entry.getValue().expiraEmMillis() <= agoraMillis);
            proximaLimpezaMillis = agoraMillis + duracaoJanelaMillis;
        }

        Janela atual = janelas.get(chave);
        if (atual == null || atual.expiraEmMillis() <= agoraMillis) {
            if (atual == null && janelas.size() >= properties.maximoChaves()) {
                return Decisao.bloqueada(
                        segundosArredondadosParaCima(
                                duracaoJanelaMillis));
            }

            janelas.put(
                    chave,
                    new Janela(1, agoraMillis + duracaoJanelaMillis));
            return Decisao.liberada();
        }

        if (atual.quantidade() >= limite) {
            return Decisao.bloqueada(
                    segundosArredondadosParaCima(
                            atual.expiraEmMillis() - agoraMillis));
        }

        janelas.put(
                chave,
                new Janela(
                        atual.quantidade() + 1,
                        atual.expiraEmMillis()));
        return Decisao.liberada();
    }

    private long segundosArredondadosParaCima(long milissegundos) {
        return Math.max(1, (milissegundos + 999) / 1_000);
    }

    private record Regra(String identificador, int limite) {
    }

    private record Chave(String regra, String enderecoRemoto) {
    }

    private record Janela(int quantidade, long expiraEmMillis) {
    }

    private record Decisao(
            boolean permitida,
            long tentarNovamenteEmSegundos
    ) {

        private static Decisao liberada() {
            return new Decisao(true, 0);
        }

        private static Decisao bloqueada(long tentarNovamenteEmSegundos) {
            return new Decisao(false, tentarNovamenteEmSegundos);
        }
    }
}
