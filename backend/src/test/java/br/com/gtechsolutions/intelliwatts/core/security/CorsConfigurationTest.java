package br.com.gtechsolutions.intelliwatts.core.security;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.concurrent.atomic.AtomicBoolean;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

class CorsConfigurationTest {

    @Test
    void deveBloquearPreflightQuandoAllowlistEstiverVazia()
            throws Exception {
        CorsFilter filter = criarFiltroSemOrigens();
        MockHttpServletRequest request = new MockHttpServletRequest(
                HttpMethod.OPTIONS.name(),
                "/auth/login");
        request.addHeader(
                HttpHeaders.ORIGIN,
                "https://frontend.example");
        request.addHeader(
                HttpHeaders.ACCESS_CONTROL_REQUEST_METHOD,
                HttpMethod.POST.name());
        MockHttpServletResponse response = new MockHttpServletResponse();
        AtomicBoolean cadeiaExecutada = new AtomicBoolean();

        filter.doFilter(
                request,
                response,
                (ignoredRequest, ignoredResponse) ->
                        cadeiaExecutada.set(true));

        assertThat(response.getStatus())
                .isEqualTo(HttpStatus.FORBIDDEN.value());
        assertThat(response.getHeader(
                HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN))
                .isNull();
        assertThat(cadeiaExecutada).isFalse();
    }

    @Test
    void devePermitirRequisicaoSemOriginQuandoAllowlistEstiverVazia()
            throws Exception {
        CorsFilter filter = criarFiltroSemOrigens();
        MockHttpServletRequest request = new MockHttpServletRequest(
                HttpMethod.GET.name(),
                "/auth/csrf");
        MockHttpServletResponse response = new MockHttpServletResponse();
        AtomicBoolean cadeiaExecutada = new AtomicBoolean();

        filter.doFilter(
                request,
                response,
                (ignoredRequest, ignoredResponse) ->
                        cadeiaExecutada.set(true));

        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(cadeiaExecutada).isTrue();
    }

    private CorsFilter criarFiltroSemOrigens() {
        SecurityConfiguration securityConfiguration =
                new SecurityConfiguration();
        CorsConfigurationSource source =
                securityConfiguration.corsConfigurationSource(
                        new CorsSecurityProperties(""));
        return new CorsFilter(source);
    }
}
