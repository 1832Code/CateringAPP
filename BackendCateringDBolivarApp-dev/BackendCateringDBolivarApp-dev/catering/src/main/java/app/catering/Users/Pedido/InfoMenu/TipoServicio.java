package app.catering.Users.Pedido.InfoMenu;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

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
