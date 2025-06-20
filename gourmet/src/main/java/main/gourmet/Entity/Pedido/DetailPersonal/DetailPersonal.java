package main.gourmet.Entity.Pedido.DetailPersonal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import main.gourmet.Entity.Pedido.InfoMenu.InfoMenu;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "detail_personal")
public class DetailPersonal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detailPersonal")
    private Long id;

    @OneToOne (mappedBy = "personal")
    @JsonBackReference
    private InfoMenu infoMenu;

    @OneToMany(mappedBy = "detailPersonal", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DetailPersonalInfo> personalInfo = new ArrayList<>();



}