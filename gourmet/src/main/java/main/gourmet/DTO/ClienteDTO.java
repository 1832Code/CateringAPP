package main.gourmet.DTO;

import lombok.Data;

@Data
public class ClienteDTO {
    private Long id;
    private String nombre;
    private String apellidos;
    private String email;
}
