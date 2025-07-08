package app.catering.JWT;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.startsWith("/api/auth/register") ||
                path.startsWith("/api/auth/login") ||
                path.startsWith("/api/auth/verify") ||
                path.startsWith("/api/auth/logout") ||
                path.startsWith("/api/items/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = extractToken(request);
        System.out.println("\n=== JWT Filter ===");
        System.out.println("Method: " + request.getMethod());
        System.out.println("Path: " + request.getRequestURI());
        System.out.println("Token: " + (token != null ? token.substring(0, Math.min(20, token.length())) + "..." : "null"));

        if (!StringUtils.hasText(token)) {
            System.out.println("JWT Filter - No token found, continuing...");
            filterChain.doFilter(request, response);
            return;
        }

        String email = jwtService.extractEmailFromToken(token);
        System.out.println("JWT Filter - Email extracted: " + email);

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                System.out.println("JWT Filter - UserDetails loaded: " + userDetails.getUsername() + ", Authorities: " + userDetails.getAuthorities());

                String rolDesdeBD = userDetails.getAuthorities().stream()
                        .findFirst()
                        .map(Object::toString)
                        .orElse("USER");

                System.out.println("JWT Filter - Role from DB: " + rolDesdeBD);

                if (!esAdminValido(email, rolDesdeBD)) {
                    System.out.println("JWT Filter - Admin validation failed for: " + email);
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Intento de privilegio no autorizado detectado.");
                    return;
                }

                if (jwtService.isTokenValid(token, userDetails)) {
                    System.out.println("JWT Filter - Token is valid, setting authentication");
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                            null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    System.out.println("JWT Filter - Token is invalid");
                }
            } catch (Exception e) {
                System.err.println("JWT Filter - Error processing token: " + e.getMessage());
                e.printStackTrace();
            }
        }

        filterChain.doFilter(request, response);
    }
    private String extractToken(HttpServletRequest request) {
        // 1. Busca en el header Authorization
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }
        // 2. Si no está, busca en la cookie
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
    // Usado con Token
    private String getTokenFromRequest (HttpServletRequest request){
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")){
            return authHeader.substring(7);
        }
        return null;
    }

    private boolean esAdminValido(String email, String rolDesdeBD) {
        // Valida que el rol sea ADMIN solo si el email pertenece a un dominio específico o está en lista segura
        if ("ADMIN".equalsIgnoreCase(rolDesdeBD)) {
            return email.endsWith("@miempresa.com") || email.equals("admin@miempresa.com");
        }
        return true;
    }
}