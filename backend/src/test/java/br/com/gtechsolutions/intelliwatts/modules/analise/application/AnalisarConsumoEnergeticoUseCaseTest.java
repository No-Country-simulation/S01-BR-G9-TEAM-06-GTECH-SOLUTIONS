package br.com.gtechsolutions.intelliwatts.modules.analise.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;

import br.com.gtechsolutions.intelliwatts.core.config.AnaliseProperties;
import br.com.gtechsolutions.intelliwatts.core.exceptions.ServicoInferenciaIndisponivelException;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.DataScienceClient;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.DataScienceMapper;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseRequest;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseResponse;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaRequest;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AnalisarConsumoEnergeticoUseCaseTest {

    @Mock
    private DataScienceClient dataScienceClient;

    private AnalisarConsumoEnergeticoUseCase useCase;

    @BeforeEach
    void setUp() {
        useCase = new AnalisarConsumoEnergeticoUseCase(
                new AnaliseProperties(new BigDecimal("0.75")),
                dataScienceClient,
                new DataScienceMapper()
        );
    }

    @Test
    void deveAcrescentarTarifaETraduzirRespostaDoDataScience() {
        AnaliseEnergeticaRequest request = requestValido();
        when(dataScienceClient.analisar(any())).thenReturn(responseValido("0.75"));

        AnaliseEnergeticaResponse response = useCase.executar(request);

        ArgumentCaptor<DataScienceAnaliseRequest> captor = ArgumentCaptor.forClass(
                DataScienceAnaliseRequest.class
        );
        verify(dataScienceClient).analisar(captor.capture());

        assertThat(captor.getValue().tarifaReferencia()).isEqualByComparingTo("0.75");
        assertThat(captor.getValue().consumoKwh()).isEqualByComparingTo("305");
        assertThat(response.categoria()).isEqualTo("Moderado");
        assertThat(response.estimativaFinanceira().custoEstimado()).isEqualByComparingTo("228.75");
        assertThat(response.modeloVersao()).isEqualTo("random-forest-v1");
    }

    @Test
    void deveRejeitarTarifaDiferenteDaEnviada() {
        when(dataScienceClient.analisar(any())).thenReturn(responseValido("0.80"));

        assertThatThrownBy(() -> useCase.executar(requestValido()))
                .isInstanceOf(ServicoInferenciaIndisponivelException.class)
                .hasMessageContaining("incompatíveis");
    }

    private AnaliseEnergeticaRequest requestValido() {
        return new AnaliseEnergeticaRequest(
                new BigDecimal("305"),
                false,
                13,
                "Casa",
                2
        );
    }

    private DataScienceAnaliseResponse responseValido(String tarifaReferencia) {
        return new DataScienceAnaliseResponse(
                "Moderado",
                new BigDecimal("0.78"),
                List.of(new DataScienceAnaliseResponse.Recomendacao(
                        "uso_horario_pico",
                        "Reduzir o uso de equipamentos no horário de pico."
                )),
                new DataScienceAnaliseResponse.EstimativaFinanceira(
                        new BigDecimal("305"),
                        new BigDecimal(tarifaReferencia),
                        new BigDecimal("228.75")
                ),
                "random-forest-v1"
        );
    }
}
