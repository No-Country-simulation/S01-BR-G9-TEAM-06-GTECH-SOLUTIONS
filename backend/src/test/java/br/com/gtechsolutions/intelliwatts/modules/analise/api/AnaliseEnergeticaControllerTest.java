package br.com.gtechsolutions.intelliwatts.modules.analise.api;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.List;

import br.com.gtechsolutions.intelliwatts.core.api.GlobalExceptionHandler;
import br.com.gtechsolutions.intelliwatts.core.exceptions.ServicoInferenciaIndisponivelException;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaResponse;
import br.com.gtechsolutions.intelliwatts.modules.analise.application.AnalisarConsumoEnergeticoUseCase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class AnaliseEnergeticaControllerTest {

    private AnalisarConsumoEnergeticoUseCase useCase;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        useCase = mock(AnalisarConsumoEnergeticoUseCase.class);
        mockMvc = MockMvcBuilders
                .standaloneSetup(new AnaliseEnergeticaController(useCase))
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void deveRetornarAnaliseEnergetica() throws Exception {
        when(useCase.executar(any())).thenReturn(responseValido());

        mockMvc.perform(post("/api/v1/analises-energeticas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestValido()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoria").value("Moderado"))
                .andExpect(jsonPath("$.probabilidade").value(0.78))
                .andExpect(jsonPath("$.recomendacoes[0].causa").value("uso_horario_pico"))
                .andExpect(jsonPath("$.estimativaFinanceira.custoEstimado").value(228.75))
                .andExpect(jsonPath("$.modeloVersao").value("random-forest-v1"));
    }

    @Test
    void deveAceitarComercioComZeroEquipamentosEZeroHoras() throws Exception {
        when(useCase.executar(any())).thenReturn(responseValido());

        mockMvc.perform(post("/api/v1/analises-energeticas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "consumoKwh": 100,
                                  "usoHorarioPico": false,
                                  "quantidadeEquipamentos": 0,
                                  "tipoImovel": "Comércio",
                                  "horasAltoConsumo": 0
                                }
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void deveRetornarBadRequestParaEntradaInvalida() throws Exception {
        mockMvc.perform(post("/api/v1/analises-energeticas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "consumoKwh": 0,
                                  "quantidadeEquipamentos": -1,
                                  "tipoImovel": "",
                                  "horasAltoConsumo": 25
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.codigo").value("ENTRADA_INVALIDA"))
                .andExpect(jsonPath("$.erros.consumoKwh").exists())
                .andExpect(jsonPath("$.erros.usoHorarioPico").exists())
                .andExpect(jsonPath("$.erros.quantidadeEquipamentos").exists())
                .andExpect(jsonPath("$.erros.tipoImovel").exists())
                .andExpect(jsonPath("$.erros.horasAltoConsumo").exists());
    }

    @Test
    void deveRejeitarPequenoEstabelecimentoComoTipoImovel() throws Exception {
        mockMvc.perform(post("/api/v1/analises-energeticas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "consumoKwh": 305,
                                  "usoHorarioPico": false,
                                  "quantidadeEquipamentos": 13,
                                  "tipoImovel": "Pequeno estabelecimento",
                                  "horasAltoConsumo": 2
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.codigo").value("ENTRADA_INVALIDA"))
                .andExpect(jsonPath("$.erros.tipoImovel").value(
                        "tipoImovel deve ser Casa, Apartamento ou Comércio"
                ));
    }

    @Test
    void deveRetornarServiceUnavailableQuandoInferenciaFalhar() throws Exception {
        when(useCase.executar(any())).thenThrow(
                new ServicoInferenciaIndisponivelException("Falha interna")
        );

        mockMvc.perform(post("/api/v1/analises-energeticas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestValido()))
                .andExpect(status().isServiceUnavailable())
                .andExpect(jsonPath("$.codigo").value("SERVICO_INFERENCIA_INDISPONIVEL"))
                .andExpect(jsonPath("$.mensagem").value(
                        "O serviço de análise energética está temporariamente indisponível"
                ));
    }

    private String requestValido() {
        return """
                {
                  "consumoKwh": 305,
                  "usoHorarioPico": false,
                  "quantidadeEquipamentos": 13,
                  "tipoImovel": "Casa",
                  "horasAltoConsumo": 2
                }
                """;
    }

    private AnaliseEnergeticaResponse responseValido() {
        return new AnaliseEnergeticaResponse(
                "Moderado",
                new BigDecimal("0.78"),
                List.of(new AnaliseEnergeticaResponse.Recomendacao(
                        "uso_horario_pico",
                        "Reduzir o uso de equipamentos no horário de pico."
                )),
                new AnaliseEnergeticaResponse.EstimativaFinanceira(
                        new BigDecimal("305"),
                        new BigDecimal("0.75"),
                        new BigDecimal("228.75")
                ),
                "random-forest-v1"
        );
    }
}
