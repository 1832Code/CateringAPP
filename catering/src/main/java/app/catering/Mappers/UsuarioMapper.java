package app.catering.Mappers;

import app.catering.DTO.UsuarioAdminDto;
import app.catering.DTO.UsuarioDTO;
import app.catering.DTO.UsuarioResponseDTO;
import app.catering.DTO.UsuarioUpdateAdminDTO;
import app.catering.DTO.UsuarioUpdateDTO;
import app.catering.Entity.User.Role;
import app.catering.Entity.User.Usuario;
import app.catering.Repository.RoleRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

public class UsuarioMapper {

public static UsuarioAdminDto toAdminDTO(Usuario usuario) {
    return UsuarioAdminDto.builder()
            .id(usuario.getId())
            .dni(usuario.getDni())
            .nombres(usuario.getNombres())
            .apellidos(usuario.getApellidos())
            .telefono(usuario.getTelefono())
            .email(usuario.getEmail())
            .confirmed(usuario.isConfirmed())
            .verificationCode(usuario.getVerificationCode())
            .roles(
                    usuario.getRoles()
                            .stream()
                            .map(r -> r.getName().name())
                            .collect(Collectors.toSet())
            )
            .build();
}


    public static UsuarioDTO toDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setDni(usuario.getDni());
        dto.setNombres(usuario.getNombres());
        dto.setApellidos(usuario.getApellidos());
        dto.setTelefono(usuario.getTelefono());
        dto.setEmail(usuario.getEmail());
        dto.setRoles(
        usuario.getRoles()
            .stream()
            .map(r -> r.getName().name())
            .collect(Collectors.toSet())
    );
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

    public static void actualizarDesdeAdminDTO(
            Usuario usuario,
            UsuarioUpdateAdminDTO dto,
            BCryptPasswordEncoder encoder,
            RoleRepository roleRepository
    ) {
        usuario.setDni(dto.getDni());
        usuario.setNombres(dto.getNombres());
        usuario.setApellidos(dto.getApellidos());
        usuario.setTelefono(dto.getTelefono());
        usuario.setEmail(dto.getEmail());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            usuario.setPassword(encoder.encode(dto.getPassword()));
        }

        if (dto.getRole() != null) {
            Role roleEntity = roleRepository.findByName(dto.getRole())
                    .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado: " + dto.getRole()));
            usuario.setRoles(Set.of(roleEntity));
        }

        if (dto.getConfirmed() != null) {
            usuario.setConfirmed(dto.getConfirmed());
        }
    }
}
