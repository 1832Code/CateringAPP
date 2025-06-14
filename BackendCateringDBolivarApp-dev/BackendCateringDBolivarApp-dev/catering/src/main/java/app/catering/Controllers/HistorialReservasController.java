package app.catering.Controllers;

import app.catering.Repository.PedidoRepository.DatosEventoRepository;
import app.catering.Users.Pedido.DatosEvento;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:3000")
public class HistorialReservasController {

    private final DatosEventoRepository repo;

    public HistorialReservasController(DatosEventoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<DatosEvento> obtenerEventos() {
        return repo.findAll();
    }
}
