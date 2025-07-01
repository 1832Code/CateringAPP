package app.catering.DTO;
// src/main/java/app/catering/DTO/UsuarioAdminDTO.java

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioAdminDto {
    private Long id;
    private String dni;
    private String nombres;
    private String apellidos;
    private String telefono;
    private String email;
    private boolean confirmed;
    private String verificationCode;
    private Set<String> roles;
}
