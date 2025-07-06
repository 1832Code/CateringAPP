package app.catering.Auth;

import app.catering.Entity.User.Role;
import app.catering.Entity.User.RoleName;
import app.catering.Repository.RoleRepository;
import app.catering.Repository.UsuarioRepository;
import app.catering.JWT.JwtService;
import app.catering.Entity.User.Usuario;
import app.catering.Services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    private final EmailService emailService;

    public AuthResponse login(LoginRequest loginRequest) {
        try {
            // Autenticación básica: valida credenciales
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            // Buscar usuario con roles
            Usuario user = usuarioRepository.findByEmailWithRoles(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Validar que la cuenta esté confirmada
            if (!user.isConfirmed()) {
                throw new RuntimeException("La cuenta no ha sido confirmada. Por favor verifica tu correo.");
            }

            List<String> roles = user.getRoles()
                    .stream()
                    .map(role -> role.getName().name())
                    .toList();

            System.out.println("Roles cargados para usuario: " + roles);

            // Generar token
            String token = jwtService.generateToken(user);

            // Retornar respuesta
            return AuthResponse.builder()
                    .token(token)
                    .email(user.getEmail())
                    .id(user.getId())
                    .roles(roles)
                    .build();

        } catch (Exception e) {
            e.printStackTrace(); // Opcional: para debugging
            throw new RuntimeException("Error en el inicio de sesión: " + e.getMessage());
        }
    }

    public String register(RegisterRequest request) {
        if (usuarioRepository.findByEmailWithRoles(request.getEmail()).isPresent()) {
            throw new RuntimeException("Ya existe un usuario con este email.");
        }

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Rol USER no encontrado"));

        String verificationCode = UUID.randomUUID().toString();

        Usuario nuevoUsuario = Usuario.builder()
                .dni(request.getDni())
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(userRole))
                .confirmed(false)
                .verificationCode(verificationCode)
                .build();

        usuarioRepository.save(nuevoUsuario);

        // envía correo
        emailService.sendVerificationEmail(nuevoUsuario);
        return "Usuario registrado correctamente. Por favor revisa tu correo para confirmar tu cuenta.";

    }

    public AuthResponse verifyAccount(String code) {
        Usuario usuario = usuarioRepository.findByVerificationCode(code)
                .orElseThrow(() -> new RuntimeException("Código de verificación inválido"));

        if (usuario.isConfirmed()) {
            throw new RuntimeException("Cuenta ya confirmada.");
        }

        usuario.setConfirmed(true);
        usuario.setVerificationCode(null);
        usuarioRepository.save(usuario);

        String token = jwtService.generateToken(usuario);

        return AuthResponse.builder()
                .token(token)
                .email(usuario.getEmail())
                .id(usuario.getId())
                .roles(usuario.getRoles().stream()
                        .map(role -> role.getName().name())
                        .toList())
                .build();
    }

    public AuthResponse crearAdmin(RegisterRequest request) {
        if (usuarioRepository.findByEmailWithRoles(request.getEmail()).isPresent()) {
            throw new RuntimeException("Ya existe un usuario con este email.");
        }

        Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Rol ADMIN no encontrado"));

        Usuario nuevoAdmin = Usuario.builder()
                .dni(request.getDni())
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(adminRole))
                .confirmed(true)
                .build();

        usuarioRepository.save(nuevoAdmin);

        return AuthResponse.builder()
                .token(jwtService.generateToken(nuevoAdmin))
                .email(nuevoAdmin.getEmail())
                .id(nuevoAdmin.getId())
                .roles(nuevoAdmin.getRoles().stream().map(r -> r.getName().name()).toList())
                .build();
    }
}