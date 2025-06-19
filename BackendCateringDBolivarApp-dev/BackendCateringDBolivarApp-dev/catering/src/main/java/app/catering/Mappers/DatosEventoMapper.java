package app.catering.Mappers;

import app.catering.DTO.DatosEventoDTO;
import app.catering.Entity.Pedido.DatosEvento;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class DatosEventoMapper {

    public DatosEventoDTO toDTO(DatosEvento datosEvento) {
        if (datosEvento == null) return null;

        DatosEventoDTO dto = new DatosEventoDTO();
        dto.setTipoEvento(datosEvento.getTipoEvento());
        dto.setDistrito(datosEvento.getDistrito());
        dto.setHoraInicio(String.valueOf(datosEvento.getHoraInicio()));
        dto.setFechaEvento(String.valueOf(datosEvento.getFechaEvento()));
        dto.setDireccion(datosEvento.getDireccion());
        dto.setCantHoras(datosEvento.getCantHorasEvento());
        return dto;
    }

    public  DatosEvento toEntity(DatosEventoDTO dto) {
        if (dto == null) return null;

        DatosEvento entity = new DatosEvento();
        entity.setTipoEvento(dto.getTipoEvento());
        entity.setDistrito(dto.getDistrito());
        entity.setDireccion(dto.getDireccion());
        entity.setHoraInicio(LocalTime.parse(dto.getHoraInicio()));
        entity.setFechaEvento(LocalDate.parse(dto.getFechaEvento()));
        entity.setCantHorasEvento(dto.getCantHoras());
        return entity;
    }
}