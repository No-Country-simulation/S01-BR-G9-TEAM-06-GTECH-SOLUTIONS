package br.com.gtechsolutions.intelliwatts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class IntelliWattsApplication {

    public static void main(String[] args) {
        SpringApplication.run(IntelliWattsApplication.class, args);
    }
}
