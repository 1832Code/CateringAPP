package app.catering.DTO;

import lombok.Data;

@Data
public class UsuarioResponseDTO {
    private Long id;
    private String dni;
    private String nombres;
    private String apellidos;
    private String telefono;
    private String email;
}
