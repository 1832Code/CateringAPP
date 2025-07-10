package app.catering.Auth;
import lombok.Data;

@Data
public class LoginRequest {
    // Correo electrónico que el usuario envía para iniciar sesión
    private String email;

    // Contraseña que el usuario envía para iniciar sesión
    private String password;
}