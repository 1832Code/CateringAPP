package app.catering.Mappers;

import app.catering.DTO.CategoriaDTO;
import app.catering.Users.ItemsPackages.Categoria;
import org.springframework.stereotype.Component;

@Component
public class CategoriaMapper {
    public static Categoria toEntity (CategoriaDTO dto){
        if (dto == null) return null;
        Categoria categoria = new Categoria();
        categoria.setId(dto.getId());
        categoria.setNombre(dto.getNombre());
        categoria.setDescripcion(dto.getDescripcion());

        return categoria;
    }

    public static CategoriaDTO toDTO(Categoria categoria){
        if (categoria==null) return null;

        CategoriaDTO dto = new CategoriaDTO();
        dto.setId(categoria.getId());
        dto.setNombre(categoria.getNombre());
        dto.setDescripcion(categoria.getDescripcion());
        return dto;
    }
}
