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

    /**
     * Login del usuario:
     * Verifica credenciales, valida cuenta confirmada, genera token JWT y devuelve AuthResponse.
     */
    public AuthResponse login(LoginRequest loginRequest) {
        try {
            // Autentica al usuario usando AuthenticationManager
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            // Busca usuario con roles
            Usuario user = usuarioRepository.findByEmailWithRoles(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Verifica si la cuenta fue confirmada
            if (!user.isConfirmed()) {
                throw new RuntimeException("La cuenta no ha sido confirmada. Por favor verifica tu correo.");
            }

            // Obtiene los roles como lista de String
            List<String> roles = user.getRoles()
                    .stream()
                    .map(role -> role.getName().name())
                    .toList();

            System.out.println("Roles cargados para usuario: " + roles);

            // Genera JWT
            String token = jwtService.generateToken(user);

            // Devuelve respuesta con token y datos del usuario
            return AuthResponse.builder()
                    .token(token)
                    .email(user.getEmail())
                    .id(user.getId())
                    .roles(roles)
                    .build();

        } catch (Exception e) {
            e.printStackTrace(); // Para depuración
            throw new RuntimeException("Error en el inicio de sesión: " + e.getMessage());
        }
    }

    /**
     * Registro de usuario:
     * Valida si ya existe, guarda usuario con estado no confirmado, envía correo de verificación.
     */
    public String register(RegisterRequest request) {
        // Verifica que no exista usuario con ese correo
        if (usuarioRepository.findByEmailWithRoles(request.getEmail()).isPresent()) {
            throw new RuntimeException("Ya existe un usuario con este email.");
        }
        if (usuarioRepository.findByDni(request.getDni()).isPresent()) {
            throw new RuntimeException("El DNI ya está registrado.");
        }

        // Obtiene rol USER
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Rol USER no encontrado"));

        // Genera código único de verificación
        String verificationCode = UUID.randomUUID().toString();

        // Construye entidad Usuario
        Usuario nuevoUsuario = Usuario.builder()
                .dni(request.getDni())
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(userRole))
                .confirmed(false) // aún no confirmada
                .verificationCode(verificationCode)
                .build();

        usuarioRepository.save(nuevoUsuario);

        // Envía correo con link de verificación
        emailService.sendVerificationEmail(nuevoUsuario);

        return "Usuario registrado correctamente. Por favor revisa tu correo para confirmar tu cuenta.";
    }

    /**
     * Verificación de cuenta:
     * Marca al usuario como confirmado y devuelve AuthResponse con JWT.
     */
    public AuthResponse verifyAccount(String code) {
        // Busca usuario por código de verificación
        Usuario usuario = usuarioRepository.findByVerificationCode(code)
                .orElseThrow(() -> new RuntimeException("Código de verificación inválido"));

        // Si ya estaba confirmado
        if (usuario.isConfirmed()) {
            throw new RuntimeException("Cuenta ya confirmada.");
        }

        // Marca como confirmada y limpia el código
        usuario.setConfirmed(true);
        usuario.setVerificationCode(null);
        usuarioRepository.save(usuario);

        // Genera JWT y devuelve AuthResponse
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

    /**
     * Crear administrador:
     * Similar al registro, pero asigna rol ADMIN y la cuenta ya queda confirmada.
     */
    public AuthResponse crearAdmin(RegisterRequest request) {
        // Verifica que no exista ya el email
        if (usuarioRepository.findByEmailWithRoles(request.getEmail()).isPresent()) {
            throw new RuntimeException("Ya existe un usuario con este email.");
        }

        // Obtiene rol ADMIN
        Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Rol ADMIN no encontrado"));

        // Crea nuevo usuario admin
        Usuario nuevoAdmin = Usuario.builder()
                .dni(request.getDni())
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(adminRole))
                .confirmed(true) // ya confirmado
                .build();

        usuarioRepository.save(nuevoAdmin);

        // Devuelve AuthResponse con JWT
        return AuthResponse.builder()
                .token(jwtService.generateToken(nuevoAdmin))
                .email(nuevoAdmin.getEmail())
                .id(nuevoAdmin.getId())
                .roles(nuevoAdmin.getRoles().stream().map(r -> r.getName().name()).toList())
                .build();
    }
}