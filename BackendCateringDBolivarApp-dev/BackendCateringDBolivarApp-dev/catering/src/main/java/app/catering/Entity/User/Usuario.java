package app.catering.Entity.User;

import app.catering.Entity.Pedido.Pedido;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * **Clase Entidad que representa a un Usuario en el sistema de gestión de catering.**
 * <p>
 * Esta clase mapea a la tabla "usuarios" en la base de datos y define la estructura
 * de los datos de un usuario. Implementa la interfaz {@link org.springframework.security.core.userdetails.UserDetails}
 * de Spring Security para la gestión de autenticación y autorización.
 * </p>
 * <p>
 * Utiliza anotaciones de Lombok ({@code @Getter}, {@code @Setter}, {@code @NoArgsConstructor},
 * {@code @AllArgsConstructor}, {@code @Builder}) para reducir el boilerplate code.
 * También integra validaciones de Jakarta Persistence (JPA) y Spring Security.
 * </p>
 *
 * @author Darwin
 * @version 1.0
 * @since 2023-01-15 (Asumida, ajusta si es necesario)
 * @see app.catering.Entity.Pedido.Pedido
 * @see app.catering.Entity.User.Role
 * @see org.springframework.security.core.userdetails.UserDetails
 */
@Entity
@Table(name = "usuarios", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {

    /**
     * Identificador único del usuario. Es la clave primaria de la tabla 'usuarios'.
     * Generado automáticamente por la base de datos usando estrategia de identidad.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Número de Documento Nacional de Identidad (DNI) del usuario.
     * Es un campo obligatorio y debe ser único para cada usuario.
     */
    @Column(nullable = false, unique = true)
    @NotBlank(message = "El DNI es obligatorio")
    private String dni;

    /**
     * Nombres del usuario. Este campo es obligatorio.
     */
    @Column(nullable = false)
    @NotBlank(message = "Nombres son obligatorios")
    private String nombres;

    /**
     * Apellidos del usuario. Este campo es obligatorio.
     */
    @Column(nullable = false)
    @NotBlank(message = "Apellidos son obligatorios")
    private String apellidos;

    /**
     * Número de teléfono del usuario. Es un campo obligatorio.
     */
    @Column(nullable = false)
    @NotBlank(message = "Teléfono es obligatorio")
    private String telefono;

    /**
     * Dirección de correo electrónico del usuario. Es un campo obligatorio y único.
     * Utilizado también como nombre de usuario para la autenticación de Spring Security.
     * Debe tener un formato de email válido.
     */
    @Column(nullable = false, unique = true)
    @Email(message = "Correo electrónico no válido")
    private String email;

    /**
     * Contraseña del usuario. Almacenada de forma segura (normalmente hasheada) en la base de datos.
     * Es un campo obligatorio.
     */
    @Column(nullable = false)
    @NotBlank(message = "Contraseña es obligatoria")
    private String password;

    /**
     * Conjunto de roles o permisos asignados al usuario.
     * <p>
     * Esta relación Many-to-Many se mapea a través de la tabla de unión "usuario_roles".
     * Los roles se cargan de forma 'EAGER' para que estén disponibles inmediatamente con el usuario.
     * </p>
     * @see app.catering.Entity.User.Role
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "usuario_roles",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    /**
     * Lista de pedidos realizados por este usuario.
     * <p>
     * Representa una relación One-to-Many, donde un usuario puede tener múltiples pedidos.
     * Las operaciones de cascada ({@code CascadeType.ALL}) y la eliminación de huérfanos
     * ({@code orphanRemoval = true}) están habilitadas para manejar los pedidos asociados.
     * </p>
     * @see app.catering.Entity.Pedido.Pedido
     */
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pedido> pedidos;

    /**
     * Código de verificación utilizado para la confirmación de la cuenta por correo electrónico.
     * Puede ser nulo si la cuenta ya está confirmada o no requiere verificación.
     */
    private String verificationCode;

    /**
     * Estado de confirmación de la cuenta del usuario.
     * {@code true} si la cuenta ha sido confirmada (e.g., por email), {@code false} en caso contrario.
     */
    private boolean confirmed;

    /**
     * Retorna el estado de confirmación de la cuenta del usuario.
     *
     * @return {@code true} si la cuenta está confirmada, {@code false} si no lo está.
     */
    public boolean isConfirmed() {
        return confirmed;
    }

    /**
     * Provee las autoridades (roles) otorgadas al usuario para propósitos de seguridad de Spring Security.
     * <p>
     * Mapea los {@link app.catering.Entity.User.Role} del usuario a objetos
     * {@link org.springframework.security.core.authority.SimpleGrantedAuthority}.
     * </p>
     *
     * @return Una colección de objetos {@link org.springframework.security.core.GrantedAuthority}
     * que representan los roles del usuario.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .toList();
    }

    /**
     * Retorna el nombre de usuario utilizado para autenticación.
     * En este caso, el correo electrónico del usuario es utilizado como nombre de usuario.
     *
     * @return El correo electrónico del usuario.
     */
    @Override
    public String getUsername() {
        return email;
    }

    /**
     * Indica si la cuenta del usuario ha expirado.
     * <p>
     * Por defecto, siempre retorna {@code true}, indicando que la cuenta nunca expira.
     * Esto puede ser modificado para implementar políticas de expiración de cuenta.
     * </p>
     *
     * @return {@code true} si la cuenta es válida (no ha expirado).
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indica si la cuenta del usuario está bloqueada.
     * <p>
     * Por defecto, siempre retorna {@code true}, indicando que la cuenta no está bloqueada.
     * Esto puede ser modificado para implementar políticas de bloqueo de cuenta (e.g., por intentos fallidos).
     * </p>
     *
     * @return {@code true} si la cuenta es válida (no está bloqueada).
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indica si las credenciales (contraseña) del usuario han expirado.
     * <p>
     * Por defecto, siempre retorna {@code true}, indicando que las credenciales nunca expiran.
     * Esto puede ser modificado para forzar cambios de contraseña periódicos.
     * </p>
     *
     * @return {@code true} si las credenciales son válidas (no han expirado).
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indica si el usuario está habilitado (activo).
     * <p>
     * Por defecto, siempre retorna {@code true}, indicando que el usuario está habilitado.
     * Esto puede ser modificado para deshabilitar usuarios.
     * </p>
     *
     * @return {@code true} si el usuario está habilitado.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

    /**
     * Genera una representación en cadena de la entidad Usuario.
     * Este método está sobrescrito para proporcionar una salida legible
     * que incluye el ID, email, nombres, apellidos y roles del usuario,
     * excluyendo información sensible como la contraseña.
     *
     * @return Una cadena que representa el objeto Usuario.
     */
    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", nombres='" + nombres + '\'' +
                ", apellidos='" + apellidos + '\'' +
                ", roles=" + roles +
                '}';
    }
}