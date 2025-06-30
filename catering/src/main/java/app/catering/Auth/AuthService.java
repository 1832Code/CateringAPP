package app.catering.Auth;

import app.catering.Entity.User.Role;
import app.catering.Entity.User.RoleName;
import app.catering.Repository.RoleRepository;
import app.catering.Repository.UsuarioRepository;
import app.catering.Validation.Email.EmailService;
import app.catering.JWT.JwtService;
import app.catering.Entity.User.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

 public AuthResponse register(RegisterRequest request) {
        // 1. Check if user already exists
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El correo electrónico ya está registrado.");
        }
        if (usuarioRepository.findByDni(request.getDni()).isPresent()) {
            throw new RuntimeException("El DNI ya está registrado.");
        }

        // 2. Find the default role (e.g., ROLE_USER)
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Rol USER no encontrado. Por favor, contacte al administrador."));

        // 3. Generate verification code
        String verificationCode = generateRandomCode(6); // Generate a 6-digit code

        // 4. Create new user with unconfirmed status
        Usuario usuario = Usuario.builder()
                .dni(request.getDni())
                .nombres(request.getNombres())
                .apellidos(request.getApellidos())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Collections.singleton(userRole)) // Assign default role
                .verificationCode(verificationCode) // Store the code
                .confirmed(false) // User is not yet confirmed
                .build();

        usuarioRepository.save(usuario);

        // 5. Send verification email
        String subject = "Verificación de tu cuenta de Catering App";
        String body = "Hola " + usuario.getNombres() + ",\n\n"
                    + "Gracias por registrarte en Catering App. Por favor, usa el siguiente código para verificar tu cuenta:\n\n"
                    + "Código de Verificación: " + verificationCode + "\n\n"
                    + "Si no solicitaste esto, puedes ignorar este correo.\n\n"
                    + "Saludos,\nTu equipo de Catering App";
        emailService.sendEmail(usuario.getEmail(), subject, body);

        // 6. Return a response indicating pending verification
        return AuthResponse.builder()
                .message("Registro exitoso. Se ha enviado un código de verificación a tu correo electrónico.")
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        Usuario user = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        if (!user.isConfirmed()) {
            throw new RuntimeException("Tu cuenta no ha sido verificada. Por favor, revisa tu correo para el código de verificación.");
        }

        String jwt = jwtService.generateToken(user);
        return AuthResponse.builder().token(jwt).email(user.getEmail()).build();
    }

    public boolean verifyUser(String email, String code) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);

        if (optionalUsuario.isEmpty()) {
            return false; // User not found
        }

        Usuario usuario = optionalUsuario.get();

        // Check if already confirmed or code mismatch
        if (usuario.isConfirmed() || !code.equals(usuario.getVerificationCode())) {
            return false; // Already confirmed or invalid code
        }

        // Confirm the user
        usuario.setConfirmed(true);
        usuario.setVerificationCode(null); // Clear the code after successful verification
        usuarioRepository.save(usuario);
        return true;
    }

    private String generateRandomCode(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < length; i++) {
            code.append(random.nextInt(10)); // Append a random digit (0-9)
        }
        return code.toString();
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