package br.com.gtechsolutions.intelliwatts.integrations.datascience.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

public record DataScienceAnaliseRequest(
        @JsonProperty("consumo_kwh") BigDecimal consumoKwh,

        @JsonProperty("uso_horario_pico") Boolean usoHorarioPico,

        @JsonProperty("quantidade_equipamentos") Integer quantidadeEquipamentos,

        @JsonProperty("tipo_imovel") String tipoImovel,

        @JsonProperty("horas_alto_consumo") Integer horasAltoConsumo) {
}
