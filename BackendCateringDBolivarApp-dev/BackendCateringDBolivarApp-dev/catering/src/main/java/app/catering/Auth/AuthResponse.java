package app.catering.Auth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    // Token JWT generado tras login o verificación
    private String token;

    // Email del usuario autenticado
    private String email;

    // ID del usuario autenticado
    private Long id;

    // Lista de roles del usuario (por ejemplo: ADMIN, USER)
    private List<String> roles;
}