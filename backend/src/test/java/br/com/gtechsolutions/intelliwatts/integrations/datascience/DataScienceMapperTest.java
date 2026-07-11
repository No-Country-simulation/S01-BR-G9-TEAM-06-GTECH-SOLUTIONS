package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.util.List;

import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseRequest;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseResponse;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaRequest;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaResponse;
import org.junit.jupiter.api.Test;

class DataScienceMapperTest {

    private final DataScienceMapper mapper = new DataScienceMapper();

    @Test
    void deveConverterRequestPublicoParaContratoDataScience() {
        AnaliseEnergeticaRequest request = new AnaliseEnergeticaRequest(
                new BigDecimal("305"),
                false,
                13,
                "Comércio",
                2
        );
        BigDecimal tarifaReferencia = new BigDecimal("0.75");

        DataScienceAnaliseRequest result = mapper.toDataScienceRequest(
                request,
                tarifaReferencia
        );

        assertThat(result.consumoKwh()).isEqualByComparingTo("305");
        assertThat(result.usoHorarioPico()).isFalse();
        assertThat(result.quantidadeEquipamentos()).isEqualTo(13);
        assertThat(result.tipoImovel()).isEqualTo("Comércio");
        assertThat(result.horasAltoConsumo()).isEqualTo(2);
        assertThat(result.tarifaReferencia()).isEqualByComparingTo("0.75");
    }

    @Test
    void deveConverterResponseDataScienceParaResponsePublico() {
        DataScienceAnaliseResponse response = new DataScienceAnaliseResponse(
                "Moderado",
                new BigDecimal("0.78"),
                List.of(
                        new DataScienceAnaliseResponse.Recomendacao(
                                "uso_horario_pico",
                                "Reduzir o uso de equipamentos no horário de pico."
                        ),
                        new DataScienceAnaliseResponse.Recomendacao(
                                "quantidade_equipamentos",
                                "Revisar equipamentos com alto consumo."
                        )
                ),
                new DataScienceAnaliseResponse.EstimativaFinanceira(
                        new BigDecimal("305"),
                        new BigDecimal("0.75"),
                        new BigDecimal("228.75")
                ),
                "random-forest-v1"
        );

        AnaliseEnergeticaResponse result = mapper.toApiResponse(response);

        assertThat(result.categoria()).isEqualTo("Moderado");
        assertThat(result.probabilidade()).isEqualByComparingTo("0.78");
        assertThat(result.recomendacoes()).hasSize(2);
        assertThat(result.recomendacoes().get(0).causa()).isEqualTo("uso_horario_pico");
        assertThat(result.recomendacoes().get(0).descricao())
                .isEqualTo("Reduzir o uso de equipamentos no horário de pico.");
        assertThat(result.recomendacoes().get(1).causa()).isEqualTo("quantidade_equipamentos");
        assertThat(result.recomendacoes().get(1).descricao())
                .isEqualTo("Revisar equipamentos com alto consumo.");
        assertThat(result.estimativaFinanceira().consumoKwh()).isEqualByComparingTo("305");
        assertThat(result.estimativaFinanceira().tarifaReferencia()).isEqualByComparingTo("0.75");
        assertThat(result.estimativaFinanceira().custoEstimado()).isEqualByComparingTo("228.75");
        assertThat(result.modeloVersao()).isEqualTo("random-forest-v1");
    }
}
