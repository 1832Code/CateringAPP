package app.catering.Auth;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "El DNI es obligatorio")
    // Documento nacional de identidad del usuario (campo obligatorio)
    private String dni;

    @NotBlank(message = "Nombres son obligatorios")
    // Nombres del usuario (campo obligatorio)
    private String nombres;

    @NotBlank(message = "Apellidos son obligatorios")
    // Apellidos del usuario (campo obligatorio)
    private String apellidos;

    @NotBlank(message = "Teléfono es obligatorio")
    // Número de teléfono del usuario (campo obligatorio)
    private String telefono;

    @NotBlank(message = "Contraseña es obligatoria")
    // Contraseña que usará el usuario para iniciar sesión (campo obligatorio)
    private String password;

    @Email(message = "Correo electrónico no válido")
    @NotBlank(message = "Email es obligatorio")
    // Correo electrónico válido y obligatorio para el usuario
    private String email;
}