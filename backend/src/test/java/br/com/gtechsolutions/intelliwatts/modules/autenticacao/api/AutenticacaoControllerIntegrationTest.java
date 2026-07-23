package br.com.gtechsolutions.intelliwatts.modules.autenticacao.api;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.CookieManager;
import java.net.CookiePolicy;
import java.net.HttpCookie;
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
class AutenticacaoControllerIntegrationTest {

    private static final String EMOJI_QUATRO_BYTES = "\uD83D\uDE00";
    private static final String SENHA_VALIDA = "uma-senha-de-login-123";

    @LocalServerPort
    private int port;

    @Autowired
    private JsonMapper jsonMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void deveRejeitarLoginSemCsrf() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri("/auth/login"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(
                        jsonLogin("usuario@example.com", SENHA_VALIDA)))
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
    void deveAutenticarTrocarIdDaSessaoERetornarUsuario() throws Exception {
        Usuario usuario = salvarUsuario(
                "Mykael Costa",
                "login.valido@example.com");
        ClienteHttp cliente = novoClienteComCookies();
        DadosCsrf csrf = obterCsrf(cliente);
        String sessaoAntesDoLogin = cookieSessao(cliente).getValue();

        HttpResponse<String> login = login(
                cliente,
                csrf,
                "  LOGIN.VALIDO@EXAMPLE.COM  ",
                SENHA_VALIDA);

        assertThat(login.statusCode()).isEqualTo(200);
        JsonNode loginBody = jsonMapper.readTree(login.body());
        assertThat(loginBody.path("id").asString())
                .isEqualTo(usuario.getId().toString());
        assertThat(loginBody.path("nome").asString())
                .isEqualTo("Mykael Costa");
        assertThat(loginBody.path("email").asString())
                .isEqualTo("login.valido@example.com");
        assertThat(loginBody.has("senha")).isFalse();
        assertThat(loginBody.has("senha_hash")).isFalse();

        HttpCookie cookieDepoisDoLogin = cookieSessao(cliente);
        assertThat(cookieDepoisDoLogin.getValue())
                .isNotEqualTo(sessaoAntesDoLogin);
        assertThat(cookieDepoisDoLogin.isHttpOnly()).isTrue();

        HttpResponse<String> me = buscarUsuarioAtual(cliente);
        assertThat(me.statusCode()).isEqualTo(200);
        assertThat(jsonMapper.readTree(me.body()).path("id").asString())
                .isEqualTo(usuario.getId().toString());
    }

    @Test
    void deveRetornarRespostaIgualParaSenhaErradaEEmailAusente()
            throws Exception {
        salvarUsuario(
                "Usuário Protegido",
                "credencial.protegida@example.com");
        ClienteHttp cliente = novoClienteComCookies();
        DadosCsrf csrf = obterCsrf(cliente);

        HttpResponse<String> senhaErrada = login(
                cliente,
                csrf,
                "credencial.protegida@example.com",
                "senha-incorreta");
        HttpResponse<String> emailAusente = login(
                cliente,
                csrf,
                "nao-cadastrado@example.com",
                "senha-incorreta");

        assertThat(senhaErrada.statusCode()).isEqualTo(401);
        assertThat(emailAusente.statusCode()).isEqualTo(401);

        JsonNode erroSenha = jsonMapper.readTree(senhaErrada.body());
        JsonNode erroEmail = jsonMapper.readTree(emailAusente.body());
        assertThat(erroSenha.path("codigo").asString())
                .isEqualTo("CREDENCIAIS_INVALIDAS");
        assertThat(erroEmail.path("codigo").asString())
                .isEqualTo("CREDENCIAIS_INVALIDAS");
        assertThat(erroSenha.path("mensagem").asString())
                .isEqualTo("E-mail ou senha inválidos")
                .isEqualTo(erroEmail.path("mensagem").asString());
    }

    @Test
    void deveRetornarBadRequestParaLoginInvalido() throws Exception {
        ClienteHttp cliente = novoClienteComCookies();
        DadosCsrf csrf = obterCsrf(cliente);

        HttpResponse<String> response = enviarLogin(
                cliente,
                csrf,
                """
                {
                  "email": "email-invalido",
                  "senha": " "
                }
                """);

        assertThat(response.statusCode()).isEqualTo(400);
        JsonNode body = jsonMapper.readTree(response.body());
        assertThat(body.path("codigo").asString())
                .isEqualTo("ENTRADA_INVALIDA");
        assertThat(body.path("erros").has("email")).isTrue();
        assertThat(body.path("erros").has("senha")).isTrue();
    }

    @Test
    void deveRejeitarSenhaAcimaDe72BytesEmUtf8NoLogin() throws Exception {
        ClienteHttp cliente = novoClienteComCookies();
        DadosCsrf csrf = obterCsrf(cliente);

        HttpResponse<String> response = login(
                cliente,
                csrf,
                "senha-longa@example.com",
                EMOJI_QUATRO_BYTES.repeat(19));

        assertThat(response.statusCode()).isEqualTo(400);
        JsonNode body = jsonMapper.readTree(response.body());
        assertThat(body.path("codigo").asString())
                .isEqualTo("ENTRADA_INVALIDA");
        assertThat(body.path("erros").has("senha")).isTrue();
    }

    @Test
    void deveEncerrarSessaoNoLogout() throws Exception {
        salvarUsuario(
                "Usuário Logout",
                "logout@example.com");
        ClienteHttp cliente = novoClienteComCookies();
        DadosCsrf csrf = obterCsrf(cliente);
        assertThat(login(
                cliente,
                csrf,
                "logout@example.com",
                SENHA_VALIDA).statusCode()).isEqualTo(200);
        assertThat(buscarUsuarioAtual(cliente).statusCode()).isEqualTo(200);

        HttpResponse<String> logoutComTokenAnterior = logout(cliente, csrf);
        assertThat(logoutComTokenAnterior.statusCode()).isEqualTo(403);
        assertThat(jsonMapper.readTree(logoutComTokenAnterior.body())
                .path("codigo")
                .asString()).isEqualTo("CSRF_INVALIDO");
        assertThat(buscarUsuarioAtual(cliente).statusCode()).isEqualTo(200);

        DadosCsrf csrfAutenticado = obterCsrf(cliente);
        assertThat(csrfAutenticado.token()).isNotEqualTo(csrf.token());
        HttpResponse<String> logout = logout(cliente, csrfAutenticado);

        assertThat(logout.statusCode()).isEqualTo(204);
        assertThat(logout.body()).isEmpty();
        HttpResponse<String> meAposLogout = buscarUsuarioAtual(cliente);
        assertThat(meAposLogout.statusCode()).isEqualTo(401);
        assertThat(jsonMapper.readTree(meAposLogout.body())
                .path("codigo")
                .asString()).isEqualTo("NAO_AUTENTICADO");
    }

    private Usuario salvarUsuario(String nome, String email) {
        return usuarioRepository.save(Usuario.criar(
                nome,
                email,
                passwordEncoder.encode(SENHA_VALIDA)));
    }

    private ClienteHttp novoClienteComCookies() {
        CookieManager cookieManager = new CookieManager(
                null,
                CookiePolicy.ACCEPT_ALL);
        HttpClient httpClient = HttpClient.newBuilder()
                .cookieHandler(cookieManager)
                .build();

        return new ClienteHttp(httpClient, cookieManager);
    }

    private DadosCsrf obterCsrf(ClienteHttp cliente) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri("/auth/csrf"))
                .GET()
                .build();
        HttpResponse<String> response = cliente.httpClient().send(
                request,
                HttpResponse.BodyHandlers.ofString());

        assertThat(response.statusCode()).isEqualTo(200);
        JsonNode body = jsonMapper.readTree(response.body());
        return new DadosCsrf(
                body.path("token").asString(),
                body.path("header_name").asString());
    }

    private HttpResponse<String> login(
            ClienteHttp cliente,
            DadosCsrf csrf,
            String email,
            String senha) throws Exception {
        return enviarLogin(
                cliente,
                csrf,
                jsonLogin(email, senha));
    }

    private HttpResponse<String> enviarLogin(
            ClienteHttp cliente,
            DadosCsrf csrf,
            String json) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri("/auth/login"))
                .header("Content-Type", "application/json")
                .header(csrf.headerName(), csrf.token())
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        return cliente.httpClient().send(
                request,
                HttpResponse.BodyHandlers.ofString());
    }

    private HttpResponse<String> buscarUsuarioAtual(ClienteHttp cliente)
            throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri("/auth/me"))
                .GET()
                .build();

        return cliente.httpClient().send(
                request,
                HttpResponse.BodyHandlers.ofString());
    }

    private HttpResponse<String> logout(
            ClienteHttp cliente,
            DadosCsrf csrf) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri("/auth/logout"))
                .header(csrf.headerName(), csrf.token())
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();

        return cliente.httpClient().send(
                request,
                HttpResponse.BodyHandlers.ofString());
    }

    private HttpCookie cookieSessao(ClienteHttp cliente) {
        return cliente.cookieManager()
                .getCookieStore()
                .getCookies()
                .stream()
                .filter(cookie -> cookie.getName().equals("JSESSIONID"))
                .findFirst()
                .orElseThrow();
    }

    private String jsonLogin(String email, String senha) throws Exception {
        return jsonMapper.writeValueAsString(Map.of(
                "email", email,
                "senha", senha));
    }

    private URI uri(String caminho) {
        return URI.create("http://localhost:" + port + caminho);
    }

    private record ClienteHttp(
            HttpClient httpClient,
            CookieManager cookieManager) {
    }

    private record DadosCsrf(String token, String headerName) {
    }
}
