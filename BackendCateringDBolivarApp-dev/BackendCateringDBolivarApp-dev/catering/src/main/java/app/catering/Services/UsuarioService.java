package app.catering.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;
import app.catering.Repository.UsuarioRepository;
import app.catering.Entity.User.Usuario;
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

    // Metodo alternativo usando un procedimiento almacenado
    public void registrarConProcedimiento(Usuario usuario) {
        try {
            if (usuarioRepository.existsByEmail(usuario.getEmail())) {
                throw new RuntimeException("El email ya está registrado");
            }

            String contraseñaEncriptada = passwordEncoder.encode(usuario.getPassword());

            usuarioRepository.registrarClienteConProcedimiento(
                    Integer.parseInt(usuario.getDni()),
                    usuario.getNombres(),
                    usuario.getApellidos(),
                    usuario.getEmail(),
                    Integer.parseInt(usuario.getTelefono()),
                    contraseñaEncriptada
            );

        } catch (NumberFormatException e) {
            throw new RuntimeException("DNI y teléfono deben ser números válidos");
        } catch (Exception e) {
            throw new RuntimeException("Error al registrar usuario: " + e.getMessage());
        }
    }
    

}