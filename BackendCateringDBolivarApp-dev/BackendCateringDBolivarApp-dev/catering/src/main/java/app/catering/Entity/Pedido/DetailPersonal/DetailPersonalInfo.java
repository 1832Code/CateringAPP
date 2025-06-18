package app.catering.Entity.Pedido.DetailPersonal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name="detail_personal_info")
public class DetailPersonalInfo {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detailPersonalInfo")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_detailPersonal", nullable = false)
    @JsonBackReference
    private DetailPersonal detailPersonal;

    @Column(name = "tipo_personal")
    private String tipoPersonal;

    @Column(name = "cantidad")
    private Integer cantidad;


}
