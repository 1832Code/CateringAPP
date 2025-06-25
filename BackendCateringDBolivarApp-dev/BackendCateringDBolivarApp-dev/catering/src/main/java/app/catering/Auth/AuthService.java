package app.catering.Auth;

import app.catering.Entity.User.Role;
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
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        Usuario user = usuarioRepository.findByEmailWithRoles(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .id(user.getId())
                .roles(user.getRoles().stream().map(r -> r.getName().name()).toList())
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        if (usuarioRepository.findByEmailWithRoles(request.getEmail()).isPresent()) {
            throw new RuntimeException("Ya existe un usuario con este email.");
        }

        // Obtener rol por defecto (USER)
        Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Rol USER no encontrado"));

        Usuario nuevoUsuario = Usuario.builder()
                .dni(request.getDni())
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(userRole)) // ahora usa Set<Role>
                .confirmed(false)
                .build();

        usuarioRepository.save(nuevoUsuario);

        return AuthResponse.builder()
                .token(jwtService.generateToken(nuevoUsuario))
                .email(nuevoUsuario.getEmail())
                .id(nuevoUsuario.getId())
                .roles(nuevoUsuario.getRoles().stream().map(r -> r.getName().name()).toList())
                .build();
    }

    public AuthResponse crearAdmin(RegisterRequest request) {
        if (usuarioRepository.findByEmailWithRoles(request.getEmail()).isPresent()) {
            throw new RuntimeException("Ya existe un usuario con este email.");
        }

        // Obtener rol ADMIN
        Role adminRole = roleRepository.findByName(Role.RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Rol ADMIN no encontrado"));

        Usuario nuevoAdmin = Usuario.builder()
                .dni(request.getDni())
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(adminRole)) // Asigna directamente el rol ADMIN
                .confirmed(true) // Se asume que un admin creado por otro ya está confirmado
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