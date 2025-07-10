package app.catering.Entity.Pedido.DetailExtra;

import java.util.ArrayList;
import java.util.List;

import app.catering.Entity.Pedido.InfoMenu.InfoMenu;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor; // Añadido para consistencia
import lombok.AllArgsConstructor; // Añadido para consistencia

/**
 * **Clase de entidad que representa los detalles de extras asociados a un menú en el sistema de gestión de catering.**
 * <p>
 * Esta clase mapea a la tabla "detail_extra" en la base de datos y sirve como un contenedor
 * para la información adicional (extras) que puede ser seleccionada para un {@link app.catering.Entity.Pedido.InfoMenu.InfoMenu}.
 * Actúa como un punto de unión entre un menú y los ítems de extras específicos seleccionados,
 * permitiendo una relación uno a uno con {@link app.catering.Entity.Pedido.InfoMenu.InfoMenu}
 * y una relación uno a muchos con {@link app.catering.Entity.Pedido.DetailExtra.DetailExtraInfo}.
 * </p>
 * <p>
 * Utiliza anotaciones de Lombok ({@code @Getter}, {@code @Setter}, {@code @NoArgsConstructor}, {@code @AllArgsConstructor})
 * para reducir el boilerplate code, generando automáticamente los métodos de acceso y constructores.
 * Las anotaciones de Jackson ({@code @JsonBackReference}, {@code @JsonManagedReference})
 * se utilizan para manejar referencias bidireccionales en la serialización/deserialización JSON,
 * previniendo bucles infinitos y asegurando que la estructura J

 * Esta entidad es fundamental para la flexibilidad del sistema de pedidos, permitiendo a los clientes
 * personalizar sus menús con adiciones como bebidas, postres, o servicios adicionales,
 * y para que el sistema registre estos detalles de forma granular.
 * </p>
 *
 * @author Darwin (Asume el autor, ajusta si es necesario)
 * @version 1.0
 * @since 2023-01-15 (Asumida, ajusta si es necesario)
 * @see app.catering.Entity.Pedido.InfoMenu.InfoMenu
 * @see app.catering.Entity.Pedido.DetailExtra.DetailExtraInfo
 * @see jakarta.persistence.Entity
 * @see jakarta.persistence.Table
 * @see lombok.Getter
 * @see lombok.Setter
 * @see lombok.NoArgsConstructor
 * @see lombok.AllArgsConstructor
 * @see com.fasterxml.jackson.annotation.JsonBackReference
 * @see com.fasterxml.jackson.annotation.JsonManagedReference
 */
@Entity
@Getter
@Setter
@Table(name = "detail_extra")
@NoArgsConstructor // Añadido para consistencia
@AllArgsConstructor // Añadido para consistencia
public class DetailExtra {

    /**
     * **Identificador único para la entidad DetailExtra.**
     * <p>
     * Este campo sirve como la clave primaria de la tabla {@code detail_extra} en la base de datos.
     * Su valor es generado automáticamente por el sistema de gestión de bases de datos (DBMS)
     * utilizando una estrategia de identidad (auto-incremento), lo que simplifica la gestión
     * de IDs y asegura la unicidad.
     * </p>
     * <p>
     * La anotación {@code @Column(name = "id_detailExtra")} especifica explícitamente el nombre
     * de la columna en la base de datos, lo cual puede ser útil para mantener la consistencia
     * con las convenciones de nomenclatura del esquema de la base de datos.
     * </p>
     * @see jakarta.persistence.Id
     * @see jakarta.persistence.GeneratedValue
     * @see jakarta.persistence.GenerationType#IDENTITY
     * @see jakarta.persistence.Column
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detailExtra")
    private Long id;

    /**
     * **Referencia bidireccional a la entidad {@link app.catering.Entity.Pedido.InfoMenu.InfoMenu}.**
     * <p>
     * Este campo establece una relación uno a uno ({@code OneToOne}) con {@link app.catering.Entity.Pedido.InfoMenu.InfoMenu}.
     * Indica que un {@code DetailExtra} está asociado a un único {@code InfoMenu},
     * y viceversa. El atributo {@code mappedBy = "extra"} en esta anotación
     * señala que la relación es propiedad de la entidad {@code InfoMenu} a través de su campo "extra".
     * Esto significa que la columna de clave foránea reside en la tabla {@code info_menu}.
     * </p>
     * <p>
     * La anotación {@code @JsonBackReference} es una parte crucial del manejo de serialización
     * JSON para relaciones bidireccionales con Jackson. Indica que esta es la "parte trasera"
     * de la relación. Cuando se serializa un objeto {@code DetailExtra}, Jackson no intentará
     * serializar recursivamente el {@code InfoMenu} asociado, previniendo así un bucle infinito
     * de serialización. La "parte frontal" de esta relación (en la clase {@code InfoMenu})
     * debería estar anotada con {@code @JsonManagedReference}.
     * </p>
     * @see app.catering.Entity.Pedido.InfoMenu.InfoMenu
     * @see jakarta.persistence.OneToOne
     * @see com.fasterxml.jackson.annotation.JsonBackReference
     */
    @OneToOne(mappedBy = "extra")
    @JsonBackReference
    private InfoMenu infoMenu;

    /**
     * **Lista de información detallada de extras asociados a este {@code DetailExtra}.**
     * <p>
     * Este campo establece una relación uno a muchos ({@code OneToMany}) con la entidad
     * {@link app.catering.Entity.Pedido.DetailExtra.DetailExtraInfo}. Esto significa
     * que un {@code DetailExtra} puede tener múltiples entradas de {@code DetailExtraInfo},
     * cada una describiendo un tipo y cantidad específica de extra (e.g., "5 Coca-Colas", "2 Porciones de Tarta").
     * </p>
     * <p>
     * El atributo {@code mappedBy = "detailExtra"} indica que la relación es propiedad
     * de la entidad {@link app.catering.Entity.Pedido.DetailExtra.DetailExtraInfo} a través
     * de su campo "detailExtra". Esto significa que la clave foránea reside en la tabla
     * {@code detail_extra_info}.
     * </p>
     * <p>
     * Las opciones {@code cascade = CascadeType.ALL} y {@code orphanRemoval = true}
     * son importantes para la gestión del ciclo de vida de las entidades relacionadas:
     * <ul>
     * <li>{@code CascadeType.ALL}: Todas las operaciones de persistencia (persist, merge, remove, refresh, detach)
     * realizadas en un {@code DetailExtra} se propagarán automáticamente a sus {@code DetailExtraInfo} asociados.
     * Por ejemplo, si se elimina un {@code DetailExtra}, todos sus {@code DetailExtraInfo} relacionados también serán eliminados.</li>
     * <li>{@code orphanRemoval = true}: Si un {@code DetailExtraInfo} se desvincula de su {@code DetailExtra}
     * padre (e.g., se elimina de la lista {@code extraInfo}), será automáticamente eliminado de la base de datos.</li>
     * </ul>
     * </p>
     * <p>
     * La anotación {@code @JsonManagedReference} es la contraparte de {@code @JsonBackReference}.
     * Indica que esta es la "parte frontal" de la relación bidireccional. Cuando se serializa
     * un objeto {@code DetailExtra}, Jackson serializará normalmente la lista {@code extraInfo},
     * pero la referencia de vuelta desde {@code DetailExtraInfo} a {@code DetailExtra} será ignorada
     * para evitar bucles.
     * </p>
     * <p>
     * Se inicializa la lista {@code extraInfo} con un {@link java.util.ArrayList} vacío
     * para evitar posibles {@code NullPointerExceptions} al intentar añadir elementos.
     * </p>
     * @see app.catering.Entity.Pedido.DetailExtra.DetailExtraInfo
     * @see jakarta.persistence.OneToMany
     * @see jakarta.persistence.CascadeType#ALL
     * @see com.fasterxml.jackson.annotation.JsonManagedReference
     */
    @OneToMany(mappedBy = "detailExtra", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DetailExtraInfo> extraInfo = new ArrayList<>();

    // Los métodos getters y setters son generados automáticamente por Lombok debido a las anotaciones @Getter y @Setter.
    // Los constructores por defecto y con todos los argumentos son generados por @NoArgsConstructor y @AllArgsConstructor.
    // Aunque no se muestran explícitamente, su Javadoc se aplicaría a ellos si se generaran manualmente o se sobrescribieran.

    /**
     * **Obtiene el identificador único de este detalle de extra.**
     * <p>
     * Generado por Lombok.
     * </p>
     * @return El ID del detalle de extra.
     */
    /*
    public Long getId() {
        return this.id;
    }
    */

    /**
     * **Establece el identificador único de este detalle de extra.**
     * <p>
     * Generado por Lombok.
     * </p>
     * @param id El nuevo ID del detalle de extra.
     */
    /*
    public void setId(Long id) {
        this.id = id;
    }
    */

    /**
     * **Obtiene la entidad {@link InfoMenu} asociada a este detalle de extra.**
     * <p>
     * Generado por Lombok.
     * </p>
     * @return La entidad InfoMenu asociada.
     */
    /*
    public InfoMenu getInfoMenu() {
        return this.infoMenu;
    }
    */

    /**
     * **Establece la entidad {@link InfoMenu} asociada a este detalle de extra.**
     * <p>
     * Generado por Lombok.
     * </p>
     * @param infoMenu La nueva entidad InfoMenu asociada.
     */
    /*
    public void setInfoMenu(InfoMenu infoMenu) {
        this.infoMenu = infoMenu;
    }
    */

    /**
     * **Obtiene la lista de información detallada de extras ({@link DetailExtraInfo}) asociada a este detalle de extra.**
     * <p>
     * Generado por Lombok.
     * </p>
     * @return Una lista de objetos DetailExtraInfo.
     */
    /*
    public List<DetailExtraInfo> getExtraInfo() {
        return this.extraInfo;
    }
    */

    /**
     * **Establece la lista de información detallada de extras ({@link DetailExtraInfo}) asociada a este detalle de extra.**
     * <p>
     * Generado por Lombok.
     * </p>
     * @param extraInfo La nueva lista de objetos DetailExtraInfo.
     */
    /*
    public void setExtraInfo(List<DetailExtraInfo> extraInfo) {
        this.extraInfo = extraInfo;
    }
    */

    /**
     * **Constructor por defecto.**
     * <p>
     * Generado por Lombok (debido a {@code @NoArgsConstructor}).
     * </p>
     */
    /*
    public DetailExtra() {
        // Constructor vacío
    }
    */

    /**
     * **Constructor con todos los argumentos.**
     * <p>
     * Generado por Lombok (debido a {@code @AllArgsConstructor}).
     * </p>
     * @param id El ID del detalle de extra.
     * @param infoMenu La entidad InfoMenu asociada.
     * @param extraInfo La lista de información detallada de extras.
     */
    /*
    public DetailExtra(Long id, InfoMenu infoMenu, List<DetailExtraInfo> extraInfo) {
        // Constructor con todos los campos
    }
    */

    /**
     * **Genera una representación en cadena de la entidad {@code DetailExtra}.**
     * <p>
     * Este método es generado automáticamente por Lombok (debido a {@code @Data} si estuviera,
     * o {@code @ToString} si se usa explícitamente). Proporciona una representación legible
     * del objeto {@code DetailExtra}, incluyendo su ID y la información de sus extras.
     * Es importante que no cause bucles infinitos al referenciar {@link #infoMenu}
     * o {@link #extraInfo} si no se manejan adecuadamente las relaciones bidireccionales
     * en el {@code toString()}.
     * </p>
     * @return Una cadena que representa el objeto {@code DetailExtra}.
     */
    /*
    @Override
    public String toString() {
        return "DetailExtra{" +
               "id=" + id +
               ", extraInfo=" + extraInfo +
               '}';
    }
    */

    /**
     * **Compara este objeto {@code DetailExtra} con otro para determinar si son iguales.**
     * <p>
     * Este método es generado automáticamente por Lombok (debido a {@code @Data} si estuviera,
     * o {@code @EqualsAndHashCode} si se usa explícitamente). La igualdad se basa en la
     * comparación de los campos de la clase.
     * </p>
     * @param o El objeto a comparar.
     * @return {@code true} si los objetos son iguales, {@code false} en caso contrario.
     */
    /*
    @Override
    public boolean equals(Object o) {
        // ... implementación generada por Lombok
    }
    */

    /**
     * **Calcula el valor de hash para este objeto {@code DetailExtra}.**
     * <p>
     * Este método es generado automáticamente por Lombok (debido a {@code @Data} si estuviera,
     * o {@code @EqualsAndHashCode} si se usa explícitamente). El valor de hash se basa
     * en los valores de los campos de la clase.
     * </p>
     * @return El valor de hash del objeto.
     */
    /*
    @Override
    public int hashCode() {
        // ... implementación generada por Lombok
    }
    */
}