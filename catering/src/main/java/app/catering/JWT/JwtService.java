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
import java.util.List;
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
        try {
            String email = extractClaim(token, Claims::getSubject);
            System.out.println("JwtService - Email extracted from token: " + email);
            return email;
        } catch (Exception e) {
            System.err.println("JwtService - Error extracting email from token: " + e.getMessage());
            return null;
        }
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
        try {
            final String email = extractEmailFromToken(token);
            boolean isValid = email.equals(userDetails.getUsername()) && !isTokenExpired(token);
            System.out.println("JwtService - Token validation: email=" + email + ", userDetails=" + userDetails.getUsername() + ", isValid=" + isValid);
            return isValid;
        } catch (Exception e) {
            System.err.println("JwtService - Error validating token: " + e.getMessage());
            return false;
        }
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
    public String generateToken(Usuario usuario) {
        Map<String, Object> claims = new HashMap<>();

        List<String> roles = usuario.getRoles()
                .stream()
                .map(role -> role.getName().name())
                .toList(); // Copia segura

        claims.put("id", usuario.getId());
        claims.put("email", usuario.getEmail());
        claims.put("nombres", usuario.getNombres());
        claims.put("apellidos", usuario.getApellidos());
        claims.put("roles", roles); // Usamos la copia

        System.out.println("Roles cargados para usuario: " + roles);

        return buildToken(claims, usuario.getUsername());
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

    // Removed duplicate generateToken(Usuario) method to resolve compilation error.


}