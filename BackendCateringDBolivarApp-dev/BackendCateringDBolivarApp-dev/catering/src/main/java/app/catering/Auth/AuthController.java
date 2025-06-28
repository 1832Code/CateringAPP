package app.catering.Auth;

import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import app.catering.Services.UsuarioService;
import app.catering.Entity.User.Usuario;
import jakarta.validation.Valid;

import org.springframework.validation.BindingResult;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private AuthService authService;

    // Registro de usuario usando DTO
    @PostMapping("/register")
    public ResponseEntity<?> registrar(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // Login de usuario por email y password
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            AuthResponse authResponse = authService.login(loginRequest);

            // Crea cookie con el token
            ResponseCookie cookie = ResponseCookie.from("token", authResponse.getToken())
                    .httpOnly(false) // true si no necesitas leer el token en JS
                    .secure(false)   // true solo si usas HTTPS
                    .path("/")
                    .maxAge(3600)    // 1 hora
                    .sameSite("Lax") // o "Strict"
                    .build();

            //  cookie al encabezado
            response.addHeader("Set-Cookie", cookie.toString());

            // Puedes devolver solo los datos no sensibles
            return ResponseEntity.ok(Map.of(
                    "email", authResponse.getEmail()
            ));
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie deleteCookie = ResponseCookie.from("token", "")
                .httpOnly(false)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        response.addHeader("Set-Cookie", deleteCookie.toString());

        return ResponseEntity.ok().body(Map.of("message", "Sesión cerrada"));
    }
}