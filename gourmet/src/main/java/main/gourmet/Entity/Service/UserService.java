package main.gourmet.Entity.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import main.gourmet.Entity.User;
import main.gourmet.Entity.ENUM.Role;
import main.gourmet.Repository.RoleRepository;
import main.gourmet.Repository.UserRepository;
import main.gourmet.verification.Email.EmailService;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public User registerNewUser(User user) throws Exception {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("El email ya está registrado.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Asignar el rol por defecto (ROLE_USER)
        Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Rol de usuario no encontrado."));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        // Generar código de verificación
        String verificationCode = UUID.randomUUID().toString().substring(0, 6).toUpperCase(); // Código corto para el
                                                                                              // ejemplo
        user.setVerificationCode(verificationCode);
        user.setEnabled(false); // La cuenta no está habilitada hasta que se verifique

        User savedUser = userRepository.save(user);

        // Enviar correo de verificación
        emailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getVerificationCode());

        return savedUser;
    }

    public boolean verifyUser(String email, String verificationCode) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!user.isEnabled() && user.getVerificationCode() != null
                    && user.getVerificationCode().equals(verificationCode)) {
                user.setEnabled(true);
                user.setVerificationCode(null); // Limpiar el código de verificación
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void createRolesIfNotExist() {
        if (roleRepository.findByName(Role.RoleName.ROLE_USER).isEmpty()) {
            roleRepository.save(new Role(null, Role.RoleName.ROLE_USER));
        }
        if (roleRepository.findByName(Role.RoleName.ROLE_ADMIN).isEmpty()) {
            roleRepository.save(new Role(null, Role.RoleName.ROLE_ADMIN));
        }
    }

    // ADMINISTRADOR

    // Método para registrar ADMINISTRADORES (ROLE_ADMIN)
    public User registerAdminUser(User adminUser) throws Exception { // Ahora recibe una entidad User completa
        if (userRepository.existsByEmail(adminUser.getEmail())) {
            throw new Exception("El email ya está registrado.");
        }

        adminUser.setPassword(passwordEncoder.encode(adminUser.getPassword()));

        Role adminRole = roleRepository.findByName(Role.RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Rol de administrador no encontrado."));
        Set<Role> roles = new HashSet<>();
        roles.add(adminRole);
        adminUser.setRoles(roles);

        // Asegurarse de que estos campos se establecen si vienen en la entidad User
        // adminUser.setDni(adminUser.getDni()); // Ya están en el objeto adminUser
        // adminUser.setTelephone(adminUser.getTelephone()); // Ya están en el objeto
        // adminUser

        adminUser.setVerificationCode(UUID.randomUUID().toString().substring(0, 6).toUpperCase());
        adminUser.setEnabled(false);

        User savedAdmin = userRepository.save(adminUser);
        emailService.sendVerificationEmail(savedAdmin.getEmail(), savedAdmin.getVerificationCode());
        return savedAdmin;
    }
}