package main.gourmet.Mappers;



import java.util.stream.Collectors;

import main.gourmet.DTO.DetailPersonalDTO;
import main.gourmet.DTO.DetailPersonalInfoDTO;
import main.gourmet.Entity.Pedido.DetailPersonal.DetailPersonal;
import main.gourmet.Entity.Pedido.DetailPersonal.DetailPersonalInfo;

public class DetailPersonalMapper {
    public static DetailPersonal toEntity(DetailPersonalDTO dto) {
        if (dto == null) return null;

        DetailPersonal entity = new DetailPersonal();

        // Asignar ID si el DTO lo tiene (útil para update)
        entity.setId(dto.getId());

        // Mapear la lista de DetailPersonalInfo
        entity.setPersonalInfo(dto.getPersonalInfo().stream()
                .map(infoDto -> {
                    DetailPersonalInfo dpi = DetailPersonalMapper.toEntity(infoDto);
                    dpi.setDetailPersonal(entity); // relación inversa
                    return dpi;
                })
                .collect(Collectors.toList()));

        return entity;
    }

    public static DetailPersonalDTO toDTO(DetailPersonal entity) {
        if (entity == null) return null;
        DetailPersonalDTO dto = new DetailPersonalDTO();
        dto.setPersonalInfo(entity.getPersonalInfo().stream()
                .map(DetailPersonalMapper::toDTO)
                .collect(Collectors.toList()));
        return dto;
    }

    public static DetailPersonalInfo toEntity(DetailPersonalInfoDTO dto) {
        if (dto == null) return null;
        DetailPersonalInfo entity = new DetailPersonalInfo();
        entity.setCantidad(dto.getCantidad());
        entity.setTipoPersonal(dto.getTipoPersonal());
        return entity;
    }

    public static DetailPersonalInfoDTO toDTO(DetailPersonalInfo entity) {
        if (entity == null) return null;
        DetailPersonalInfoDTO dto = new DetailPersonalInfoDTO();
        dto.setCantidad(entity.getCantidad());
        dto.setTipoPersonal(entity.getTipoPersonal());
        return dto;
    }
}
