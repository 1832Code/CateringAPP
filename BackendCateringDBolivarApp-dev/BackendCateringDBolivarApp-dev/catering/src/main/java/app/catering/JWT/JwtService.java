package app.catering.JWT;


import app.catering.Entity.User.Role;
import app.catering.Entity.User.Usuario;
import app.catering.Security.JwtConfig;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtConfig jwtConfig;
    private final Key signingKey;

    /**
     * Extrae el correo (subject) desde el token JWT.
     */
    public String extractEmailFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extrae la fecha de expiración del token.
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extrae cualquier claim usando una función resolvente.
     */
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        final Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    /**
     * Valida si el token es válido para el usuario especificado.
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = extractEmailFromToken(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /**
     * Verifica si el token ha expirado.
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extrae todos los claims del token.
     */
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token expirado", e);
        } catch (JwtException e) {
            throw new RuntimeException("Token inválido", e);
        }
    }

    /**
     * Genera un JWT para un usuario autenticado.
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        if (userDetails instanceof Usuario usuario) {
            claims.put("id", usuario.getId());
            claims.put("email", usuario.getEmail());
            claims.put("nombres", usuario.getNombres());
            claims.put("apellidos", usuario.getApellidos());

            // Ahora permite múltiples roles
            claims.put("roles", usuario.getRoles().stream()
                    .map(Role::getName)
                    .toList());
        }

        return buildToken(claims, userDetails.getUsername());
    }

    /**
     * Crea el token JWT con los claims y el subject (username/email).
     */
    private String buildToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getExpirationTime()))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }


}