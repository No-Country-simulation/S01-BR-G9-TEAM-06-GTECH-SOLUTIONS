package br.com.gtechsolutions.intelliwatts.modules.autenticacao.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.security.web.csrf.CsrfToken;

public record CsrfTokenResponse(
        String token,
        @JsonProperty("header_name") String headerName,
        @JsonProperty("parameter_name") String parameterName
) {

    public static CsrfTokenResponse de(CsrfToken csrfToken) {
        return new CsrfTokenResponse(
                csrfToken.getToken(),
                csrfToken.getHeaderName(),
                csrfToken.getParameterName());
    }
}
