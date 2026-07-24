package br.com.gtechsolutions.intelliwatts.core.ratelimit;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;

import br.com.gtechsolutions.intelliwatts.MySqlTestConfiguration;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = {
                "intelliwatts.rate-limit.analises-por-janela=1",
                "intelliwatts.security.cors.origens-permitidas="
                        + "http://localhost:3000"
        })
@Import(MySqlTestConfiguration.class)
class RateLimitIntegrationTest {

    @LocalServerPort
    private int port;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final JsonMapper jsonMapper = JsonMapper.builder().build();

    @Test
    void deveBloquearAntesDeProcessarONovoCorpo() throws Exception {
        HttpResponse<String> primeira = enviar("{}");
        HttpResponse<String> segunda = enviar("\"" + "a".repeat(20_000) + "\"");

        assertThat(primeira.statusCode()).isEqualTo(400);
        assertThat(segunda.statusCode()).isEqualTo(429);
        assertThat(segunda.headers().firstValue("Retry-After")).isPresent();
        assertThat(segunda.headers().firstValue(
                "Access-Control-Allow-Origin"))
                .contains("http://localhost:3000");
        assertThat(segunda.headers().firstValue(
                "Access-Control-Allow-Credentials"))
                .contains("true");
        assertThat(segunda.headers().firstValue(
                "Access-Control-Expose-Headers"))
                .hasValueSatisfying(value ->
                        assertThat(value).contains("Retry-After"));

        JsonNode body = jsonMapper.readTree(segunda.body());
        assertThat(body.path("codigo").asString())
                .isEqualTo("LIMITE_REQUISICOES_EXCEDIDO");
    }

    private HttpResponse<String> enviar(String body) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .uri(URI.create(
                        "http://localhost:" + port + "/analise-energetica"))
                .header("Origin", "http://localhost:3000")
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        return httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString());
    }
}
