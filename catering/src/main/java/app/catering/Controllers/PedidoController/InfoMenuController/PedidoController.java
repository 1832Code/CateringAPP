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
            @RequestParam(value = "tipoDocumento", required = false, defaultValue = "FACTURA") String tipoDocumento // <--
                                                                                                                    // ADD
                                                                                                                    // THIS
    ) {
        try {
            PedidoDTO pedido = pedidoService.findById(id);
            // Now pass both the PedidoDTO and the tipoDocumento
            byte[] pdfBytes = pedidoReportService.generarReportePedido(pedido, tipoDocumento); // <-- CORRECTED CALL

            return ResponseEntity.ok()
                    .header("Content-Disposition",
                            "attachment; filename=pedido_" + id + "_" + tipoDocumento.toLowerCase() + ".pdf")
                    .header("Content-Type", "application/pdf")
                    .body(pdfBytes);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            // Log the exception details for debugging
            ex.printStackTrace(); // REMOVE IN PRODUCTION, USE A PROPER LOGGER
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return empty body or a
                                                                                       // specific error message
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
