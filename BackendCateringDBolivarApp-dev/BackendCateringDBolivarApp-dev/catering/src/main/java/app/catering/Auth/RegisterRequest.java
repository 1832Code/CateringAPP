package app.catering.Auth;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "El DNI es obligatorio")
    private String dni;
    
    @NotBlank(message = "Nombres son obligatorios")
    private String nombres;
    
    @NotBlank(message = "Apellidos son obligatorios")
    private String apellidos;
    
    @NotBlank(message = "Teléfono es obligatorio")
    private String telefono;
    
    @NotBlank(message = "Contraseña es obligatoria")
    private String password;
    
    @Email(message = "Correo electrónico no válido")
    @NotBlank(message = "Email es obligatorio")
    private String email;
}