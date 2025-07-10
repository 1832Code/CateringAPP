package app.catering.config;

import jakarta.validation.Validator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@Configuration
public class ValidationConfig {
    /**
     * Define un bean de tipo Validator.
     * Spring usará este bean para realizar validaciones (por ejemplo, @Valid en controladores).
     * Implementado mediante LocalValidatorFactoryBean, que integra Hibernate Validator.
     */
    @Bean
    public Validator validator() {
        return new LocalValidatorFactoryBean();
    }
}
