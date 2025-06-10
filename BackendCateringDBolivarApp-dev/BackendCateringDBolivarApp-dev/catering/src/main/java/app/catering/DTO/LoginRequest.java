package app.catering.DTO;
import lombok.Data;

@Data
public class LoginRequest {
    private String nombreUsuario;
    private String password;
}