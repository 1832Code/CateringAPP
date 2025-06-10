package app.catering.Controllers;

<<<<<<< HEAD
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import app.catering.Repository.PedidoRepository.DatosEventoRepository;
import app.catering.Users.Pedido.DatosEvento;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:3000")
public class DatosEventoController {

    private final DatosEventoRepository datosEventoRepository;

    public DatosEventoController(DatosEventoRepository datosEventoRepository) {
        this.datosEventoRepository = datosEventoRepository;
    }

    @PostMapping
    public ResponseEntity<?> createEvento(@Valid @RequestBody DatosEvento evento, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(err -> errors.put(err.getField(), err.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            DatosEvento savedEvento = datosEventoRepository.save(evento);
            return ResponseEntity.ok(savedEvento);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Error de integridad de datos", "detail", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", "Error al guardar el evento", "error", e.toString()));
        }
    }

=======
import java.util.List;
import java.util.stream.Collectors;

import app.catering.DTO.DatosEventoDTO;
import app.catering.Mappers.DatosEventoMapper;
import app.catering.Services.PedidoService.InfoMenuService.DatosEventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import app.catering.Users.Pedido.DatosEvento;


@RestController
@RequestMapping("/api/datos-evento")
@CrossOrigin(origins = "*")
public class DatosEventoController {

    @Autowired
    private DatosEventoService datosEventoService;

    @Autowired
    private DatosEventoMapper datosEventoMapper;

    // Crear un nuevo evento
    @PostMapping
    public ResponseEntity<DatosEventoDTO> create(@RequestBody DatosEventoDTO dto) {
        DatosEvento entity = datosEventoMapper.toEntity(dto);
        DatosEvento saved = datosEventoService.save(entity);
        return ResponseEntity.ok(datosEventoMapper.toDTO(saved));
    }

    // Listar todos los eventos
    @GetMapping
    public ResponseEntity<List<DatosEventoDTO>> getAll() {
        List<DatosEventoDTO> list = datosEventoService.getAll()
                .stream()
                .map(datosEventoMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    // Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<DatosEventoDTO> getById(@PathVariable Long id) {
        return datosEventoService.getById(id)
                .map(evento -> ResponseEntity.ok(datosEventoMapper.toDTO(evento)))
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar por ID
    @PutMapping("/{id}")
    public ResponseEntity<DatosEventoDTO> update(@PathVariable Long id, @RequestBody DatosEventoDTO dto) {
        DatosEvento updated = datosEventoService.update(id, datosEventoMapper.toEntity(dto));
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(datosEventoMapper.toDTO(updated));
    }

    // Eliminar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = datosEventoService.delete(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
>>>>>>> origin/Andre
}
