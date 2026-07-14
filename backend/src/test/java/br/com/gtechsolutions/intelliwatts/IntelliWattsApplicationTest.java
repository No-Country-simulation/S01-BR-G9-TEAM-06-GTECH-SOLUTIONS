package br.com.gtechsolutions.intelliwatts;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

import org.springframework.beans.factory.annotation.Autowired;

import tools.jackson.databind.DeserializationFeature;
import tools.jackson.databind.MapperFeature;
import tools.jackson.databind.json.JsonMapper;

@SpringBootTest
class IntelliWattsApplicationTest {

    @Autowired
    private JsonMapper jsonMapper;

    @Test
void deveCarregarConfiguracaoJsonEstrita() {
    assertThat(jsonMapper.isEnabled(
            MapperFeature.ALLOW_COERCION_OF_SCALARS))
            .isFalse();

    assertThat(jsonMapper.isEnabled(
            DeserializationFeature.ACCEPT_FLOAT_AS_INT))
            .isFalse();

    assertThat(jsonMapper.isEnabled(
            DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES))
            .isTrue();
}

    @Test
    void contextLoads() {
    }
}
