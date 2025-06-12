package app.catering.Mappers;

import app.catering.DTO.InfoMenuDTO;
import app.catering.Users.Pedido.InfoMenu.InfoMenu;
import org.springframework.stereotype.Component;

@Component
public class InfoMenuMapper {
    public static InfoMenu toEntity(InfoMenuDTO dto) {
        InfoMenu entity = new InfoMenu();

        if (dto.getId() != null && dto.getId() > 0) {
            entity.setId(dto.getId());
        }

        entity.setTitulo(dto.getTitulo());
        entity.setDescripcion(dto.getDescripcion());
        entity.setPrecio(dto.getPrecio());
        entity.setImageURL(dto.getImageURL());
        entity.setActivo(dto.getActivo());
        entity.setCantPersonas(dto.getCantPersonas());
        entity.setTipoInfoMenu(dto.getTipoInfoMenu());
        entity.setServicio(DetailServicioMapper.toEntity(dto.getServicio()));
        entity.setPersonal(DetailPersonalMapper.toEntity(dto.getPersonal()));
        entity.setExtra(DetailExtraMapper.toEntity(dto.getExtra()));
        return entity;
    }

    public static InfoMenuDTO toDTO(InfoMenu entity) {
        InfoMenuDTO dto = new InfoMenuDTO();
        dto.setId(entity.getId());
        dto.setTitulo(entity.getTitulo());
        dto.setDescripcion(entity.getDescripcion());
        dto.setPrecio(entity.getPrecio());
        dto.setImageURL(entity.getImageURL());
        dto.setActivo(entity.getActivo());
        dto.setCantPersonas(entity.getCantPersonas());
        dto.setTipoInfoMenu(entity.getTipoInfoMenu());

        dto.setServicio(DetailServicioMapper.toDTO(entity.getServicio()));
        dto.setPersonal(DetailPersonalMapper.toDTO(entity.getPersonal()));
        dto.setExtra(DetailExtraMapper.toDTO(entity.getExtra()));

        return dto;
    }
}
