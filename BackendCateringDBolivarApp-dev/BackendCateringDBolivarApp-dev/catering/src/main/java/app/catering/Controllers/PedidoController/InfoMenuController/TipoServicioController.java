package app.catering.Controllers.PedidoController.InfoMenuController;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import app.catering.Services.PedidoService.InfoMenuService.TipoServicioService;
import app.catering.Entity.Pedido.InfoMenu.TipoServicio;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tipo-servicio")
@CrossOrigin(origins = "*") // Puedes ajustar esto según tus necesidades
public class TipoServicioController {

    @Autowired
    private TipoServicioService tipoServicioService;

    // Crear un nuevo TipoServicio
    // POST /api/tipo-servicio
    @PostMapping
    public TipoServicio create(@RequestBody TipoServicio tipoServicio) {
        return tipoServicioService.save(tipoServicio);
    }

    // Obtener todos los registros de TipoServicio
    // GET /api/tipo-servicio
    @GetMapping
    public List<TipoServicio> getAll() {
        return tipoServicioService.getAll();
    }

    // Obtener un TipoServicio específico por su ID
    // GET /api/tipo-servicio/{id}
    @GetMapping("/{id}")
    public ResponseEntity<TipoServicio> getById(@PathVariable Long id) {
        Optional<TipoServicio> result = tipoServicioService.getById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar un TipoServicio existente por su ID
    // PUT /api/tipo-servicio/{id}
    @PutMapping("/{id}")
    public ResponseEntity<TipoServicio> update(@PathVariable Long id, @RequestBody TipoServicio newData) {
        TipoServicio updated = tipoServicioService.update(id, newData);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // Eliminar un TipoServicio por su ID
    // DELETE /api/tipo-servicio/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (tipoServicioService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}