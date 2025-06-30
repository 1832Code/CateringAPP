package app.catering.Repository;

// In app.catering.Repository.UsuarioRepository.java

import app.catering.Entity.User.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import app.catering.Entity.User.Usuario;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsByEmail(String email);

    @Query("SELECT u FROM Usuario u JOIN FETCH u.roles WHERE u.email = :email")
    Optional<Usuario> findByEmailWithRoles(@Param("email") String email);

    long countByRolesContaining(Role role);

    @Transactional
    @Query(value = "CALL sp_registrarCliente(:dni, :nombres, :apellidos, :email, :telefono, :password)", // Removed
                                                                                                         // :username as
                                                                                                         // it's not in
                                                                                                         // the method
                                                                                                         // signature
            nativeQuery = true)
    void registrarClienteConProcedimiento(
            @Param("dni") int dni,
            @Param("nombres") String nombres,
            @Param("apellidos") String apellidos,
            @Param("email") String email,
            @Param("telefono") int telefono,
            @Param("password") String password);

    Optional<Usuario> findByEmail(String email);

    // CORRECTED: This method should return Optional<Usuario> as it finds a user by
    // DNI
    Optional<Usuario> findByDni(String dni); // <-- CHANGED FROM Optional<Role> TO Optional<Usuario>
}