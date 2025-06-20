package main.gourmet.DTO;


import lombok.Data;

@Data
public class InfoMenuDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private Float precio;
    private String imageURL;
    private Boolean activo;
    private Integer cantPersonas;
    private String tipoInfoMenu;
    private DetailServicioDTO servicio;
    private DetailPersonalDTO personal;
    private DetailExtraDTO extra;
}

