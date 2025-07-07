package app.catering.Auth;

import java.util.HashMap;
import java.util.Map;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import app.catering.Services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService; // si no lo usas, elimínalo
    private final AuthService authService;

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

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            AuthResponse authResponse = authService.login(loginRequest);

            // crea la cookie
            ResponseCookie cookie = ResponseCookie.from("token", authResponse.getToken())
                    .httpOnly(false) // true si NO quieres leerlo en JS
                    .secure(false) // true en producción HTTPS
                    .path("/")
                    .maxAge(30 * 24 * 60 * 60)
                    .sameSite("Lax")
                    .build();

            response.addHeader("Set-Cookie", cookie.toString());

            // devuelvo email y roles al frontend
            return ResponseEntity.ok(Map.of(
                    "email", authResponse.getEmail(),
                    "roles", authResponse.getRoles()));
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

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody VerificationRequest verificationRequest) {
        try {
            boolean verified = authService.verifyUser(
                    verificationRequest.getEmail(),
                    verificationRequest.getCode());
            if (verified) {
                return ResponseEntity.ok(Map.of(
                        "message", "Cuenta verificada exitosamente. Ahora puedes iniciar sesión."));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "error", "Código de verificación o email inválido."));
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al verificar la cuenta: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal UserDetails principal) {
        try {
            System.out.println("AuthController /me - Principal: " + principal);
            
            if (principal == null) {
                System.out.println("AuthController /me - Principal is null");
                return ResponseEntity.status(403).body(Map.of("error", "No autenticado"));
            }
            
            String email = principal.getUsername();
            var roles = principal.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            
            System.out.println("AuthController /me - Email: " + email + ", Roles: " + roles);
            
            return ResponseEntity.ok(Map.of(
                    "email", email,
                    "roles", roles));
        } catch (Exception e) {
            System.err.println("AuthController /me - Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Error interno del servidor"));
        }
    }

}
