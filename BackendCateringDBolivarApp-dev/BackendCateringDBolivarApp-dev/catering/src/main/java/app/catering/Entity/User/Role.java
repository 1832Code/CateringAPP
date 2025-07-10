package app.catering.Entity.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

/**
 * **Clase de entidad que representa un Rol o Permiso dentro del sistema de
 * gestión de catering.**
 * <p>
 * Esta clase mapea a la tabla "roles" en la base de datos y define los
 * diferentes
 * tipos de roles que pueden ser asignados a un
 * {@link app.catering.Entity.User.Usuario}.
 * Los roles son fundamentales para la gestión de la autorización y el control
 * de acceso
 * dentro de la aplicación, permitiendo definir qué acciones puede realizar un
 * usuario.
 * </p>
 * <p>
 * Utiliza anotaciones de Lombok ({@code @Data}, {@code @NoArgsConstructor},
 * {@code @AllArgsConstructor})
 * para generar automáticamente los métodos boilerplate como getters, setters,
 * {@code equals()}, {@code hashCode()} y {@code toString()}.
 * </p>
 * <p>
 * La enumeración {@link app.catering.Entity.User.RoleName} se utiliza para
 * definir
 * los nombres de los roles de forma segura y tipada, evitando errores por
 * cadenas.
 * </p>
 *
 * @author Darwin (Asume el autor, ajusta si es necesario)
 * @version 1.0
 * @since 2023-01-15 (Asumida, ajusta si es necesario)
 * @see app.catering.Entity.User.RoleName
 * @see app.catering.Entity.User.Usuario
 * @see jakarta.persistence.Entity
 * @see jakarta.persistence.Table
 * @see lombok.Data
 */
@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    /**
     * **Identificador único del rol.**
     * <p>
     * Este campo actúa como la clave primaria de la tabla 'roles' en la base de
     * datos.
     * Su valor es generado automáticamente por la base de datos utilizando
     * una estrategia de identidad (auto-incremento).
     * </p>
     * <p>
     * Es un campo fundamental para la identificación y referencia de roles
     * en otras tablas, como la tabla de unión {@code usuario_roles} para
     * la relación Many-to-Many con {@link app.catering.Entity.User.Usuario}.
     * </p>
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * **Nombre del rol.**
     * <p>
     * Este campo almacena el nombre único del rol, como "ADMIN", "USER", "CLIENTE",
     * etc.
     * Se utiliza una enumeración {@link app.catering.Entity.User.RoleName} para
     * asegurar que solo se puedan asignar nombres de roles predefinidos y válidos,
     * mejorando la robustez y legibilidad del código.
     * </p>
     * <p>
     * La anotación {@code @Enumerated(EnumType.STRING)} indica a JPA que el valor
     * de la enumeración debe ser persistido como su representación de cadena
     * (e.g., "ADMIN" en lugar de su ordinal numérico), lo cual es más legible
     * y menos propenso a errores si el orden de la enumeración cambia.
     * </p>
     * <p>
     * El campo es marcado como no nulo ({@code nullable = false}) y único
     * ({@code unique = true}) para garantizar la integridad de los datos en la base
     * de datos.
     * </p>
     * 
     * @see app.catering.Entity.User.RoleName
     * @see jakarta.persistence.Enumerated
     * @see jakarta.persistence.EnumType#STRING
     * @see jakarta.persistence.Column
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private RoleName name;

    // Aunque Lombok genera toString(), equals() y hashCode(),
    // se puede añadir un Javadoc aquí para explicar su comportamiento si fuera
    // necesario
    // o si se sobrescriben manualmente.
    // Por ejemplo:

    /**
     * **Genera una representación en cadena de la entidad Role.**
     * <p>
     * Este método es generado automáticamente por Lombok (debido a {@code @Data}).
     * Proporciona una representación legible del objeto Role, incluyendo su ID y
     * nombre.
     * </p>
     * 
     * @return Una cadena que representa el objeto Role.
     */
    /*
     * @Override
     * public String toString() {
     * return "Role{" +
     * "id=" + id +
     * ", name=" + name +
     * '}';
     * }
     */

    /**
     * **Compara este objeto Role con otro para determinar si son iguales.**
     * <p>
     * Este método es generado automáticamente por Lombok (debido a {@code @Data}).
     * La igualdad se basa en el valor de todos los campos de la clase.
     * </p>
     * 
     * @param o El objeto a comparar.
     * @return {@code true} si los objetos son iguales, {@code false} en caso
     *         contrario.
     */
    /*
     * @Override
     * public boolean equals(Object o) {
     * // ... implementación generada por Lombok
     * }
     */

    /**
     * **Calcula el valor de hash para este objeto Role.**
     * <p>
     * Este método es generado automáticamente por Lombok (debido a {@code @Data}).
     * El valor de hash se basa en los valores de todos los campos de la clase.
     * </p>
     * 
     * @return El valor de hash del objeto.
     */
    /*
     * @Override
     * public int hashCode() {
     * // ... implementación generada por Lombok
     * }
     */
}