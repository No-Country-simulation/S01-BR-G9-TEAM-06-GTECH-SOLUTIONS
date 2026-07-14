package br.com.gtechsolutions.intelliwatts.modules.analise.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import br.com.gtechsolutions.intelliwatts.core.config.AnaliseProperties;
import br.com.gtechsolutions.intelliwatts.core.exceptions.ServicoInferenciaIndisponivelException;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.DataScienceClient;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.DataScienceMapper;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseRequest;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseResponse;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaRequest;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaResponse;

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
                new DataScienceMapper());
    }

    @Test
    void deveEnviarIndicadoresECalcularCustoMensal() {
        AnaliseEnergeticaRequest request = requestValido();
        when(dataScienceClient.analisar(any())).thenReturn(responseValido());

        AnaliseEnergeticaResponse response = useCase.executar(request);

        ArgumentCaptor<DataScienceAnaliseRequest> captor = ArgumentCaptor.forClass(
                DataScienceAnaliseRequest.class);
        verify(dataScienceClient).analisar(captor.capture());

        assertThat(captor.getValue().consumoKwh()).isEqualByComparingTo("305");
        assertThat(captor.getValue().usoHorarioPico()).isFalse();
        assertThat(captor.getValue().quantidadeEquipamentos()).isEqualTo(13);
        assertThat(captor.getValue().tipoImovel()).isEqualTo("Casa");
        assertThat(captor.getValue().horasAltoConsumo()).isEqualTo(2);

        assertThat(response.categoria()).isEqualTo("Moderado");
        assertThat(response.probabilidade()).isEqualByComparingTo("0.78");
        assertThat(response.recomendacoes()).containsExactly(
                "Reduzir o uso de equipamentos no horário de pico.");
        assertThat(response.custoEstimadoMensal()).isEqualByComparingTo("228.75");
    }

    @Test
    void deveArredondarCustoMensalParaDuasCasas() {
        AnaliseEnergeticaRequest request = new AnaliseEnergeticaRequest(
                new BigDecimal("10.01"),
                false,
                1,
                "Casa",
                1);
        when(dataScienceClient.analisar(any())).thenReturn(responseValido());

        AnaliseEnergeticaResponse response = useCase.executar(request);

        assertThat(response.custoEstimadoMensal()).isEqualByComparingTo("7.51");
    }

    @Test
    void devePropagarIndisponibilidadeDoDataScience() {
        when(dataScienceClient.analisar(any())).thenThrow(
                new ServicoInferenciaIndisponivelException(
                        "Serviço de inferência indisponível"));

        assertThatThrownBy(() -> useCase.executar(requestValido()))
                .isInstanceOf(ServicoInferenciaIndisponivelException.class)
                .hasMessageContaining("indisponível");
    }

    private AnaliseEnergeticaRequest requestValido() {
        return new AnaliseEnergeticaRequest(
                new BigDecimal("305"),
                false,
                13,
                "Casa",
                2);
    }

    private DataScienceAnaliseResponse responseValido() {
        return new DataScienceAnaliseResponse(
                "Moderado",
                new BigDecimal("0.78"),
                List.of(
                        "Reduzir o uso de equipamentos no horário de pico."));
    }
}
