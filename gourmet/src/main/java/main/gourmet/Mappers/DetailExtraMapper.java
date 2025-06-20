package main.gourmet.Mappers;



import java.util.stream.Collectors;

import main.gourmet.DTO.DetailExtraDTO;
import main.gourmet.DTO.DetailExtraInfoDTO;
import main.gourmet.Entity.Pedido.DetailExtra.DetailExtra;
import main.gourmet.Entity.Pedido.DetailExtra.DetailExtraInfo;

public class DetailExtraMapper {
    public static DetailExtra toEntity(DetailExtraDTO dto) {
        if (dto == null) return null;

        DetailExtra entity = new DetailExtra();
        entity.setId(dto.getId()); // importante para updates

        entity.setExtraInfo(dto.getExtraInfo().stream()
                .map(infoDto -> {
                    DetailExtraInfo dei = DetailExtraMapper.toEntity(infoDto);
                    dei.setDetailExtra(entity); // relación inversa
                    return dei;
                })
                .collect(Collectors.toList()));

        return entity;
    }

    public static DetailExtraDTO toDTO(DetailExtra entity) {
        if (entity == null) return null;
        DetailExtraDTO dto = new DetailExtraDTO();
        dto.setExtraInfo(entity.getExtraInfo().stream()
                .map(DetailExtraMapper::toDTO)
                .collect(Collectors.toList()));
        return dto;
    }

    public static DetailExtraInfo toEntity(DetailExtraInfoDTO dto) {
        if (dto == null) return null;
        DetailExtraInfo entity = new DetailExtraInfo();
        entity.setCantidad(dto.getCantidad());
        entity.setTipoExtra(dto.getTipoExtra());
        return entity;
    }

    public static DetailExtraInfoDTO toDTO(DetailExtraInfo entity) {
        if (entity == null) return null;
        DetailExtraInfoDTO dto = new DetailExtraInfoDTO();
        dto.setCantidad(entity.getCantidad());
        dto.setTipoExtra(entity.getTipoExtra());
        return dto;
    }
}
