package app.catering.DTO;


import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class PedidoDTO {
    private Long id;
    private Long usuarioId;

    // Para pedidos con menú predeterminado
    private Long infoMenuId;

    // Para pedidos con menú personalizado
    private InfoMenuDTO infoMenu;

    private DatosEventoDTO datosEvento;
    private String estado;

    // NUEVOS CAMPOS para generar el PDF
    private ClienteDTO usuario;
    private List<PedidoDetalleDto> detalle;
    private BigDecimal subtotal;
    private BigDecimal igv;
    private BigDecimal total;
}
