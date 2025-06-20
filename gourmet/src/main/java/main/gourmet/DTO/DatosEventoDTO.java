package main.gourmet.DTO;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class DatosEventoDTO {
    @NotBlank(message = "El tipo de evento es obligatorio")
    private String tipoEvento;

    @NotBlank(message = "La fecha del evento es obligatoria")
    private String fechaEvento; // Idealmente en formato ISO (YYYY-MM-DD)

    @NotBlank(message = "El distrito es obligatorio")
    private String distrito;

    @NotBlank(message = "La hora de inicio es obligatoria")
    private String horaInicio;

    @NotBlank(message = "La dirección es obligatoria")
    private String direccion;

    @NotNull(message = "La cantidad de horas es obligatoria")
    @Min(value = 1, message = "La cantidad mínima de horas es 1")
    private Integer cantHoras;

}
