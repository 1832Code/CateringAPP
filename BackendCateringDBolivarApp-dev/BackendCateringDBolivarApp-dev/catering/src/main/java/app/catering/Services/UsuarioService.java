package app.catering.Services;

import app.catering.DTO.UsuarioResponseDTO;
import app.catering.DTO.UsuarioUpdateDTO;
import app.catering.Mappers.UsuarioMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;
import app.catering.Repository.UsuarioRepository;
import app.catering.Entity.User.Usuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // Obtener todos los usuarios
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    //  Buscar usuario por ID
    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
    }

    //  Buscar usuario por Email
    public Usuario obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado"));
    }

    //  Crear nuevo usuario (por admin o proceso interno)
    public Usuario crearUsuario(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        // Encriptar contraseña
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        return usuarioRepository.save(usuario);
    }

    //  Actualizar usuario
    public Usuario actualizarUsuario(Long id, Usuario datosActualizados) {
        Usuario usuarioExistente = obtenerPorId(id);

        usuarioExistente.setDni(datosActualizados.getDni());
        usuarioExistente.setNombres(datosActualizados.getNombres());
        usuarioExistente.setApellidos(datosActualizados.getApellidos());
        usuarioExistente.setTelefono(datosActualizados.getTelefono());
        usuarioExistente.setEmail(datosActualizados.getEmail());

        // Opcionalmente actualizar contraseña si se proporciona
        if (datosActualizados.getPassword() != null && !datosActualizados.getPassword().isEmpty()) {
            usuarioExistente.setPassword(passwordEncoder.encode(datosActualizados.getPassword()));
        }

        usuarioExistente.setRole(datosActualizados.getRole());

        return usuarioRepository.save(usuarioExistente);
    }

    public Usuario actualizarUsuarioPorEmail(String email, Usuario nuevosDatos) {
        Usuario usuarioExistente = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualizamos solo los campos permitidos
        usuarioExistente.setNombres(nuevosDatos.getNombres());
        usuarioExistente.setApellidos(nuevosDatos.getApellidos());
        usuarioExistente.setTelefono(nuevosDatos.getTelefono());
        usuarioExistente.setDni(nuevosDatos.getDni());

        return usuarioRepository.save(usuarioExistente);
    }

    public UsuarioResponseDTO actualizarPerfil(String email, UsuarioUpdateDTO dto) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        UsuarioMapper.actualizarDesdeDTO(usuario, dto);
        Usuario actualizado = usuarioRepository.save(usuario);

        return UsuarioMapper.toResponseDTO(actualizado);
    }

    //  Eliminar usuario
    public void eliminarUsuario(Long id) {
        Usuario usuario = obtenerPorId(id);
        usuarioRepository.delete(usuario);
    }
    

}