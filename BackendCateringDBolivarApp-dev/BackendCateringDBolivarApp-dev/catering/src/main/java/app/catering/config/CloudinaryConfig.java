package app.catering.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class CloudinaryConfig {

    // Inyecta el valor de la propiedad cloudinary.cloud_name desde application.properties o application.yml
    @Value("${cloudinary.cloud_name}")
    private String cloudName;

    // Inyecta el valor de la propiedad cloudinary.api_key desde application.properties o application.yml
    @Value("${cloudinary.api_key}")
    private String apiKey;

    // Inyecta el valor de la propiedad cloudinary.api_secret desde application.properties o application.yml
    @Value("${cloudinary.api_secret}")
    private String apiSecret;

    /**
     * Define un bean de tipo Cloudinary configurado con las credenciales.
     * Este bean se puede inyectar en servicios para subir/gestionar imágenes en Cloudinary.
     */
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }
}