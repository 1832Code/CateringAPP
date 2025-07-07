package app.catering.Controllers.PedidoController.InfoMenuController;

import app.catering.DTO.PedidoDTO;
import app.catering.Mappers.PedidoMapper;
import app.catering.Services.PedidoService.PedidoReportService;
import app.catering.Services.PedidoService.InfoMenuService.PedidoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3001", allowCredentials = "true")
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;
    private final PedidoMapper pedidoMapper;
    private final PedidoReportService pedidoReportService; // Autowired via constructor now

    // Corrected constructor for better dependency injection
    public PedidoController(
            PedidoService pedidoService,
            PedidoMapper pedidoMapper,
            PedidoReportService pedidoReportService // Add this to constructor
    ) {
        this.pedidoService = pedidoService;
        this.pedidoMapper = pedidoMapper;
        this.pedidoReportService = pedidoReportService; // Assign it
    }

    @GetMapping("/{id}/reporte")
    public ResponseEntity<byte[]> descargarReportePedido(
            @PathVariable Long id,
            @RequestParam(value = "tipoDocumento", required = false, defaultValue = "FACTURA") String tipoDocumento
    ) {
        try {
            PedidoDTO pedido = pedidoService.findById(id);
            
            if (pedido == null) {
                System.err.println("Pedido no encontrado con ID: " + id);
                return ResponseEntity.notFound().build();
            }
            
            // Log para debugging
            System.out.println("Generando reporte para pedido ID: " + id + ", tipo: " + tipoDocumento);
            
            byte[] pdfBytes = pedidoReportService.generarReportePedido(pedido, tipoDocumento);
            
            if (pdfBytes == null || pdfBytes.length == 0) {
                System.err.println("Error: PDF generado está vacío para pedido ID: " + id);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }

            return ResponseEntity.ok()
                    .header("Content-Disposition",
                            "attachment; filename=pedido_" + id + "_" + tipoDocumento.toLowerCase() + ".pdf")
                    .header("Content-Type", "application/pdf")
                    .body(pdfBytes);
                    
        } catch (EntityNotFoundException e) {
            System.err.println("Pedido no encontrado: " + e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            // Log detallado del error
            System.err.println("Error generando reporte para pedido ID " + id + ": " + ex.getMessage());
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    //
    //

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public List<PedidoDTO> getAllPedidos() {
        return pedidoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> getPedidoById(@PathVariable Long id) {
        try {
            PedidoDTO pedidoDTO = pedidoService.findById(id);
            return ResponseEntity.ok(pedidoDTO);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/mis-pedidos")
    public ResponseEntity<List<PedidoDTO>> obtenerPedidosPorEmail(
            @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        List<PedidoDTO> pedidos = pedidoService.getPedidosByEmail(email);
        return ResponseEntity.ok(pedidos);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<PedidoDTO>> obtenerPedidosPorIdUsuario(@PathVariable Long id) {

        List<PedidoDTO> pedidos = pedidoService.getPedidosByUsuarioId(id);
        return ResponseEntity.ok(pedidos);
    }

    @PostMapping
    public ResponseEntity<PedidoDTO> createPedido(@Valid @RequestBody PedidoDTO pedidoDTO) {
        PedidoDTO created = pedidoService.create(pedidoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePedido(@PathVariable Long id, @Valid @RequestBody PedidoDTO pedidoDTO) {
        try {
            PedidoDTO updated = pedidoService.update(id, pedidoDTO);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido no encontrado con ID: " + id);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el pedido");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        try {
            pedidoService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/mis-pedidos/pagados")
    public ResponseEntity<List<PedidoDTO>> obtenerPedidosPagadosPorEmail(
            @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        List<PedidoDTO> pedidos = pedidoService.getPedidosPagadosByEmail(email);
        return ResponseEntity.ok(pedidos);
    }

}
