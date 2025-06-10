package app.catering.Security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Base64;

@Configuration
public class JwtConfig {
    
    @Value("${jwt.secret:clave_secreta_por_defecto_que_debe_ser_larga_para_seguridad}")
    private String secret;
    
    @Value("${jwt.expiration:3600000}") // 1 hora por defecto
    private long expirationTime;
    
    @Bean
    public Key getSigningKey() {
        byte[] keyBytes = Base64.getEncoder().encode(secret.getBytes());
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    public long getExpirationTime() {
        return expirationTime;
    }
}