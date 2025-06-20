package main.gourmet.Controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import main.gourmet.Entity.User;
import main.gourmet.Entity.Service.CustomUserDetailsService;
import main.gourmet.Entity.Service.UserService;
import main.gourmet.Jwt.JwtUtil;
import main.gourmet.Repository.UserRepository;
import main.gourmet.verification.Request.AuthResponse;
import main.gourmet.verification.Request.LoginRequest;
import main.gourmet.verification.Request.RegisterRequest;
import main.gourmet.verification.Request.VerificationRequest;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" }, allowCredentials = "true")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            User newUser = new User();
            newUser.setDni(registerRequest.dni);
            newUser.setFirstName(registerRequest.firstName);
            newUser.setLastName(registerRequest.lastName);
            newUser.setTelephone(registerRequest.telephone);
            newUser.setEmail(registerRequest.email);
            newUser.setPassword(registerRequest.password); // La contraseña se codificará en el servicio

            userService.registerNewUser(newUser);
            return ResponseEntity.ok("Usuario registrado exitosamente. Por favor, verifica tu correo electrónico.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestBody VerificationRequest verificationRequest) {
        boolean verified = userService.verifyUser(verificationRequest.email, verificationRequest.code);
        if (verified) {
            return ResponseEntity.ok("Correo electrónico verificado exitosamente. Ya puedes iniciar sesión.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Código de verificación incorrecto o correo no encontrado.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email, loginRequest.password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.email);
        String jwt = jwtUtil.generateToken(userDetails);

        Optional<User> userOptional = userRepository.findByEmail(loginRequest.email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: Usuario no encontrado después de autenticación.");
        }
        User user = userOptional.get();

        String[] roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .toArray(String[]::new);

        return ResponseEntity.ok(new AuthResponse(jwt, user.getId(), user.getEmail(), roles));
    }

    // ADMINISTRADOR

    // Endpoint para registrar un ADMINISTRADOR (ROLE_ADMIN)
    // Ahora usa el mismo DTO y setea todos los campos
    @PostMapping("/registeradmin")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequest request) { // Usamos RegisterRequest aquí
                                                                                   // también
        try {
            User adminUser = new User();
            adminUser.setFirstName(request.firstName);
            adminUser.setLastName(request.lastName);
            adminUser.setEmail(request.email);
            adminUser.setPassword(request.password);
            adminUser.setDni(request.dni); // Incluir DNI
            adminUser.setTelephone(request.telephone); // Incluir Teléfono

            User registeredAdmin = userService.registerAdminUser(adminUser);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Administrador registrado exitosamente. Se ha enviado un código de verificación a su email.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Nuevo endpoint para el login de administradores
    @PostMapping("/login-admin")
    public ResponseEntity<?> authenticateAdmin(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.email, loginRequest.password));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.email);

            // Here, you might want to add a check to ensure the logged-in user has the
            // ADMIN role.
            // This is a crucial step for a dedicated admin login.
            boolean isAdmin = userDetails.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

            if (!isAdmin) {
                // If the user is not an admin, reject the login for this endpoint.
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Acceso denegado: Solo administradores pueden iniciar sesión aquí.");
            }

            String jwt = jwtUtil.generateToken(userDetails);

            Optional<User> userOptional = userRepository.findByEmail(loginRequest.email);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error: Usuario administrador no encontrado después de autenticación.");
            }
            User user = userOptional.get();

            String[] roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .toArray(String[]::new);

            return ResponseEntity.ok(new AuthResponse(jwt, user.getId(), user.getEmail(), roles));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales incorrectas o error: " + e.getMessage());
        }
    }

    @GetMapping("/me-admin")
    public ResponseEntity<?> getAdminDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No authenticated user found.");
        }

        // The principal is typically the UserDetails object after successful
        // authentication
        String username;
        if (authentication.getPrincipal() instanceof UserDetails) {
            username = ((UserDetails) authentication.getPrincipal()).getUsername();
        } else {
            username = authentication.getPrincipal().toString();
        }

        Optional<User> userOptional = userRepository.findByEmail(username);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found in database.");
        }

        User user = userOptional.get();

        // Optional: Check if the user has the ADMIN role if this endpoint is strictly
        // for admins
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Not an administrator.");
        }

        // Create a DTO or a Map to return specific user details,
        // avoiding sending sensitive info like hashed password.
        // For simplicity, I'll return a Map here. You should create a proper DTO.
        // For example, an AdminDetailsResponse DTO with firstName, lastName, email,
        // roles, etc.
        java.util.Map<String, Object> adminDetails = new java.util.HashMap<>();
        adminDetails.put("id", user.getId());
        adminDetails.put("firstName", user.getFirstName());
        adminDetails.put("lastName", user.getLastName());
        adminDetails.put("email", user.getEmail());
        adminDetails.put("dni", user.getDni());
        adminDetails.put("telephone", user.getTelephone());
        adminDetails.put("roles",
                authentication.getAuthorities().stream().map(a -> a.getAuthority()).toArray(String[]::new));
        // You can add more fields from the User entity if needed

        return ResponseEntity.ok(adminDetails);
    }
}