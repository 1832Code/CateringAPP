package app.catering.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private Long id;
    private String dni;
    private String nombres;
    private String apellidos;
    private String telefono;
    private String email;
    private Set<String> roles;
}
