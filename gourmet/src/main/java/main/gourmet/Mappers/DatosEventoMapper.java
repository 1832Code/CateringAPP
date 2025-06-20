package main.gourmet.Mappers;

import org.springframework.stereotype.Component;

import main.gourmet.DTO.DatosEventoDTO;
import main.gourmet.Entity.Pedido.DatosEvento;

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