package main.gourmet.Entity.Pedido;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import main.gourmet.Entity.User;
import main.gourmet.Entity.Pedido.InfoMenu.InfoMenu;

@Entity
@Data
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    @JsonBackReference
    private User cliente;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_datos_evento")
    @JsonManagedReference
    private DatosEvento datosEvento;

    @ManyToOne
    @JoinColumn(name = "id_infoMenu")
    @JsonBackReference // Cambiado de Managed a Back
    private InfoMenu infoMenu;

    private String estado;
}