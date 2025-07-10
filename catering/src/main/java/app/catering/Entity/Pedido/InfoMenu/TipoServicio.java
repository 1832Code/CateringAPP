package app.catering.Entity.Pedido.InfoMenu;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter

@Table(name = "tipo_servicio")
public class TipoServicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipoServicio")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name ="descripcion")
    private String descripcion;

}
