package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.InetSocketAddress;
import java.net.URI;
import java.time.Duration;
import java.util.concurrent.atomic.AtomicReference;

import org.junit.jupiter.api.Test;
import org.springframework.web.client.RestClient;

import com.sun.net.httpserver.HttpServer;

class DataScienceClientConfigurationTest {

    @Test
    void deveUsarHttp11SemSolicitarUpgrade() throws Exception {
        AtomicReference<String> upgradeSolicitado = new AtomicReference<>();
        AtomicReference<String> autorizacao = new AtomicReference<>();
        HttpServer servidor = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);

        servidor.createContext("/teste", exchange -> {
            upgradeSolicitado.set(exchange.getRequestHeaders().getFirst("Upgrade"));
            autorizacao.set(exchange.getRequestHeaders().getFirst("Authorization"));
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
        });
        servidor.start();

        try {
            DataScienceProperties properties = new DataScienceProperties(
                    URI.create("http://127.0.0.1:" + servidor.getAddress().getPort()),
                    "/v1/inferencias",
                    Duration.ofSeconds(1),
                    Duration.ofSeconds(1),
                    16_384,
                    "0123456789abcdef0123456789abcdef");

            RestClient restClient = new DataScienceClientConfiguration()
                    .dataScienceRestClient(properties);

            restClient.get()
                    .uri("/teste")
                    .retrieve()
                    .toBodilessEntity();

            assertThat(upgradeSolicitado.get()).isNull();
            assertThat(autorizacao.get())
                    .isEqualTo(
                            "Bearer 0123456789abcdef0123456789abcdef");
        } finally {
            servidor.stop(0);
        }
    }
}
