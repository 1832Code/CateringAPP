package app.catering.Auth;

import app.catering.Entity.User.Role;
import app.catering.Entity.User.RoleName;
import app.catering.Repository.RoleRepository;
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

import java.util.List;
import java.util.Set;

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

    public AuthResponse login(LoginRequest loginRequest) {
        try {
            // Autenticación del usuario
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            // Buscar usuario con roles
            Usuario user = usuarioRepository.findByEmailWithRoles(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            List<String> roles = user.getRoles()
                    .stream()
                    .map(role -> role.getName().name())
                    .toList(); // copia segura

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

    public AuthResponse register(RegisterRequest request) {
        try {
            if (usuarioRepository.findByEmailWithRoles(request.getEmail()).isPresent()) {
                throw new RuntimeException("Ya existe un usuario con este email.");
            }

            Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Rol USER no encontrado"));

            Usuario nuevoUsuario = Usuario.builder()
                    .dni(request.getDni())
                    .nombres(request.getNombres())
                    .apellidos(request.getApellidos())
                    .telefono(request.getTelefono())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .roles(Set.of(userRole))
                    .confirmed(false)
                    .build();

            usuarioRepository.save(nuevoUsuario);

            return AuthResponse.builder()
                    .token(jwtService.generateToken(nuevoUsuario))
                    .email(nuevoUsuario.getEmail())
                    .id(nuevoUsuario.getId())
                    .roles(nuevoUsuario.getRoles().stream().map(r -> r.getName().name()).toList())
                    .build();
        } catch (Exception e) {
            e.printStackTrace(); // 👈 Mostrará en consola el error real
            throw new RuntimeException("Error en el registro: " + e.getMessage());
        }
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