package app.catering.Mappers;

import app.catering.DTO.DatosEventoDTO;
import app.catering.Users.Pedido.DatosEvento;
import org.springframework.stereotype.Component;

@Component
public class DatosEventoMapper {

    public DatosEventoDTO toDTO(DatosEvento datosEvento) {
        if (datosEvento == null) return null;

        DatosEventoDTO dto = new DatosEventoDTO();
        dto.setTipoEvento(datosEvento.getTipoEvento());
        dto.setDistrito(datosEvento.getDistrito());
        dto.setHoraInicio(datosEvento.getHoraInicio());
        dto.setFechaEvento(datosEvento.getFechaEvento());
        dto.setCantHoras(datosEvento.getCantHorasEvento());
        return dto;
    }

    public  DatosEvento toEntity(DatosEventoDTO dto) {
        if (dto == null) return null;

        DatosEvento entity = new DatosEvento();
        entity.setTipoEvento(dto.getTipoEvento());
        entity.setDistrito(dto.getDistrito());
        entity.setDireccion(dto.getDireccion());
        entity.setHoraInicio(dto.getHoraInicio());
        entity.setFechaEvento(dto.getFechaEvento());
        entity.setCantHorasEvento(dto.getCantHoras());
        return entity;
    }
}