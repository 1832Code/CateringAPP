package app.catering.Services.PedidoService;
import app.catering.DTO.PedidoDTO;
import app.catering.Services.PdfGeneratorService;
import app.catering.Services.PedidoService.InfoMenuService.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class PedidoReportService {

    private final PedidoService pedidoService;
    private final PdfGeneratorService pdfGeneratorService;

   // This method now accepts PedidoDTO and String tipoDocumento
    public byte[] generarReportePedido(PedidoDTO pedido, String tipoDocumento) {
        // Your existing logic to generate PDF using pdfGeneratorService
        // Make sure PdfGeneratorService's generatePedidoPDF method also matches this signature
        return pdfGeneratorService.generatePedidoPDF(pedido, tipoDocumento);
    }

}
