package main.gourmet.DTO;

import lombok.Data;

import java.util.List;

@Data
public class DetailServicioDTO {
    private Long id;
    private TipoServicioDTO tipoServicio;
    private List<DetailServicioInfoDTO> items;
}
