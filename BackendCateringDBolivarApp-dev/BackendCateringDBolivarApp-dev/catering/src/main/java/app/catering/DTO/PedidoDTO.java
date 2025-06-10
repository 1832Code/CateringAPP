package app.catering.DTO;

import lombok.Data;

@Data
public class PedidoDTO {
    private Long id;
    private Long clienteId;

    // Para pedidos con menú predeterminado
    private Long infoMenuId;

    // Para pedidos con menú personalizado
    private InfoMenuDTO infoMenu;

    private DatosEventoDTO datosEvento;
    private String estado;
}
