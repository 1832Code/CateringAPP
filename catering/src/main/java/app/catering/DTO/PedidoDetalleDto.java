package app.catering.DTO;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PedidoDetalleDto  {
     private Integer cantidad;
    private String unidad;
    private String codigo;
    private String descripcion;
    private BigDecimal valorUnitario;
    private BigDecimal precioUnitario;
    private BigDecimal importe;
}
