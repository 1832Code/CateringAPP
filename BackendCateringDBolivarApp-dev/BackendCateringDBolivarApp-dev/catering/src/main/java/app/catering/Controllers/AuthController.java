package app.catering.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import app.catering.DTO.AuthResponse;
import app.catering.DTO.LoginRequest;
import app.catering.Services.AuthService;
import app.catering.Services.UsuarioService;
import app.catering.Users.Usuario;
import jakarta.validation.Valid;

import org.springframework.validation.BindingResult;

// Controlador REST para manejar operaciones de autenticación
@RestController
// Define la ruta base para todos los endpoints en este controlador
@RequestMapping("/api/auth")
// Permite solicitudes CORS desde el frontend en localhost:3000
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    // Inyección automática del servicio de usuario
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private AuthService authService;

    // Endpoint POST para registrar nuevos usuarios
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(
            // @Valid indica que el objeto Usuario debe ser validado según sus anotaciones
            // @RequestBody indica que el objeto Usuario viene en el cuerpo de la solicitud
            @Valid @RequestBody Usuario usuario, 
            // BindingResult contiene los resultados de la validación
            BindingResult result) {
        
        // Si hay errores de validación, devuelve un mapa con mensaje de error
        if (result.hasErrors()) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", "Datos inválidos");
            return ResponseEntity.badRequest().body(error);
        }

        try {
            // Si la validación es exitosa, registra al usuario mediante el servicio
            Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);
            // Devuelve el nuevo usuario creado con código de estado 200 OK
            return ResponseEntity.ok(nuevoUsuario);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    // Endpoint POST para iniciar sesión
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            AuthResponse authResponse = authService.login(loginRequest);
            return ResponseEntity.ok(authResponse);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}