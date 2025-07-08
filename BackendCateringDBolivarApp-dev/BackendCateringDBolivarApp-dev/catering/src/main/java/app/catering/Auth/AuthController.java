package app.catering.Auth;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import app.catering.Repository.UsuarioRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import app.catering.Services.UsuarioService;
import app.catering.Entity.User.Usuario;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.BindingResult;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private AuthService authService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Registro de usuario
     * Recibe un RegisterRequest, lo valida y llama al AuthService para registrar.
     * Devuelve mensaje de exito o error.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registrar(@Valid @RequestBody RegisterRequest request) {
        try {
            String mensaje = authService.register(request); // delega registro al servicio
            Map<String, String> response = Map.of("message", mensaje);
            return ResponseEntity.ok(response); // devuelve 200 OK con mensaje
        } catch (RuntimeException e) {
            Map<String, String> error = Map.of("error", e.getMessage());
            return ResponseEntity.badRequest().body(error); // devuelve 400 con error
        }
    }

    /**
     * Verificación de cuenta
     * Recibe el código de verificación y llama al AuthService.
     * Si es exitoso, devuelve AuthResponse y coloca cookie con token.
     */
    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam("code") String code) {
        try {
            AuthResponse authResponse = authService.verifyAccount(code);

            // Crea cookie HTTP-Only con el token
            ResponseCookie cookie = ResponseCookie.from("token", authResponse.getToken())
                    .httpOnly(true)
                    .path("/")
                    .sameSite("Lax")
                    .build();

            // Devuelve respuesta con cookie y datos
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(authResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Login de usuario
     * Valida credenciales y genera token JWT.
     * Devuelve cookie con token y datos básicos del usuario.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            AuthResponse authResponse = authService.login(loginRequest);

            // Crea cookie con el token JWT
            ResponseCookie cookie = ResponseCookie.from("token", authResponse.getToken())
                    .httpOnly(true) // true si no necesitas acceder desde JS
                    .secure(false)   // true si usas HTTPS
                    .path("/")
                    .maxAge(3600)    // 1 hora de vida
                    .sameSite("Lax")
                    .build();

            // Añade cookie a la respuesta
            response.addHeader("Set-Cookie", cookie.toString());

            // Devuelve datos básicos del usuario
            return ResponseEntity.ok(Map.of(
                    "email", authResponse.getEmail(),
                    "roles", authResponse.getRoles()
            ));
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Logout de usuario
     * Invalida el token eliminando la cookie.
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Crea cookie vacía para eliminar la existente
        ResponseCookie deleteCookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0) // caduca inmediatamente
                .sameSite("Lax")
                .build();

        response.addHeader("Set-Cookie", deleteCookie.toString());

        return ResponseEntity.ok().body(Map.of("message", "Sesión cerrada"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal UserDetails principal) {
        try {
            System.out.println("AuthController /me - Principal: " + principal);

            if (principal == null) {
                System.out.println("AuthController /me - Principal is null");
                return ResponseEntity.status(401).body(Map.of("error", "No autenticado"));
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