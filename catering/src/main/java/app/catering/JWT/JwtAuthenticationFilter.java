package app.catering.JWT;

import app.catering.Services.CustomUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component 
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailService userDetailsService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.startsWith("/api/auth/register") ||
               path.startsWith("/api/auth/login") ||
               path.startsWith("/api/auth/verify") ||
               path.startsWith("/api/auth/logout") ||
               path.startsWith("/api/items/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
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

    private boolean esAdminValido(String email, String rolDesdeBD) {
        // Comentamos la validación restrictiva para permitir acceso a cualquier ADMIN
        // if ("ADMIN".equalsIgnoreCase(rolDesdeBD)) {
        //     return email.endsWith("@miempresa.com") || email.equals("admin@miempresa.com");
        // }
        return true;
    }
}
