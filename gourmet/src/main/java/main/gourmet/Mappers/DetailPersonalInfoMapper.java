package main.gourmet.Mappers;

import main.gourmet.DTO.DetailPersonalInfoDTO;
import main.gourmet.Entity.Pedido.DetailPersonal.DetailPersonalInfo;

public class DetailPersonalInfoMapper {
    public static DetailPersonalInfo toEntity(DetailPersonalInfoDTO dto) {
        if (dto == null) return null;

        DetailPersonalInfo entity = new DetailPersonalInfo();
        entity.setId(dto.getId()); // importante para updates
        entity.setCantidad(dto.getCantidad());
        entity.setTipoPersonal(dto.getTipoPersonal());

        return entity;
    }

    public static DetailPersonalInfoDTO toDTO(DetailPersonalInfo entity) {
        if (entity == null) return null;

        DetailPersonalInfoDTO dto = new DetailPersonalInfoDTO();
        dto.setId(entity.getId()); // devolver id
        dto.setCantidad(entity.getCantidad());
        dto.setTipoPersonal(entity.getTipoPersonal());

        return dto;
    }
}
