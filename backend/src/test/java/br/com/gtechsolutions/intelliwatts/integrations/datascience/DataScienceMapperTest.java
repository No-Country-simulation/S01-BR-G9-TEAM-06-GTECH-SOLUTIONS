package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;

import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseRequest;
import br.com.gtechsolutions.intelliwatts.integrations.datascience.dto.DataScienceAnaliseResponse;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaRequest;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaResponse;

class DataScienceMapperTest {

    private final DataScienceMapper mapper = new DataScienceMapper();

    @Test
    void deveConverterRequestPublicoParaContratoDataScience() {
        AnaliseEnergeticaRequest request = new AnaliseEnergeticaRequest(
                new BigDecimal("305"),
                false,
                13,
                "Comércio",
                2);

        DataScienceAnaliseRequest result = mapper.toDataScienceRequest(request);

        assertThat(result.consumoKwh()).isEqualByComparingTo("305");
        assertThat(result.usoHorarioPico()).isFalse();
        assertThat(result.quantidadeEquipamentos()).isEqualTo(13);
        assertThat(result.tipoImovel()).isEqualTo("Comércio");
        assertThat(result.horasAltoConsumo()).isEqualTo(2);
    }

    @Test
    void deveConverterResponseDataScienceComCustoCalculado() {
        DataScienceAnaliseResponse response = new DataScienceAnaliseResponse(
                "Moderado",
                new BigDecimal("0.78"),
                List.of(
                        "Reduzir o uso de equipamentos no horário de pico.",
                        "Revisar equipamentos com alto consumo."));

        BigDecimal custoEstimadoMensal = new BigDecimal("228.75");

        AnaliseEnergeticaResponse result = mapper.toApiResponse(
                response,
                custoEstimadoMensal);

        assertThat(result.categoria()).isEqualTo("Moderado");
        assertThat(result.probabilidade()).isEqualByComparingTo("0.78");
        assertThat(result.recomendacoes()).containsExactly(
                "Reduzir o uso de equipamentos no horário de pico.",
                "Revisar equipamentos com alto consumo.");
        assertThat(result.custoEstimadoMensal()).isEqualByComparingTo("228.75");
    }
}
