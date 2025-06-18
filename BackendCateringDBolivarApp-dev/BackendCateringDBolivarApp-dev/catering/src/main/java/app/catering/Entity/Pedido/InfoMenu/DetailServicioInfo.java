package app.catering.Entity.Pedido.InfoMenu;

import app.catering.Entity.ItemsPackages.Item;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="detail_servicio_info")
public class DetailServicioInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detailServicioInfo")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_detailServicio")
    @JsonBackReference
    private DetailServicio detailServicio;

    //Item tiene FK id_categoria
    @ManyToOne
    @JoinColumn(name = "id_item", nullable = false)
    private Item item;


}
