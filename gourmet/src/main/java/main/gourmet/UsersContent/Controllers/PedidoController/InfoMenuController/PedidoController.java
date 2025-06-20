package main.gourmet.UsersContent.Controllers.PedidoController.InfoMenuController;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import main.gourmet.DTO.PedidoDTO;
import main.gourmet.Services.PedidoService.InfoMenuService.PedidoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

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

    @PostMapping
    public ResponseEntity<PedidoDTO> createPedido(@Valid @RequestBody PedidoDTO pedidoDTO) {
        PedidoDTO created = pedidoService.create(pedidoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoDTO> updatePedido(@PathVariable Long id, @RequestBody PedidoDTO pedidoDTO) {
        try {
            PedidoDTO updated = pedidoService.update(id, pedidoDTO);
            return ResponseEntity.ok(updated);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
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

}
