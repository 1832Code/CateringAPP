package main.gourmet.Mappers;

import main.gourmet.DTO.CategoriaDTO;
import main.gourmet.DTO.ItemDTO;
import main.gourmet.Entity.ItemsPackages.Categoria;
import main.gourmet.Entity.ItemsPackages.Item;

public class ItemMapper {
    public static Item toEntity(ItemDTO dto) {
        if (dto == null) return null;

        Item entity = new Item();
        entity.setId(dto.getId());
        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
        entity.setPrecio(dto.getPrecio());
        entity.setImageURL(dto.getImageURL());

        if (dto.getCategoria() != null) {
            Categoria categoria = new Categoria();
            categoria.setId(dto.getCategoria().getId());
            categoria.setNombre(dto.getCategoria().getNombre());
            entity.setCategoria(categoria);
        }

        return entity;
    }

    public static ItemDTO toDTO(Item entity) {
        if (entity == null) return null;

        ItemDTO dto = new ItemDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        dto.setPrecio(entity.getPrecio());
        dto.setImageURL(entity.getImageURL());

        if (entity.getCategoria() != null) {
            CategoriaDTO categoriaDTO = new CategoriaDTO();
            categoriaDTO.setId(entity.getCategoria().getId());
            categoriaDTO.setNombre(entity.getCategoria().getNombre());
            dto.setCategoria(categoriaDTO);
        }

        return dto;
    }
}