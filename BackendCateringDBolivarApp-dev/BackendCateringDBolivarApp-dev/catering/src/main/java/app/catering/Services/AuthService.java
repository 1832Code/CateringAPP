package app.catering.Services;

import app.catering.DTO.AuthResponse;
import app.catering.DTO.LoginRequest;
import app.catering.Repository.UsuarioRepository;
import app.catering.Security.JwtService;
import app.catering.Users.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public AuthResponse login(LoginRequest loginRequest) {
        // Buscar el usuario por nombre de usuario
        Usuario usuario = usuarioRepository.findByUsername(loginRequest.getNombreUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Verificar la contraseña
        if (!passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        
        // Generar token JWT
        String token = jwtService.generateToken(usuario.getUsername());
        
        // Crear y devolver la respuesta
        return AuthResponse.builder()
                .token(token)
                .nombreUsuario(usuario.getUsername())
                .nombres(usuario.getNombres())
                .apellidos(usuario.getApellidos())
                .build();
    }
}