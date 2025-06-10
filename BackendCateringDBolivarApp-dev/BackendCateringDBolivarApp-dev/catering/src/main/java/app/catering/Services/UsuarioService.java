package app.catering.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;
import app.catering.Repository.UsuarioRepository;
import app.catering.Users.Usuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(Usuario usuario) {
        try {
            // Verificar si ya existe el email
            if (usuarioRepository.existsByEmail(usuario.getEmail())) {
                throw new RuntimeException("El email ya está registrado");
            }
            
            // Verificar si ya existe el nombre de usuario
            if (usuarioRepository.existsByUsername(usuario.getUsername())) {
                throw new RuntimeException("El nombre de usuario ya está en uso");
            }
            
            // Encriptar la contraseña antes de guardar
            String contraseñaEncriptada = passwordEncoder.encode(usuario.getPassword());
            usuario.setPassword(contraseñaEncriptada);
            
            return usuarioRepository.save(usuario);
            
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Error: Datos duplicados o restricciones de integridad");
        } catch (Exception e) {
            throw new RuntimeException("Error al registrar usuario: " + e.getMessage());
        }
    }
    
    // Método adicional usando el procedimiento almacenado si lo necesitas
    public void registrarConProcedimiento(Usuario usuario) {
        try {
            // Verificaciones previas
            if (usuarioRepository.existsByEmail(usuario.getEmail())) {
                throw new RuntimeException("El email ya está registrado");
            }
            
            if (usuarioRepository.existsByUsername(usuario.getUsername())) {
                throw new RuntimeException("El nombre de usuario ya está en uso");
            }
            
            String contraseñaEncriptada = passwordEncoder.encode(usuario.getPassword());
            
            usuarioRepository.registrarClienteConProcedimiento(
                Integer.parseInt(usuario.getDni()),
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getEmail(),
                Integer.parseInt(usuario.getTelefono()),
                usuario.getUsername(),
                contraseñaEncriptada
            );
            
        } catch (NumberFormatException e) {
            throw new RuntimeException("DNI y teléfono deben ser números válidos");
        } catch (Exception e) {
            throw new RuntimeException("Error al registrar usuario: " + e.getMessage());
        }
    }
}