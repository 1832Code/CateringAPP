package app.catering.Mappers;

import app.catering.DTO.DetailServicioInfoDTO;
import app.catering.Users.Pedido.InfoMenu.DetailServicioInfo;

public class DetailServicioInfoMapper {
    public static DetailServicioInfo toEntity(DetailServicioInfoDTO dto) {
        if (dto == null) return null;

        DetailServicioInfo entity = new DetailServicioInfo();
        entity.setId(dto.getId()); // importante para updates
        entity.setItem(ItemMapper.toEntity(dto.getItem()));

        return entity;
    }

    public static DetailServicioInfoDTO toDTO(DetailServicioInfo entity) {
        if (entity == null) return null;

        DetailServicioInfoDTO dto = new DetailServicioInfoDTO();
        dto.setId(entity.getId()); // devolver id al frontend si es necesario
        dto.setItem(ItemMapper.toDTO(entity.getItem()));

        return dto;
    }
}
