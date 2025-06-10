package app.catering.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class DatosEventoDTO {
    private String tipoEvento;
    private String distrito;
    private String direccion;
    private LocalTime horaInicio;
    private LocalDate fechaEvento;
    private Integer cantHoras;

}
