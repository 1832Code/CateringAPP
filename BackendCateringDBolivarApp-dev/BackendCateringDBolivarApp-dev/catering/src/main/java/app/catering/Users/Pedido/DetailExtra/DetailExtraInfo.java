package app.catering.Users.Pedido.DetailExtra;

import app.catering.Users.Pedido.InfoMenu.InfoMenu;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

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
