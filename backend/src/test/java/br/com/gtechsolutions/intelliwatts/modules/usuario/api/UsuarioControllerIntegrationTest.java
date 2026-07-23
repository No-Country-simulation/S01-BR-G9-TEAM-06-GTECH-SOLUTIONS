package br.com.gtechsolutions.intelliwatts.modules.usuario.api;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.CookieManager;
import java.net.CookiePolicy;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.com.gtechsolutions.intelliwatts.PostgresTestConfiguration;
import br.com.gtechsolutions.intelliwatts.modules.usuario.domain.Usuario;
import br.com.gtechsolutions.intelliwatts.modules.usuario.persistence.UsuarioRepository;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = "server.servlet.session.cookie.secure=false")
@Import(PostgresTestConfiguration.class)
class UsuarioControllerIntegrationTest {

    private static final String EMOJI_QUATRO_BYTES = "\uD83D\uDE00";

    @LocalServerPort
    private int port;

    @Autowired
    private JsonMapper jsonMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void deveRejeitarCadastroSemCsrf() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri("/auth/cadastro"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonCadastro(
                        "Sem CSRF",
                        "sem.csrf@example.com")))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(
                request,
                HttpResponse.BodyHandlers.ofString());

        assertThat(response.statusCode()).isEqualTo(403);
        assertThat(response.headers().firstValue("Content-Type"))
                .hasValueSatisfying(contentType ->
                        assertThat(contentType).startsWith("application/json"));
        assertThat(jsonMapper.readTree(response.body())
                .path("codigo")
                .asString()).isEqualTo("CSRF_INVALIDO");
    }

    @Test
    void deveCadastrarUsuarioComCsrf() throws Exception {
        HttpClient httpClient = novoClienteComCookies();
        DadosCsrf csrf = obterCsrf(httpClient);

        HttpResponse<String> response = cadastrar(
                httpClient,
                csrf,
                jsonCadastro(
                        "  Mykael Costa  ",
                        "Cadastro.Valido@Example.com"));

        assertThat(response.statusCode()).isEqualTo(201);

        JsonNode body = jsonMapper.readTree(response.body());
        assertThat(body.path("id").asString()).isNotBlank();
        assertThat(body.path("nome").asString()).isEqualTo("Mykael Costa");
        assertThat(body.path("email").asString())
                .isEqualTo("cadastro.valido@example.com");
        assertThat(body.has("senha")).isFalse();
        assertThat(body.has("senha_hash")).isFalse();

        Usuario usuarioSalvo = usuarioRepository
                .findByEmail("cadastro.valido@example.com")
                .orElseThrow();
        assertThat(usuarioSalvo.getSenhaHash())
                .isNotEqualTo("uma-senha-de-teste-123");
        assertThat(passwordEncoder.matches(
                "uma-senha-de-teste-123",
                usuarioSalvo.getSenhaHash()))
                .isTrue();
    }

    @Test
    void deveRetornarBadRequestParaCadastroInvalido() throws Exception {
        HttpClient httpClient = novoClienteComCookies();
        DadosCsrf csrf = obterCsrf(httpClient);

        HttpResponse<String> response = cadastrar(
                httpClient,
                csrf,
                """
                {
                  "nome": " ",
                  "email": "email-invalido",
                  "senha": "curta"
                }
                """);

        assertThat(response.statusCode()).isEqualTo(400);

        JsonNode body = jsonMapper.readTree(response.body());
        assertThat(body.path("codigo").asString())
                .isEqualTo("ENTRADA_INVALIDA");
        assertThat(body.path("erros").has("nome")).isTrue();
        assertThat(body.path("erros").has("email")).isTrue();
        assertThat(body.path("erros").has("senha")).isTrue();
    }

    @Test
    void deveAceitarSenhaComExatamente72BytesEmUtf8() throws Exception {
        HttpClient httpClient = novoClienteComCookies();
        DadosCsrf csrf = obterCsrf(httpClient);
        String senha = EMOJI_QUATRO_BYTES.repeat(18);

        HttpResponse<String> response = cadastrar(
                httpClient,
                csrf,
                jsonCadastro(
                        "Senha Limite",
                        "senha.72.bytes@example.com",
                        senha));

        assertThat(response.statusCode()).isEqualTo(201);

        Usuario usuarioSalvo = usuarioRepository
                .findByEmail("senha.72.bytes@example.com")
                .orElseThrow();
        assertThat(passwordEncoder.matches(senha, usuarioSalvo.getSenhaHash()))
                .isTrue();
    }

    @Test
    void deveRejeitarSenhaAcimaDe72BytesEmUtf8() throws Exception {
        HttpClient httpClient = novoClienteComCookies();
        DadosCsrf csrf = obterCsrf(httpClient);
        String email = "senha.76.bytes@example.com";

        HttpResponse<String> response = cadastrar(
                httpClient,
                csrf,
                jsonCadastro(
                        "Senha Acima do Limite",
                        email,
                        EMOJI_QUATRO_BYTES.repeat(19)));

        assertThat(response.statusCode()).isEqualTo(400);
        JsonNode body = jsonMapper.readTree(response.body());
        assertThat(body.path("codigo").asString())
                .isEqualTo("ENTRADA_INVALIDA");
        assertThat(body.path("erros").has("senha")).isTrue();
        assertThat(usuarioRepository.findByEmail(email)).isEmpty();
    }

    @Test
    void deveRetornarConflictParaEmailJaCadastrado() throws Exception {
        HttpClient httpClient = novoClienteComCookies();
        DadosCsrf csrf = obterCsrf(httpClient);
        String cadastro = jsonCadastro(
                "Usuário Duplicado",
                "duplicado.http@example.com");

        HttpResponse<String> primeiroCadastro = cadastrar(
                httpClient,
                csrf,
                cadastro);
        HttpResponse<String> segundoCadastro = cadastrar(
                httpClient,
                csrf,
                cadastro);

        assertThat(primeiroCadastro.statusCode()).isEqualTo(201);
        assertThat(segundoCadastro.statusCode()).isEqualTo(409);

        JsonNode body = jsonMapper.readTree(segundoCadastro.body());
        assertThat(body.path("codigo").asString())
                .isEqualTo("EMAIL_JA_CADASTRADO");
        assertThat(body.path("mensagem").asString())
                .isEqualTo("E-mail já cadastrado");
    }

    private HttpClient novoClienteComCookies() {
        CookieManager cookieManager = new CookieManager(
                null,
                CookiePolicy.ACCEPT_ALL);

        return HttpClient.newBuilder()
                .cookieHandler(cookieManager)
                .build();
    }

    private DadosCsrf obterCsrf(HttpClient httpClient) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri("/auth/csrf"))
                .GET()
                .build();

        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString());

        assertThat(response.statusCode()).isEqualTo(200);

        JsonNode body = jsonMapper.readTree(response.body());
        return new DadosCsrf(
                body.path("token").asString(),
                body.path("header_name").asString());
    }

    private HttpResponse<String> cadastrar(
            HttpClient httpClient,
            DadosCsrf csrf,
            String json) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri("/auth/cadastro"))
                .header("Content-Type", "application/json")
                .header(csrf.headerName(), csrf.token())
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        return httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString());
    }

    private String jsonCadastro(String nome, String email) throws Exception {
        return jsonCadastro(
                nome,
                email,
                "uma-senha-de-teste-123");
    }

    private String jsonCadastro(
            String nome,
            String email,
            String senha) throws Exception {
        return jsonMapper.writeValueAsString(Map.of(
                "nome", nome,
                "email", email,
                "senha", senha));
    }

    private URI uri(String caminho) {
        return URI.create("http://localhost:" + port + caminho);
    }

    private record DadosCsrf(String token, String headerName) {
    }
}
