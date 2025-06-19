package app.catering.Mappers;

import app.catering.DTO.UsuarioDTO;
import app.catering.DTO.UsuarioResponseDTO;
import app.catering.DTO.UsuarioUpdateDTO;
import app.catering.Entity.User.Usuario;

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
}
