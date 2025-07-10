package app.catering.Auth;
import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
public class VerificationRequest {
    @Email(message = "Correo electrónico no válido")
    @NotBlank(message = "Email es obligatorio")
    private String email;

    @NotBlank(message = "El código de verificación es obligatorio")
    private String code;
}
