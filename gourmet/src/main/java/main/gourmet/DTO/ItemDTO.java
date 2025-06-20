package main.gourmet.DTO;

import lombok.Data;

@Data
public class ItemDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private Float precio;
    private String imageURL;
    private CategoriaDTO categoria;
}
