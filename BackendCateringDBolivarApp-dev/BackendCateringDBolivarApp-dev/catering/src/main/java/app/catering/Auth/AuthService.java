package app.catering.Auth;

import app.catering.Entity.User.Role;
import app.catering.Repository.UsuarioRepository;
import app.catering.JWT.JwtService;
import app.catering.Entity.User.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));
        UserDetails user = usuarioRepository.findByEmail(loginRequest.getEmail()).orElseThrow();

        // Generar token JWT con el email
        String token = jwtService.getToken(user);

        // Crear y devolver la respuesta
        return AuthResponse.builder()
                .token(token)
                .email(user.getUsername())
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