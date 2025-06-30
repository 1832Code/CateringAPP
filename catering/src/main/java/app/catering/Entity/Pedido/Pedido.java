package app.catering.Entity.Pedido;

import app.catering.Entity.Cliente;
import app.catering.Entity.Pedido.InfoMenu.InfoMenu;
import app.catering.Entity.User.Usuario;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Data
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_pedido",unique = true, nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name="id_usuario")
    private Usuario usuario;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="id_datos_evento")
    @JsonManagedReference
    private DatosEvento datosEvento;

    @ManyToOne
    @JoinColumn(name = "id_infoMenu")
    @JsonManagedReference
    private InfoMenu infoMenu;

    @Column(name = "estado")
    private String estado;

}
