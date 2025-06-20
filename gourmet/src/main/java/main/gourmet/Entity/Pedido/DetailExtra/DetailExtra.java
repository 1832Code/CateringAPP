package main.gourmet.Entity.Pedido.DetailExtra;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import main.gourmet.Entity.Pedido.InfoMenu.InfoMenu;

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
