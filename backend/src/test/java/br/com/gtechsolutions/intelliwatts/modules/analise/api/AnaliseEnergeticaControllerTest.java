package br.com.gtechsolutions.intelliwatts.modules.analise.api;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.http.converter.json.JacksonJsonHttpMessageConverter;

import tools.jackson.databind.DeserializationFeature;
import tools.jackson.databind.MapperFeature;
import tools.jackson.databind.json.JsonMapper;

import br.com.gtechsolutions.intelliwatts.core.api.GlobalExceptionHandler;
import br.com.gtechsolutions.intelliwatts.core.exceptions.ServicoInferenciaIndisponivelException;
import br.com.gtechsolutions.intelliwatts.modules.analise.api.dto.AnaliseEnergeticaResponse;
import br.com.gtechsolutions.intelliwatts.modules.analise.application.AnalisarConsumoEnergeticoUseCase;

class AnaliseEnergeticaControllerTest {

    private AnalisarConsumoEnergeticoUseCase useCase;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        useCase = mock(AnalisarConsumoEnergeticoUseCase.class);
        JsonMapper.Builder jsonMapperBuilder = JsonMapper.builder()
        .disable(MapperFeature.ALLOW_COERCION_OF_SCALARS)
        .disable(DeserializationFeature.ACCEPT_FLOAT_AS_INT)
        .enable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

        mockMvc = MockMvcBuilders
                .standaloneSetup(new AnaliseEnergeticaController(useCase))
                .setMessageConverters(
                    new JacksonJsonHttpMessageConverter(jsonMapperBuilder))
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void deveRetornarContratoPublicoDoMvp() throws Exception {
        when(useCase.executar(any())).thenReturn(responseValido());

        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestValido()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoria").value("Moderado"))
                .andExpect(jsonPath("$.probabilidade").value(0.78))
                .andExpect(jsonPath("$.recomendacoes[0]").value(
                        "Reduzir o uso de equipamentos no horário de pico."))
                .andExpect(jsonPath("$.custo_estimado_mensal").value(228.75))
                .andExpect(jsonPath("$.estimativaFinanceira").doesNotExist())
                .andExpect(jsonPath("$.modeloVersao").doesNotExist());
    }

    @Test
    void deveRejeitarZeroEquipamentosEZeroHoras() throws Exception {
        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "consumo_kwh": 100,
                          "uso_horario_pico": false,
                          "quantidade_equipamentos": 0,
                          "tipo_imovel": "Comércio",
                          "horas_alto_consumo": 0
                        }
                        """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.codigo").value("ENTRADA_INVALIDA"))
                .andExpect(jsonPath("$.erros.quantidade_equipamentos").exists())
                .andExpect(jsonPath("$.erros.horas_alto_consumo").exists());
    }

    @Test
    void deveAceitarValoresNosLimitesMaximos() throws Exception {
        when(useCase.executar(any())).thenReturn(responseValido());

        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "consumo_kwh": 700,
                          "uso_horario_pico": true,
                          "quantidade_equipamentos": 17,
                          "tipo_imovel": "Comércio",
                          "horas_alto_consumo": 24
                        }
                        """))
                .andExpect(status().isOk());
    }

    @Test
    void deveRejeitarValoresAcimaDosLimitesMaximos() throws Exception {
        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "consumo_kwh": 700.01,
                          "uso_horario_pico": true,
                          "quantidade_equipamentos": 18,
                          "tipo_imovel": "Comércio",
                          "horas_alto_consumo": 24
                        }
                        """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.codigo").value("ENTRADA_INVALIDA"))
                .andExpect(jsonPath("$.erros.consumo_kwh").value(
                        "consumo_kwh deve ser no máximo 700"))
                .andExpect(jsonPath("$.erros.quantidade_equipamentos").value(
                        "quantidade_equipamentos deve ser no máximo 17"));

        verifyNoInteractions(useCase);
    }

    @Test
    void deveRejeitarConsumoComEscalaExcessivaAntesDoCasoDeUso()
            throws Exception {
        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "consumo_kwh": 1e-1000000000,
                          "uso_horario_pico": false,
                          "quantidade_equipamentos": 13,
                          "tipo_imovel": "Comércio",
                          "horas_alto_consumo": 2
                        }
                        """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.codigo").value("ENTRADA_INVALIDA"))
                .andExpect(jsonPath("$.erros.consumo_kwh").value(
                        "consumo_kwh deve ter no máximo 3 casas decimais"));

        verifyNoInteractions(useCase);
    }

    @Test
    void deveRejeitarQuantidadeEquipamentosComoTexto() throws Exception {
        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "consumo_kwh": 100,
                          "uso_horario_pico": false,
                          "quantidade_equipamentos": "13",
                          "tipo_imovel": "Comércio",
                          "horas_alto_consumo": 2
                        }
                        """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.codigo").value("JSON_INVALIDO"));
    }

    @Test
    void deveRetornarBadRequestParaEntradaInvalida() throws Exception {
        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "consumo_kwh": 0,
                          "quantidade_equipamentos": -1,
                          "tipo_imovel": "",
                          "horas_alto_consumo": 25
                        }
                        """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.codigo").value("ENTRADA_INVALIDA"))
                .andExpect(jsonPath("$.caminho").value("/analise-energetica"))
                .andExpect(jsonPath("$.erros.consumo_kwh").exists())
                .andExpect(jsonPath("$.erros.uso_horario_pico").exists())
                .andExpect(jsonPath("$.erros.quantidade_equipamentos").exists())
                .andExpect(jsonPath("$.erros.tipo_imovel").exists())
                .andExpect(jsonPath("$.erros.horas_alto_consumo").exists());
    }

    @Test
    void deveRejeitarTipoImovelDesconhecido() throws Exception {
        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "consumo_kwh": 305,
                          "uso_horario_pico": false,
                          "quantidade_equipamentos": 13,
                          "tipo_imovel": "Pequeno estabelecimento",
                          "horas_alto_consumo": 2
                        }
                        """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.codigo").value("ENTRADA_INVALIDA"))
                .andExpect(jsonPath("$.erros.tipo_imovel").value(
                        "tipo_imovel deve ser Casa, Apartamento ou Comércio"));
    }

    @Test
    void deveRetornarBadRequestParaJsonInvalido() throws Exception {
        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.codigo").value("JSON_INVALIDO"))
                .andExpect(jsonPath("$.caminho").value("/analise-energetica"));
    }

    @Test
    void deveRetornarServiceUnavailableQuandoInferenciaFalhar() throws Exception {
        when(useCase.executar(any())).thenThrow(
                new ServicoInferenciaIndisponivelException("Falha interna"));

        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestValido()))
                .andExpect(status().isServiceUnavailable())
                .andExpect(jsonPath("$.status").value(503))
                .andExpect(jsonPath("$.codigo").value(
                        "SERVICO_INFERENCIA_INDISPONIVEL"))
                .andExpect(jsonPath("$.caminho").value("/analise-energetica"));
    }

    @Test
    void deveRetornarInternalServerErrorParaFalhaInesperada() throws Exception {
        when(useCase.executar(any())).thenThrow(
                new RuntimeException("Falha inesperada"));

        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestValido()))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(500))
                .andExpect(jsonPath("$.codigo").value("ERRO_INTERNO"))
                .andExpect(jsonPath("$.caminho").value("/analise-energetica"));
    }

    @Test
    void deveRetornarMethodNotAllowedParaMetodoNaoSuportado() throws Exception {
        mockMvc.perform(get("/analise-energetica"))
                .andExpect(status().isMethodNotAllowed())
                .andExpect(header().string(HttpHeaders.ALLOW, "POST"))
                .andExpect(jsonPath("$.status").value(405))
                .andExpect(jsonPath("$.codigo").value("METODO_NAO_PERMITIDO"))
                .andExpect(jsonPath("$.caminho").value("/analise-energetica"));
    }

    @Test
    void deveRetornarUnsupportedMediaTypeParaTipoNaoSuportado() throws Exception {
        mockMvc.perform(post("/analise-energetica")
                .contentType(MediaType.TEXT_PLAIN)
                .content(requestValido()))
                .andExpect(status().isUnsupportedMediaType())
                .andExpect(header().exists(HttpHeaders.ACCEPT))
                .andExpect(jsonPath("$.status").value(415))
                .andExpect(jsonPath("$.codigo").value("TIPO_MIDIA_NAO_SUPORTADO"))
                .andExpect(jsonPath("$.caminho").value("/analise-energetica"));
    }

    @Test
    void deveRetornarNotFoundParaRecursoInexistente() throws Exception {
        mockMvc.perform(get("/rota-inexistente"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.codigo").value("RECURSO_NAO_ENCONTRADO"))
                .andExpect(jsonPath("$.caminho").value("/rota-inexistente"));
    }

    private String requestValido() {
        return """
                {
                  "consumo_kwh": 305,
                  "uso_horario_pico": false,
                  "quantidade_equipamentos": 13,
                  "tipo_imovel": "Casa",
                  "horas_alto_consumo": 2
                }
                """;
    }

    private AnaliseEnergeticaResponse responseValido() {
        return new AnaliseEnergeticaResponse(
                "Moderado",
                new BigDecimal("0.78"),
                List.of(
                        "Reduzir o uso de equipamentos no horário de pico."),
                new BigDecimal("228.75"));
    }
}
