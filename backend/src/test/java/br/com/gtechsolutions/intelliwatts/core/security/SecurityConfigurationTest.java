package br.com.gtechsolutions.intelliwatts.core.security;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;

import br.com.gtechsolutions.intelliwatts.MySqlTestConfiguration;
import jakarta.servlet.ServletContext;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = "intelliwatts.security.cors.origens-permitidas="
                + "http://localhost:3000")
@Import(MySqlTestConfiguration.class)
class SecurityConfigurationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private JsonMapper jsonMapper;

    @Autowired
    private ServletContext servletContext;

    private final HttpClient httpClient = HttpClient.newHttpClient();

    @Test
    void deveMarcarCookieDeSessaoComoSecurePorPadrao() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:" + port + "/auth/csrf"))
                .GET()
                .build();

        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString());

        assertThat(response.statusCode()).isEqualTo(200);
        assertThat(response.headers().allValues("Set-Cookie"))
                .anySatisfy(cookie -> assertThat(cookie)
                        .contains("JSESSIONID=")
                        .contains("HttpOnly")
                        .contains("Secure")
                        .contains("SameSite=Lax"));
    }

    @Test
    void deveImpedirCacheDoTokenCsrf() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:" + port + "/auth/csrf"))
                .GET()
                .build();

        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString());

        assertThat(response.headers().firstValue("Cache-Control"))
                .hasValueSatisfying(value ->
                        assertThat(value).contains("no-store"));
        assertThat(response.headers().firstValue("Pragma"))
                .contains("no-cache");
        assertThat(response.headers().firstValue("Expires")).contains("0");
    }

    @Test
    void deveConfigurarExpiracaoPorInatividadeEmTrintaMinutos() {
        assertThat(servletContext.getSessionTimeout()).isEqualTo(30);
    }

    @Test
    void deveAceitarPreflightSomenteDaOrigemConfigurada() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(
                        "http://localhost:" + port + "/auth/login"))
                .header("Origin", "http://localhost:3000")
                .header("Access-Control-Request-Method", "POST")
                .header(
                        "Access-Control-Request-Headers",
                        "Content-Type, X-CSRF-TOKEN")
                .method("OPTIONS", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString());

        assertThat(response.statusCode()).isEqualTo(200);
        assertThat(response.headers().firstValue(
                "Access-Control-Allow-Origin"))
                .contains("http://localhost:3000");
        assertThat(response.headers().firstValue(
                "Access-Control-Allow-Credentials"))
                .contains("true");
        assertThat(response.headers().firstValue(
                "Access-Control-Allow-Methods"))
                .hasValueSatisfying(value ->
                        assertThat(value).contains("POST"));
        assertThat(response.headers().firstValue(
                "Access-Control-Allow-Headers"))
                .hasValueSatisfying(value -> assertThat(value)
                        .containsIgnoringCase("Content-Type")
                        .containsIgnoringCase("X-CSRF-TOKEN"));
    }

    @Test
    void deveRejeitarPreflightDeOrigemDesconhecida() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(
                        "http://localhost:" + port + "/auth/login"))
                .header("Origin", "https://origem-maliciosa.example")
                .header("Access-Control-Request-Method", "POST")
                .method("OPTIONS", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString());

        assertThat(response.statusCode()).isEqualTo(403);
        assertThat(response.headers().firstValue(
                "Access-Control-Allow-Origin"))
                .isEmpty();
    }

    @Test
    void deveManterCabecalhosCorsQuandoCsrfForInvalido() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(
                        "http://localhost:" + port + "/auth/login"))
                .header("Origin", "http://localhost:3000")
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString("""
                        {
                          "email": "pessoa@example.com",
                          "senha": "senha-invalida"
                        }
                        """))
                .build();

        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString());

        assertThat(response.statusCode()).isEqualTo(403);
        assertThat(response.headers().firstValue(
                "Access-Control-Allow-Origin"))
                .contains("http://localhost:3000");
        assertThat(response.headers().firstValue(
                "Access-Control-Allow-Credentials"))
                .contains("true");
        assertThat(response.headers().firstValue(
                "Access-Control-Expose-Headers"))
                .hasValueSatisfying(value ->
                        assertThat(value).contains("Retry-After"));

        JsonNode body = jsonMapper.readTree(response.body());
        assertThat(body.path("codigo").asString())
                .isEqualTo("CSRF_INVALIDO");
    }

    @Test
    void deveManterEndpointDoMvpPublicoESemCsrf() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:" + port + "/analise-energetica"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString("{"))
                .build();

        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString());

        assertThat(response.statusCode()).isEqualTo(400);
        assertThat(response.body()).contains("JSON_INVALIDO");
    }

    @Test
    void deveExigirAutenticacaoNasDemaisRotas() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:" + port + "/rota-protegida"))
                .GET()
                .build();

        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString());

        assertThat(response.statusCode()).isEqualTo(401);
        assertThat(response.headers().firstValue("Content-Type"))
                .hasValueSatisfying(contentType ->
                        assertThat(contentType).startsWith("application/json"));
        JsonNode body = jsonMapper.readTree(response.body());
        assertThat(body.path("codigo").asString())
                .isEqualTo("NAO_AUTENTICADO");
        assertThat(body.path("caminho").asString())
                .isEqualTo("/rota-protegida");
    }
}
