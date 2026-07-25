package br.com.gtechsolutions.intelliwatts.core.ratelimit;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Duration;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import br.com.gtechsolutions.intelliwatts.core.api.ApiErrorResponseWriter;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

class RateLimitFilterTest {

    private final JsonMapper jsonMapper = JsonMapper.builder().build();

    @Test
    void deveLimitarOsQuatroEndpointsPublicosCriticos() throws Exception {
        RateLimitFilter filter = filterComLimiteUm();
        List<Requisicao> requisicoes = List.of(
                new Requisicao("POST", "/analise-energetica"),
                new Requisicao("POST", "/auth/login"),
                new Requisicao("POST", "/auth/cadastro"),
                new Requisicao("GET", "/auth/csrf")
        );

        for (Requisicao requisicao : requisicoes) {
            Resultado primeira = executar(
                    filter,
                    requisicao.metodo(),
                    requisicao.caminho(),
                    "203.0.113.10");
            Resultado segunda = executar(
                    filter,
                    requisicao.metodo(),
                    requisicao.caminho(),
                    "203.0.113.10");

            assertThat(primeira.filtroProsseguiu()).isTrue();
            assertRateLimitExcedido(segunda, requisicao.caminho());
        }
    }

    @Test
    void deveContabilizarEnderecosRemotosSeparadamente() throws Exception {
        RateLimitFilter filter = filterComLimiteUm();

        Resultado primeiroCliente = executar(
                filter,
                "POST",
                "/analise-energetica",
                "203.0.113.10");
        Resultado segundoCliente = executar(
                filter,
                "POST",
                "/analise-energetica",
                "203.0.113.11");

        assertThat(primeiroCliente.filtroProsseguiu()).isTrue();
        assertThat(segundoCliente.filtroProsseguiu()).isTrue();
    }

    @Test
    void naoDeveLimitarRotasForaDaPolitica() throws Exception {
        RateLimitFilter filter = filterComLimiteUm();

        Resultado primeira = executar(
                filter,
                "GET",
                "/auth/me",
                "203.0.113.10");
        Resultado segunda = executar(
                filter,
                "GET",
                "/auth/me",
                "203.0.113.10");

        assertThat(primeira.filtroProsseguiu()).isTrue();
        assertThat(segunda.filtroProsseguiu()).isTrue();
    }

    private RateLimitFilter filterComLimiteUm() {
        RateLimitProperties properties = new RateLimitProperties(
                Duration.ofMinutes(1),
                1,
                1,
                1,
                1,
                100);

        return new RateLimitFilter(
                properties,
                new ApiErrorResponseWriter(jsonMapper));
    }

    private Resultado executar(
            RateLimitFilter filter,
            String metodo,
            String caminho,
            String enderecoRemoto) throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest(
                metodo,
                caminho);
        request.setServletPath(caminho);
        request.setRemoteAddr(enderecoRemoto);
        MockHttpServletResponse response = new MockHttpServletResponse();
        MockFilterChain chain = new MockFilterChain();

        filter.doFilter(request, response, chain);

        return new Resultado(response, chain.getRequest() != null);
    }

    private void assertRateLimitExcedido(
            Resultado resultado,
            String caminho) throws Exception {
        assertThat(resultado.filtroProsseguiu()).isFalse();
        assertThat(resultado.response().getStatus()).isEqualTo(429);
        assertThat(resultado.response().getHeader("Retry-After"))
                .isEqualTo("60");
        assertThat(resultado.response().getHeader("Cache-Control"))
                .contains("no-store");

        JsonNode body = jsonMapper.readTree(
                resultado.response().getContentAsByteArray());
        assertThat(body.path("codigo").asString())
                .isEqualTo("LIMITE_REQUISICOES_EXCEDIDO");
        assertThat(body.path("caminho").asString()).isEqualTo(caminho);
    }

    private record Requisicao(String metodo, String caminho) {
    }

    private record Resultado(
            MockHttpServletResponse response,
            boolean filtroProsseguiu) {
    }
}
