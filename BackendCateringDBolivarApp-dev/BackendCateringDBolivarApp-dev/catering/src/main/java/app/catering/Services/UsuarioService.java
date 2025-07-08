package app.catering.Services;

import app.catering.DTO.UsuarioResponseDTO;
import app.catering.DTO.UsuarioUpdateAdminDTO;
import app.catering.DTO.UsuarioUpdateDTO;
import app.catering.Entity.User.Role;
import app.catering.Mappers.UsuarioMapper;
import app.catering.Repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;
import app.catering.Repository.UsuarioRepository;
import app.catering.Entity.User.Usuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // Obtener todos los usuarios
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    // Obtener usuario por ID
    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
    }

    // Obtener usuario por email
    public Usuario obtenerPorEmail(String email) {
        return usuarioRepository.findByEmailWithRoles(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
    }

    // Crear nuevo usuario (admin o backend)
    public Usuario crearUsuario(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new DataIntegrityViolationException("El email ya está registrado");
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    public Usuario crearUsuarioDesdeAdmin(UsuarioUpdateAdminDTO dto) {
        Usuario usuario = new Usuario();

        usuario.setDni(dto.getDni());
        usuario.setNombres(dto.getNombres());
        usuario.setApellidos(dto.getApellidos());
        usuario.setTelefono(dto.getTelefono());
        usuario.setEmail(dto.getEmail());
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new DataIntegrityViolationException("El email ya está registrado");
        }
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));

        if (dto.getRole() != null) {
            Role roleEntity = roleRepository.findByName(dto.getRole())
                    .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado: " + dto.getRole()));
            usuario.setRoles(Set.of(roleEntity));
        }
        if (dto.getConfirmed() != null) {
            usuario.setConfirmed(dto.getConfirmed());
        }
        // Aquí podrías generar verificationCode:
        usuario.setVerificationCode(generarVerificationCode());

        return usuarioRepository.save(usuario);
    }

    private String generarVerificationCode() {
        return java.util.UUID.randomUUID().toString();
    }

        // Actualización completa por ID (admin)
    public UsuarioResponseDTO actualizarUsuario(Long id, Usuario nuevosDatos) {
        Usuario usuario = obtenerPorId(id);

        usuario.setDni(nuevosDatos.getDni());
        usuario.setNombres(nuevosDatos.getNombres());
        usuario.setApellidos(nuevosDatos.getApellidos());
        usuario.setTelefono(nuevosDatos.getTelefono());
        usuario.setEmail(nuevosDatos.getEmail());

        if (nuevosDatos.getPassword() != null && !nuevosDatos.getPassword().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(nuevosDatos.getPassword()));
        }

        usuario.setRoles(nuevosDatos.getRoles());

        return UsuarioMapper.toResponseDTO(usuarioRepository.save(usuario));
    }

    // Actualizar perfil por email (cliente)
    public UsuarioResponseDTO actualizarPerfil(String email, UsuarioUpdateDTO dto) {
        Usuario usuario = obtenerPorEmail(email);
        UsuarioMapper.actualizarDesdeDTO(usuario, dto);
        return UsuarioMapper.toResponseDTO(usuarioRepository.save(usuario));
    }

    // Actualizar usuario desde el admin (por ID)
    public UsuarioResponseDTO actualizarUsuarioPorId(Long id, UsuarioUpdateAdminDTO dto) {
        Usuario usuario = obtenerPorId(id);
        UsuarioMapper.actualizarDesdeAdminDTO(usuario, dto, passwordEncoder, roleRepository);
        return UsuarioMapper.toResponseDTO(usuarioRepository.save(usuario));
    }

    // Actualización básica por email
    public Usuario actualizarUsuarioPorEmail(String email, Usuario nuevosDatos) {
        Usuario usuario = obtenerPorEmail(email);

        usuario.setNombres(nuevosDatos.getNombres());
        usuario.setApellidos(nuevosDatos.getApellidos());
        usuario.setTelefono(nuevosDatos.getTelefono());
        usuario.setDni(nuevosDatos.getDni());

        return usuarioRepository.save(usuario);
    }

    // Eliminar usuario por ID
    public void eliminarUsuario(Long id) {
        Usuario usuario = obtenerPorId(id);
        usuarioRepository.delete(usuario);
    }
    

}