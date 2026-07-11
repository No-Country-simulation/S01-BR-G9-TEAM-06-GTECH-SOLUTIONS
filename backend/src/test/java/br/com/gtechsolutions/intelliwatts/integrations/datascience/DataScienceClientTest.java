package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import java.math.BigDecimal;
import java.net.URI;
import java.time.Duration;

import br.com.gtechsolutions.intelliwatts.core.exceptions.ServicoInferenciaIndisponivelException;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseRequest;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseResponse;
import jakarta.validation.Validation;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class DataScienceClientTest {

    private MockRestServiceServer server;
    private ValidatorFactory validatorFactory;
    private DataScienceClient client;

    @BeforeEach
    void setUp() {
        RestClient.Builder builder = RestClient.builder()
                .baseUrl("http://localhost:8000");

        server = MockRestServiceServer.bindTo(builder).build();
        validatorFactory = Validation.buildDefaultValidatorFactory();

        DataScienceProperties properties = new DataScienceProperties(
                URI.create("http://localhost:8000"),
                "/v1/inferencias",
                Duration.ofMillis(300),
                Duration.ofMillis(1500)
        );

        client = new DataScienceClient(
                builder.build(),
                properties,
                validatorFactory.getValidator()
        );
    }

    @AfterEach
    void tearDown() {
        server.verify();
        validatorFactory.close();
    }

    @Test
    void deveEnviarContratoSnakeCaseELerResposta() {
        server.expect(requestTo("http://localhost:8000/v1/inferencias"))
                .andExpect(method(HttpMethod.POST))
                .andExpect(content().json("""
                        {
                          "consumo_kwh": 305,
                          "uso_horario_pico": false,
                          "quantidade_equipamentos": 13,
                          "tipo_imovel": "Comércio",
                          "horas_alto_consumo": 2,
                          "tarifa_referencia": 0.75
                        }
                        """))
                .andRespond(withSuccess(responseValido(), MediaType.APPLICATION_JSON));

        DataScienceAnaliseResponse response = client.analisar(requestValido());

        assertThat(response.categoria()).isEqualTo("Moderado");
        assertThat(response.estimativaFinanceira().custoEstimado()).isEqualByComparingTo("228.75");
        assertThat(response.modeloVersao()).isEqualTo("random-forest-v1");
    }

    @Test
    void deveRejeitarCategoriaDesconhecida() {
        server.expect(requestTo("http://localhost:8000/v1/inferencias"))
                .andRespond(withSuccess(
                        responseValido().replace("Moderado", "Desconhecido"),
                        MediaType.APPLICATION_JSON
                ));

        assertThatThrownBy(() -> client.analisar(requestValido()))
                .isInstanceOf(ServicoInferenciaIndisponivelException.class)
                .hasMessageContaining("resposta inválida");
    }

    @Test
    void deveTraduzirStatusDeErroParaFalhaControlada() {
        server.expect(requestTo("http://localhost:8000/v1/inferencias"))
                .andRespond(withStatus(HttpStatus.SERVICE_UNAVAILABLE));

        assertThatThrownBy(() -> client.analisar(requestValido()))
                .isInstanceOf(ServicoInferenciaIndisponivelException.class)
                .hasMessageContaining("obter a análise");
    }

    private DataScienceAnaliseRequest requestValido() {
        return new DataScienceAnaliseRequest(
                new BigDecimal("305"),
                false,
                13,
                "Comércio",
                2,
                new BigDecimal("0.75")
        );
    }

    private String responseValido() {
        return """
                {
                  "categoria": "Moderado",
                  "probabilidade": 0.78,
                  "recomendacoes": [
                    {
                      "causa": "uso_horario_pico",
                      "descricao": "Reduzir o uso de equipamentos no horário de pico."
                    }
                  ],
                  "estimativa_financeira": {
                    "consumo_kwh": 305,
                    "tarifa_referencia": 0.75,
                    "custo_estimado": 228.75
                  },
                  "modelo_versao": "random-forest-v1"
                }
                """;
    }
}
