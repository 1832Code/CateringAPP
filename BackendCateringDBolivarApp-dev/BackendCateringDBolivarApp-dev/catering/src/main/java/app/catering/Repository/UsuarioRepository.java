package app.catering.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import app.catering.Users.Usuario;
import java.util.Optional;

// Interfaz del repositorio para la entidad Usuario
// Extiende JpaRepository que proporciona operaciones CRUD básicas
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Método para buscar un usuario por su nombre de usuario
    // Retorna un Optional que puede contener el usuario o estar vacío
    Optional<Usuario> findByUsername(String username);
    
    // Método para verificar si existe un usuario con un email específico
    // Retorna true si existe, false si no existe
    boolean existsByEmail(String email);
    
    // Método para verificar si existe un usuario con un nombre de usuario específico
    // Retorna true si existe, false si no existe
    boolean existsByUsername(String username);


    Optional<Usuario> findByEmail(String email);

    // Nuevo método para usar el procedimiento almacenado
    @Transactional
    @Query(value = "CALL sp_registrarCliente(:dni, :nombres, :apellidos, :email, :telefono, :username, :password)",
           nativeQuery = true)
    void registrarClienteConProcedimiento(
        @Param("dni") int dni,
        @Param("nombres") String nombres,
        @Param("apellidos") String apellidos,
        @Param("email") String email,
        @Param("telefono") int telefono,
        @Param("username") String username,
        @Param("password") String password
    );
}