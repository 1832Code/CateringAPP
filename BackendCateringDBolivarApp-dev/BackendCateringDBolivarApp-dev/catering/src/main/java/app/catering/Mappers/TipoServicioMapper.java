package app.catering.Mappers;

import app.catering.DTO.TipoServicioDTO;
import app.catering.Users.Pedido.InfoMenu.TipoServicio;

public class TipoServicioMapper {
    public static TipoServicio toEntity(TipoServicioDTO dto) {
        if (dto == null) return null;
        TipoServicio entity = new TipoServicio();
        entity.setId(dto.getId());
        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
        return entity;
    }

    public static TipoServicioDTO toDTO(TipoServicio entity) {
        if (entity == null) return null;
        TipoServicioDTO dto = new TipoServicioDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        return dto;
    }
}
