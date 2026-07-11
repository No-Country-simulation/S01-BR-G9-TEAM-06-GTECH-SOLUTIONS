package br.com.gtechsolutions.intelliwatts.integrations.datascience;

import java.net.http.HttpClient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Configuration(proxyBeanMethods = false)
public class DataScienceClientConfiguration {

    @Bean
    RestClient dataScienceRestClient(DataScienceProperties properties) {
        HttpClient httpClient = HttpClient.newBuilder()
                .connectTimeout(properties.tempoConexao())
                .build();

        JdkClientHttpRequestFactory requestFactory = new JdkClientHttpRequestFactory(httpClient);
        requestFactory.setReadTimeout(properties.tempoResposta());

        return RestClient.builder()
                .baseUrl(properties.baseUrl().toString())
                .requestFactory(requestFactory)
                .build();
    }
}
