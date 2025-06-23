package app.catering.Mappers;

import app.catering.DTO.UsuarioDTO;
import app.catering.DTO.UsuarioResponseDTO;
import app.catering.DTO.UsuarioUpdateAdminDTO;
import app.catering.DTO.UsuarioUpdateDTO;
import app.catering.Entity.User.Usuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UsuarioMapper {
    public static UsuarioDTO toDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setDni(usuario.getDni());
        dto.setNombres(usuario.getNombres());
        dto.setApellidos(usuario.getApellidos());
        dto.setTelefono(usuario.getTelefono());
        dto.setEmail(usuario.getEmail());
        return dto;
    }

    public static void actualizarDesdeDTO(Usuario usuario, UsuarioUpdateDTO dto) {
        usuario.setDni(dto.getDni());
        usuario.setNombres(dto.getNombres());
        usuario.setApellidos(dto.getApellidos());
        usuario.setTelefono(dto.getTelefono());
        usuario.setEmail(dto.getEmail());
    }

    public static UsuarioResponseDTO toResponseDTO(Usuario usuario) {
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(usuario.getId());
        dto.setDni(usuario.getDni());
        dto.setNombres(usuario.getNombres());
        dto.setApellidos(usuario.getApellidos());
        dto.setTelefono(usuario.getTelefono());
        dto.setEmail(usuario.getEmail());
        return dto;
    }

    public static void actualizarDesdeAdminDTO(Usuario usuario, UsuarioUpdateAdminDTO dto, BCryptPasswordEncoder encoder) {
        usuario.setDni(dto.getDni());
        usuario.setNombres(dto.getNombres());
        usuario.setApellidos(dto.getApellidos());
        usuario.setTelefono(dto.getTelefono());
        usuario.setEmail(dto.getEmail());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            usuario.setPassword(encoder.encode(dto.getPassword()));
        }

        usuario.setRole(dto.getRole());
    }
}
