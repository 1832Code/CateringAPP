package app.catering.Entity.Pedido.InfoMenu;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="detail_servicio")
public class DetailServicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detailServicio")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_tipoServicio")
    private TipoServicio tipoServicio;

    @OneToMany(mappedBy = "detailServicio", cascade = CascadeType.ALL, orphanRemoval = true)
    @Fetch(FetchMode.SUBSELECT)
    @JsonManagedReference
    private List<DetailServicioInfo> items;

    @ManyToOne
    @JoinColumn(name = "info_menu_id")
    @JsonBackReference
    private InfoMenu infoMenu;
}
