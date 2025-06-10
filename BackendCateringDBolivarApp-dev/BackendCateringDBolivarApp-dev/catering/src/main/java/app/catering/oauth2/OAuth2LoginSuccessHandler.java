package app.catering.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        // Aquí obtienes los datos del usuario autenticado
        var principal = (org.springframework.security.oauth2.core.user.DefaultOAuth2User) authentication.getPrincipal();

        String nombres = (String) principal.getAttribute("name");
        String email = (String) principal.getAttribute("email");
        String nombreUsuario = email.split("@")[0];
        String apellidos = "LastName"; // Si lo quieres separar, tendrás que usar más lógica

        // Simula un token JWT (en la práctica lo generas)
        String token = "ejemplo_token";

        // Codifica los parámetros
        String redirectUrl = "http://localhost:3000/oauth2"
        + "?token=" + URLEncoder.encode(token, StandardCharsets.UTF_8)
        + "&nombreUsuario=" + URLEncoder.encode(nombreUsuario, StandardCharsets.UTF_8)
        + "&nombres=" + URLEncoder.encode(nombres, StandardCharsets.UTF_8)
        + "&apellidos=" + URLEncoder.encode(apellidos, StandardCharsets.UTF_8)
        + "&email=" + URLEncoder.encode(email, StandardCharsets.UTF_8);


        // Redirige al frontend
        response.sendRedirect(redirectUrl);
    }
}
