package app.catering.Controllers.PedidoController.InfoMenuController;

import app.catering.DTO.PedidoDTO;
import app.catering.Mappers.PedidoMapper;
import app.catering.Services.PedidoService.InfoMenuService.PedidoService;
import app.catering.Services.PedidoService.PedidoReportService;
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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    @Autowired
    private final PedidoService pedidoService;
    @Autowired
    private final PedidoMapper pedidoMapper;
    @Autowired
    private final PedidoReportService pedidoReportService;

    public PedidoController(PedidoService pedidoService, PedidoMapper pedidoMapper, PedidoReportService pedidoReportService) {
        this.pedidoService = pedidoService;
        this.pedidoMapper = pedidoMapper;
        this.pedidoReportService = pedidoReportService;
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

    // Este metodo solo lo puede ejecutar un ADMIN y devuelve todos los pedidos
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<PedidoDTO> getAllPedidos() {
        return pedidoService.findAll();
    }

    // Devuelve un pedido específico por su ID
    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> getPedidoById(@PathVariable Long id) {
        try {
            PedidoDTO pedidoDTO = pedidoService.findById(id);
            return ResponseEntity.ok(pedidoDTO);
        } catch (EntityNotFoundException ex) {
            // Si no existe, devuelve 404
            return ResponseEntity.notFound().build();
        }
    }

    // Devuelve los pedidos asociados al email del usuario autenticado
    @GetMapping("/mis-pedidos")
    public ResponseEntity<List<PedidoDTO>> obtenerPedidosPorEmail(
            @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername(); // Obtiene email del usuario autenticado
        List<PedidoDTO> pedidos = pedidoService.getPedidosByEmail(email);
        return ResponseEntity.ok(pedidos);
    }

    // Devuelve los pedidos de un usuario específico por su ID (solo para ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<PedidoDTO>> obtenerPedidosPorIdUsuario(@PathVariable Long id) {
        List<PedidoDTO> pedidos = pedidoService.getPedidosByUsuarioId(id);
        return ResponseEntity.ok(pedidos);
    }

    // Crea un nuevo pedido
    @PostMapping
    public ResponseEntity<PedidoDTO> createPedido(@Valid @RequestBody PedidoDTO pedidoDTO) {
        PedidoDTO created = pedidoService.create(pedidoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Actualiza un pedido creando un nuevo registro asociado (versión 1)
    @PutMapping("/v1/{id}")
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

    // Actualiza un pedido modificando directamente el mismo registro (versión 2)
    @PutMapping("/v2/{id}")
    public ResponseEntity<?> updatePedidov2(@PathVariable Long id, @Valid @RequestBody PedidoDTO pedidoDTO) {
        try {
            PedidoDTO updated = pedidoService.updatev2(id, pedidoDTO);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido no encontrado con ID: " + id);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el pedido");
        }
    }

    // Elimina un pedido por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        try {
            pedidoService.delete(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    // Devuelve los pedidos pagados asociados al email del usuario autenticado
    @GetMapping("/mis-pedidos/pagados")
    public ResponseEntity<List<PedidoDTO>> obtenerPedidosPagadosPorEmail(
            @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        List<PedidoDTO> pedidos = pedidoService.getPedidosPagadosByEmail(email);
        return ResponseEntity.ok(pedidos);
    }



}
