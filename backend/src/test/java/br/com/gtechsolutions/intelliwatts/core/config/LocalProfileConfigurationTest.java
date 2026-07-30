package br.com.gtechsolutions.intelliwatts.core.config;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.springframework.boot.env.YamlPropertySourceLoader;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.env.MockEnvironment;

class LocalProfileConfigurationTest {

    private final YamlPropertySourceLoader loader =
            new YamlPropertySourceLoader();

    @Test
    void deveRestringirBancoLocalAoLoopback() throws IOException {
        MockEnvironment environment = carregar("application-local.yml");
        environment.setProperty("DB_PORT", "4407");
        environment.setProperty("DB_NAME", "intelliwatts_teste");

        assertThat(environment.getRequiredProperty("spring.datasource.url"))
                .isEqualTo(
                        "jdbc:mysql://localhost:4407/intelliwatts_teste"
                                + "?preserveInstants=true"
                                + "&connectionTimeZone=SERVER"
                                + "&sslMode=DISABLED"
                                + "&allowPublicKeyRetrieval=true");
        assertThat(environment.getRequiredProperty(
                "server.servlet.session.cookie.secure"))
                .isEqualTo("false");
    }

    @Test
    void deveManterTlsVerificadoNoPerfilPadrao() throws IOException {
        MockEnvironment environment = carregar("application.yml");

        assertThat(environment.getRequiredProperty("spring.datasource.url"))
                .endsWith("sslMode=VERIFY_IDENTITY");
        assertThat(environment.getRequiredProperty(
                "server.servlet.session.cookie.secure"))
                .isEqualTo("true");
    }

    private MockEnvironment carregar(String nomeArquivo) throws IOException {
        MockEnvironment environment = new MockEnvironment();

        for (PropertySource<?> propertySource : loader.load(
                nomeArquivo,
                new ClassPathResource(nomeArquivo))) {
            environment.getPropertySources().addLast(propertySource);
        }

        return environment;
    }
}
