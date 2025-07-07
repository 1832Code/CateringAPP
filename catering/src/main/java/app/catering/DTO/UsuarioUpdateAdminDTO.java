package app.catering.DTO;

import app.catering.Entity.User.Role;
import app.catering.Entity.User.RoleName;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UsuarioUpdateAdminDTO {
    @NotBlank
    private String dni;

    @NotBlank
    private String nombres;

    @NotBlank
    private String apellidos;

    @NotBlank
    private String telefono;

    @Email
    @NotBlank
    private String email;

    private String password; // opcional

    // El rol se recibe como texto y se transforma luego a una entidad Role
    private RoleName role;

    private Boolean confirmed;
}
