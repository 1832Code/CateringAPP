package app.catering.Controllers.PedidoController.InfoMenuController;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import app.catering.Services.PedidoService.InfoMenuService.TipoServicioService;
import app.catering.Users.Pedido.InfoMenu.TipoServicio;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tipo-servicio")
@CrossOrigin(origins = "*") // Puedes ajustar esto según tus necesidades
public class TipoServicioController {

    @Autowired
    private TipoServicioService tipoServicioService;

    // Crear
    @PostMapping
    public TipoServicio create(@RequestBody TipoServicio tipoServicio) {
        return tipoServicioService.save(tipoServicio);
    }

    // Leer todos
    @GetMapping
    public List<TipoServicio> getAll() {
        return tipoServicioService.getAll();
    }

    // Leer por ID
    @GetMapping("/{id}")
    public ResponseEntity<TipoServicio> getById(@PathVariable Long id) {
        Optional<TipoServicio> result = tipoServicioService.getById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<TipoServicio> update(@PathVariable Long id, @RequestBody TipoServicio newData) {
        TipoServicio updated = tipoServicioService.update(id, newData);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (tipoServicioService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}