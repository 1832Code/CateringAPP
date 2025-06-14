package app.catering.Users.Pedido;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "datos_evento") // Exactamente como en la BD
@Getter
@Setter
public class DatosEvento {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_DatosEvento") // Exact match
  private Long idDatosEvento;

  @Column(name = "tipoEvento", nullable = false) // Mismo nombre
  @NotBlank(message = "El tipo de evento es obligatorio")
  private String tipoEvento;

  @Column(name = "direccion", nullable = false)
  @NotBlank(message = "La dirección es obligatoria")
  private String direccion;

  @Column(name = "distrito", nullable = false)
  @NotBlank(message = "El distrito es obligatorio")
  private String distrito;

  @Column(name = "horaInicio", nullable = false)
  private LocalTime horaInicio;

  @Column(name = "fechaEvento", nullable = false)
  private LocalDate fechaEvento;

  @Min(value = 1, message = "Debe ser al menos 1 hora")
  @Column(name = "cantHorasEvento", nullable = false) // o true si permites nulls
  private Integer cantHorasEvento;

  @OneToOne(mappedBy = "datosEvento", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonBackReference
  private Pedido pedido;


}