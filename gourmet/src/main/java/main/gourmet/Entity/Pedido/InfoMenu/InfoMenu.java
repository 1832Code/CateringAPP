package main.gourmet.Entity.Pedido.InfoMenu;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import main.gourmet.Entity.Pedido.Pedido;
import main.gourmet.Entity.Pedido.DetailExtra.DetailExtra;
import main.gourmet.Entity.Pedido.DetailPersonal.DetailPersonal;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "info_menu")

public class InfoMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "infoMenu", cascade = CascadeType.ALL)
    @JsonManagedReference // Cambiado de Back a Managed
    private List<Pedido> pedidos = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @JoinColumn(name = "id_detailServicio")
    private DetailServicio servicio;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @JoinColumn(name = "id_detailPersonal")
    private DetailPersonal personal;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @JoinColumn(name = "id_detailExtra")
    private DetailExtra extra;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "imageURL")
    private String imageURL;

    @Column(name = "activo")
    private Boolean activo;

    @Column(name = "cantPersonas")
    private Integer cantPersonas;

    @Column(name = "tipoInfoMenu")
    private String tipoInfoMenu;
}
