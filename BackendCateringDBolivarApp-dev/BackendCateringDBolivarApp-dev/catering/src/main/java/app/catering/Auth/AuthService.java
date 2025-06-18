package app.catering.Auth;

import app.catering.Entity.User.Role;
import app.catering.Repository.UsuarioRepository;
import app.catering.JWT.JwtService;
import app.catering.Entity.User.Usuario;
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
        // Buscar el usuario por email
        Usuario usuario = usuarioRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Verificar la contraseña
        if (!passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // Generar token JWT con el email
        String token = jwtService.getToken(usuario);

        // Crear y devolver la respuesta
        return AuthResponse.builder()
                .token(token)
                .email(usuario.getEmail())
                .nombres(usuario.getNombres())
                .apellidos(usuario.getApellidos())
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        // Verifica si ya existe un usuario con el mismo email
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Ya existe un usuario con este email.");
        }

        Usuario nuevoUsuario = Usuario.builder()
                .dni(request.getDni())
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .confirmed(false)
                .build();

        usuarioRepository.save(nuevoUsuario);

        return AuthResponse.builder()
                .token(jwtService.getToken(nuevoUsuario))
                .build();
    }

}