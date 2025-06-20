package main.gourmet.Mappers;

import main.gourmet.DTO.DetailExtraInfoDTO;
import main.gourmet.Entity.Pedido.DetailExtra.DetailExtraInfo;

public class DetailExtraInfoMapper {
    public static DetailExtraInfo toEntity(DetailExtraInfoDTO dto) {
        if (dto == null) return null;

        DetailExtraInfo entity = new DetailExtraInfo();
        entity.setId(dto.getId()); // importante para updates
        entity.setCantidad(dto.getCantidad());
        entity.setTipoExtra(dto.getTipoExtra());

        return entity;
    }

    public static DetailExtraInfoDTO toDTO(DetailExtraInfo entity) {
        if (entity == null) return null;

        DetailExtraInfoDTO dto = new DetailExtraInfoDTO();
        dto.setId(entity.getId()); // devolver id
        dto.setCantidad(entity.getCantidad());
        dto.setTipoExtra(entity.getTipoExtra());

        return dto;
    }
}
