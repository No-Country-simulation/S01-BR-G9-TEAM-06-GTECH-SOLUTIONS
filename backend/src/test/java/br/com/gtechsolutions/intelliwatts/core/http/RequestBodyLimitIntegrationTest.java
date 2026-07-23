package br.com.gtechsolutions.intelliwatts.core.http;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;

import br.com.gtechsolutions.intelliwatts.PostgresTestConfiguration;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = "intelliwatts.http.tamanho-maximo-corpo-bytes=256")
@Import(PostgresTestConfiguration.class)
class RequestBodyLimitIntegrationTest {

    private static final int LIMITE_TESTE_BYTES = 256;

    @LocalServerPort
    private int port;

    @Autowired
    private JsonMapper jsonMapper;

    private final HttpClient httpClient = HttpClient.newHttpClient();

    @Test
    void deveRejeitarCorpoComTamanhoDeclaradoAcimaDoLimite() throws Exception {
        HttpRequest request = requestBuilder()
                .POST(HttpRequest.BodyPublishers.ofString(
                        jsonStringComTamanho(LIMITE_TESTE_BYTES + 1)))
                .build();

        HttpResponse<String> response = enviar(request);

        assertPayloadTooLarge(response);
    }

    @Test
    void deveRejeitarCorpoSemTamanhoConhecidoQueUltrapassaOLimite()
            throws Exception {
        byte[] body = jsonObjetoComEspacosAte(LIMITE_TESTE_BYTES + 1)
                .getBytes(StandardCharsets.UTF_8);
        HttpRequest.BodyPublisher publisher = HttpRequest.BodyPublishers
                .ofInputStream(() -> new ByteArrayInputStream(body));
        assertThat(publisher.contentLength()).isEqualTo(-1);

        HttpRequest request = requestBuilder()
                .POST(publisher)
                .build();

        HttpResponse<String> response = enviar(request);

        assertPayloadTooLarge(response);
    }

    @Test
    void deveAceitarCorpoComTamanhoExatamenteIgualAoLimite()
            throws Exception {
        HttpRequest request = requestBuilder()
                .POST(HttpRequest.BodyPublishers.ofString(
                        jsonStringComTamanho(LIMITE_TESTE_BYTES)))
                .build();

        HttpResponse<String> response = enviar(request);

        assertThat(response.statusCode()).isEqualTo(400);
        assertThat(jsonMapper.readTree(response.body())
                .path("codigo")
                .asString()).isEqualTo("JSON_INVALIDO");
    }

    @Test
    void deveAplicarLimiteAntesDaCadeiaDeSeguranca() throws Exception {
        HttpRequest request = requestBuilder("/auth/login")
                .POST(HttpRequest.BodyPublishers.ofString(
                        jsonStringComTamanho(LIMITE_TESTE_BYTES + 1)))
                .build();

        HttpResponse<String> response = enviar(request);

        assertPayloadTooLarge(response, "/auth/login");
    }

    @Test
    void deveLimitarCorpoSemConfiarNoTipoDeMidia() throws Exception {
        byte[] body = jsonObjetoComEspacosAte(LIMITE_TESTE_BYTES + 1)
                .getBytes(StandardCharsets.UTF_8);
        HttpRequest.BodyPublisher publisher = HttpRequest.BodyPublishers
                .ofInputStream(() -> new ByteArrayInputStream(body));

        HttpRequest request = requestBuilder(
                "/analise-energetica",
                "text/plain")
                .POST(publisher)
                .build();

        HttpResponse<String> response = enviar(request);

        assertPayloadTooLarge(response);
    }

    private HttpRequest.Builder requestBuilder() {
        return requestBuilder("/analise-energetica");
    }

    private HttpRequest.Builder requestBuilder(String caminho) {
        return requestBuilder(caminho, "application/json");
    }

    private HttpRequest.Builder requestBuilder(
            String caminho,
            String contentType) {
        return HttpRequest.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .uri(URI.create("http://localhost:" + port + caminho))
                .header("Content-Type", contentType);
    }

    private HttpResponse<String> enviar(HttpRequest request)
            throws Exception {
        return httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString());
    }

    private void assertPayloadTooLarge(HttpResponse<String> response)
            throws Exception {
        assertPayloadTooLarge(response, "/analise-energetica");
    }

    private void assertPayloadTooLarge(
            HttpResponse<String> response,
            String caminho) throws Exception {
        assertThat(response.statusCode()).isEqualTo(413);
        assertThat(response.headers().firstValue("Content-Type"))
                .hasValueSatisfying(contentType ->
                        assertThat(contentType).startsWith("application/json"));

        JsonNode body = jsonMapper.readTree(response.body());
        assertThat(body.path("status").asInt()).isEqualTo(413);
        assertThat(body.path("codigo").asString())
                .isEqualTo("CORPO_REQUISICAO_MUITO_GRANDE");
        assertThat(body.path("mensagem").asString())
                .isEqualTo(
                        "O corpo da requisição excede o limite permitido");
        assertThat(body.path("caminho").asString())
                .isEqualTo(caminho);
        assertThat(body.path("erros").size()).isZero();
    }

    private String jsonStringComTamanho(int tamanhoBytes) {
        return "\"" + "a".repeat(tamanhoBytes - 2) + "\"";
    }

    private String jsonObjetoComEspacosAte(int tamanhoBytes) {
        return "{}" + " ".repeat(tamanhoBytes - 2);
    }
}
