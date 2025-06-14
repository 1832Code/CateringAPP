package app.catering.Controllers;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;

import app.catering.DTO.DatosEventoDTO;
import app.catering.Mappers.DatosEventoMapper;
import app.catering.Services.PedidoService.InfoMenuService.DatosEventoService;
import jakarta.validation.Valid;
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
    public ResponseEntity<?> create(@RequestBody @Valid DatosEventoDTO dto) {
        try {
            LocalDate fechaEvento = LocalDate.parse(dto.getFechaEvento()); // Asegúrate del formato
            LocalDate hoy = LocalDate.now();
            LocalDate fechaMinima = hoy.plusDays(6);

            if (fechaEvento.isBefore(fechaMinima)) {
                return ResponseEntity.badRequest()
                        .body("La fecha del evento debe ser al menos dentro de 7 días.");
            }

            DatosEvento entity = datosEventoMapper.toEntity(dto);
            DatosEvento saved = datosEventoService.save(entity);
            return ResponseEntity.ok(datosEventoMapper.toDTO(saved));

        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Formato de fecha inválido. Debe ser YYYY-MM-DD.");
        }
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
}
