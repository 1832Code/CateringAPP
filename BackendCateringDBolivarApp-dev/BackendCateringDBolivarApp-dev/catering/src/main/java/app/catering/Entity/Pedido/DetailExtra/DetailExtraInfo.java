package app.catering.Entity.Pedido.DetailExtra;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * **Clase de entidad que representa la información detallada de un ítem extra
 * seleccionado para un menú en el sistema de gestión de catering.**
 * <p>
 * Esta clase mapea a la tabla "detail_extra_info" en la base de datos y
 * almacena los detalles específicos de cada extra, como su tipo y cantidad,
 * que están asociados a un {@link app.catering.Entity.Pedido.DetailExtra}.
 * </p>
 * <p>
 * Actúa como una entidad de detalle en una relación uno a muchos con
 * {@link app.catering.Entity.Pedido.DetailExtra}, donde un
 * {@code DetailExtra} puede tener múltiples {@code DetailExtraInfo}
 * asociados, cada uno describiendo un extra diferente o una cantidad de un
 * extra específico.
 * </p>
 * <p>
 * Utiliza anotaciones de Lombok ({@code @Data}, {@code @NoArgsConstructor},
 * {@code @AllArgsConstructor}) para reducir el boilerplate code, generando
 * automáticamente getters, setters, {@code equals()}, {@code hashCode()} y
 * {@code toString()}.
 * </p>
 * <p>
 * La anotación {@code @JsonBackReference} de Jackson se utiliza para manejar
 * la serialización/deserialización JSON en relaciones bidireccionales,
 * previniendo bucles infinitos al serializar el objeto padre
 * {@link app.catering.Entity.Pedido.DetailExtra}.
 * </p>
 *
 * @author Darwin (Asume el autor, ajusta si es necesario)
 * @version 1.0
 * @since 2023-01-15 (Asumida, ajusta si es necesario)
 * @see app.catering.Entity.Pedido.DetailExtra.DetailExtra
 * @see jakarta.persistence.Entity
 * @see jakarta.persistence.Table
 * @see jakarta.persistence.Id
 * @see jakarta.persistence.GeneratedValue
 * @see jakarta.persistence.Column
 * @see jakarta.persistence.ManyToOne
 * @see jakarta.persistence.JoinColumn
 * @see com.fasterxml.jackson.annotation.JsonBackReference
 * @see lombok.Data
 * @see lombok.NoArgsConstructor
 * @see lombok.
@Data
@Entity
@Table(name="detail_extra_info")
public class DetailExtraInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detailExtraInfo")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_detailExtra", nullable = false)
    @JsonBackReference
    private DetailExtra detailExtra;

    @Column(name = "tipo_extra")
    private String tipoExtra;

    @Column(name = "cantidad")
    private Integer cantidad;


}
