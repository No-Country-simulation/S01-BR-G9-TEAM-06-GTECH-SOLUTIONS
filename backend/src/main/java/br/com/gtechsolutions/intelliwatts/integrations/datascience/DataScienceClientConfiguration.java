package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import java.net.http.HttpClient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Configuration(proxyBeanMethods = false)
public class DataScienceClientConfiguration {

    @Bean
    RestClient dataScienceRestClient(DataScienceProperties properties) {
        HttpClient httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .connectTimeout(properties.tempoConexao())
                .build();

        JdkClientHttpRequestFactory requestFactory = new JdkClientHttpRequestFactory(httpClient);
        requestFactory.setReadTimeout(properties.tempoResposta());

        return RestClient.builder()
                .baseUrl(properties.baseUrl().toString())
                .defaultHeader(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + properties.serviceToken())
                .requestFactory(requestFactory)
                .build();
    }
}
