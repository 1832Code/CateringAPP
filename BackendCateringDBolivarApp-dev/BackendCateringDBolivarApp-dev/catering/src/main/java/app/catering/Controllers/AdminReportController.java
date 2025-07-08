package app.catering.Controllers;

import app.catering.DTO.PedidoDTO;
import app.catering.Services.PedidoService.InfoMenuService.PedidoService;
import app.catering.Services.PdfGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3001", allowCredentials = "true")
@RestController
@RequestMapping("/api/admin/reports")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequiredArgsConstructor
public class AdminReportController {

    private final PedidoService pedidoService;
    private final PdfGeneratorService pdfGeneratorService;

    @GetMapping("/pedidos")
    public ResponseEntity<byte[]> generatePedidosReport(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin
    ) {
        try {
            List<PedidoDTO> pedidos = pedidoService.findAll();

            // Filtrar por fechas si se proporcionan
            if (fechaInicio != null && fechaFin != null) {
                pedidos = pedidos.stream()
                        .filter(p -> {
                            LocalDate fechaEvento = p.getDatosEvento() != null ?
                                    LocalDate.parse(p.getDatosEvento().getFechaEvento()) : null;
                            return fechaEvento != null &&
                                    !fechaEvento.isBefore(fechaInicio) &&
                                    !fechaEvento.isAfter(fechaFin);
                        })
                        .toList();
            }

            byte[] pdfBytes = pdfGeneratorService.generatePedidosReport(pedidos);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=reporte_pedidos.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ventas")
    public ResponseEntity<byte[]> generateVentasReport(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin
    ) {
        try {
            List<PedidoDTO> pedidos = pedidoService.findAll();

            // Filtrar solo pedidos pagados/completados
            pedidos = pedidos.stream()
                    .filter(p -> "pagado".equals(p.getEstado()) || "completado".equals(p.getEstado()))
                    .toList();

            byte[] pdfBytes = pdfGeneratorService.generateVentasReport(pedidos);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=reporte_ventas.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/eventos")
    public ResponseEntity<byte[]> generateEventosReport(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin
    ) {
        try {
            List<PedidoDTO> pedidos = pedidoService.findAll();

            byte[] pdfBytes = pdfGeneratorService.generateEventosReport(pedidos);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=reporte_eventos.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/clientes")
    public ResponseEntity<byte[]> generateClientesReport() {
        try {
            List<PedidoDTO> pedidos = pedidoService.findAll();

            byte[] pdfBytes = pdfGeneratorService.generateClientesReport(pedidos);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=reporte_clientes.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/pedido/{id}")
    public ResponseEntity<byte[]> generatePedidoReport(@PathVariable Long id) {
        try {
            PedidoDTO pedido = pedidoService.findById(id);

            if (pedido == null) {
                return ResponseEntity.notFound().build();
            }
            System.out.println("Pedido encontrado: " + pedido);
            byte[] pdfBytes = pdfGeneratorService.generatePedidoPDF(pedido, "FACTURA");

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=pedido_" + id + ".pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}