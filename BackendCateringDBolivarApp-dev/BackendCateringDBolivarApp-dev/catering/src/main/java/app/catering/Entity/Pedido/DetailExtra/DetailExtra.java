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
 * Utiliza anotaciones de Lombok ({@code @Getter}, {@code @Setter}) para reducir el boilerplate code.
 * Las anotaciones de Jackson ({@code @JsonBackReference}, {@code @JsonManagedReference})
 * se utilizan para manejar referencias bidireccionales en la serialización/deserialización JSON,
 * previniendo bucles infinitos.
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
 */
package app.catering.Entity.Pedido.DetailExtra;

import java.util.ArrayList;
import java.util.List;

import app.catering.Entity.Pedido.InfoMenu.InfoMenu;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "detail_extra")
public class DetailExtra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detailExtra")
    private Long id;

    @OneToOne (mappedBy = "extra")
    @JsonBackReference
    private InfoMenu infoMenu;

    @OneToMany(mappedBy = "detailExtra", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DetailExtraInfo> extraInfo = new ArrayList<>();


}
