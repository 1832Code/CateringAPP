package app.catering.Mappers;

import app.catering.DTO.PedidoDTO;
import app.catering.Entity.Pedido.Pedido;
import org.springframework.stereotype.Component;

@Component
public class PedidoMapper {

    private final ClienteMapper clienteMapper;
    private final DatosEventoMapper datosEventoMapper;
    private final InfoMenuMapper infoMenuMapper;

    public PedidoMapper(ClienteMapper clienteMapper,
                        DatosEventoMapper datosEventoMapper,
                        InfoMenuMapper infoMenuMapper) {
        this.clienteMapper = clienteMapper;
        this.datosEventoMapper = datosEventoMapper;
        this.infoMenuMapper = infoMenuMapper;
    }

    public PedidoDTO toDTO(Pedido pedido) {
        PedidoDTO dto = new PedidoDTO();
        dto.setId(pedido.getId());

        // Solo se pasa el ID del cliente, no el objeto completo
        dto.setClienteId(pedido.getCliente() != null ? pedido.getCliente().getId() : null);

        // Solo se pasa el ID del infoMenu (si es un predeterminado)
        dto.setInfoMenuId(pedido.getInfoMenu() != null ? pedido.getInfoMenu().getId() : null);

        // Mapea  el objeto completo si se desea soportar ambas vistas
        dto.setInfoMenu(pedido.getInfoMenu() != null ? infoMenuMapper.toDTO(pedido.getInfoMenu()) : null);

        dto.setDatosEvento(datosEventoMapper.toDTO(pedido.getDatosEvento()));
        dto.setEstado(pedido.getEstado());
        return dto;
    }

    public Pedido toEntity(PedidoDTO dto) {
        Pedido pedido = new Pedido();
        if (dto.getInfoMenu() != null && dto.getInfoMenu().getId() != null && dto.getInfoMenu().getId() > 0) {
            pedido.setInfoMenu(infoMenuMapper.toEntity(dto.getInfoMenu()));
        }

        // Cliente e InfoMenu se asignan en el servicio según los IDs, no desde el DTO completo
        pedido.setDatosEvento(datosEventoMapper.toEntity(dto.getDatosEvento()));
        pedido.setEstado(dto.getEstado());

        return pedido;
    }
}
