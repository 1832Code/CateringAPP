package app.catering.Services.PedidoService.InfoMenuService;

import app.catering.Repository.PedidoRepository.DatosEventoRepository;
import app.catering.Users.Pedido.DatosEvento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DatosEventoService {
    @Autowired
    public DatosEventoRepository datosEventoRepository;

    // Crear nuevo DatosEvento
    public DatosEvento save(DatosEvento datosEvento) {
        return datosEventoRepository.save(datosEvento);
    }

    // Obtener todos los DatosEvento
    public List<DatosEvento> getAll() {
        return datosEventoRepository.findAll();
    }

    // Obtener por ID
    public Optional<DatosEvento> getById(Long id) {
        return datosEventoRepository.findById(id);
    }

    // Actualizar por ID
    public DatosEvento update(Long id, DatosEvento newData) {
        return datosEventoRepository.findById(id).map(evento -> {
            evento.setTipoEvento(newData.getTipoEvento());
            evento.setDireccion(newData.getDireccion());
            evento.setDistrito(newData.getDistrito());
            evento.setHoraInicio(newData.getHoraInicio());
            evento.setFechaEvento(newData.getFechaEvento());
            evento.setCantHorasEvento(newData.getCantHorasEvento());
            return datosEventoRepository.save(evento);
        }).orElse(null);
    }

    // Eliminar por ID
    public boolean delete(Long id) {
        if (datosEventoRepository.existsById(id)) {
            datosEventoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
