package app.catering.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UsuarioUpdateDTO {
    @NotBlank(message = "El DNI es obligatorio")
    private String dni;

    @NotBlank(message = "Nombres son obligatorios")
    private String nombres;

    @NotBlank(message = "Apellidos son obligatorios")
    private String apellidos;

    @NotBlank(message = "Teléfono es obligatorio")
    private String telefono;

    @Email(message = "Correo electrónico no válido")
    @NotBlank(message = "Correo electrónico es obligatorio")
    private String email;
}
