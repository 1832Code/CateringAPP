package app.catering.Controllers;

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

}
