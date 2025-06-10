package app.catering.Mappers;

import app.catering.DTO.DetailServicioDTO;
import app.catering.DTO.DetailServicioInfoDTO;
import app.catering.Users.Pedido.InfoMenu.DetailServicio;
import app.catering.Users.Pedido.InfoMenu.DetailServicioInfo;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class DetailServicioMapper {
    public static DetailServicio toEntity(DetailServicioDTO dto) {
        if (dto == null) return null;

        DetailServicio entity = new DetailServicio();

        // Si DetailServicioDTO tiene un ID, asignarlo (añade getId() al DTO si aún no lo tienes)
        entity.setId(dto.getId());

        // Si TipoServicio ya existe, idealmente buscarlo por ID en la base de datos, pero si no, al menos asignar su ID
        entity.setTipoServicio(TipoServicioMapper.toEntity(dto.getTipoServicio()));

        // Mapear los DetailServicioInfo
        entity.setItems(dto.getItems().stream()
                .map(dsiDto -> {
                    DetailServicioInfo dsi = DetailServicioMapper.toEntity(dsiDto);
                    dsi.setDetailServicio(entity);  // establecer relación bidireccional
                    return dsi;
                })
                .collect(Collectors.toList()));

        return entity;
    }

    public static DetailServicioDTO toDTO(DetailServicio entity) {
        if (entity == null) return null;

        DetailServicioDTO dto = new DetailServicioDTO();
        dto.setTipoServicio(TipoServicioMapper.toDTO(entity.getTipoServicio()));
        dto.setItems(entity.getItems().stream()
                .map(DetailServicioMapper::toDTO)
                .collect(Collectors.toList()));

        return dto;
    }

    public static DetailServicioInfo toEntity(DetailServicioInfoDTO dto) {
        if (dto == null) return null;
        DetailServicioInfo entity = new DetailServicioInfo();
        entity.setItem(ItemMapper.toEntity(dto.getItem()));
        return entity;
    }

    public static DetailServicioInfoDTO toDTO(DetailServicioInfo entity) {
        if (entity == null) return null;
        DetailServicioInfoDTO dto = new DetailServicioInfoDTO();
        dto.setItem(ItemMapper.toDTO(entity.getItem()));
        return dto;
    }
}
