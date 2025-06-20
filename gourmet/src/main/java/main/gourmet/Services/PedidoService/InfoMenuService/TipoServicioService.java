package main.gourmet.Services.PedidoService.InfoMenuService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.gourmet.Entity.Pedido.InfoMenu.TipoServicio;
import main.gourmet.Repository.PedidoRepository.InfoMenuRepository.TipoServicioRepository;


@Service
public class TipoServicioService {

    @Autowired
    private TipoServicioRepository tipoServicioRepository;

    // Listar todos los tipos de servicio (Gourmet, Buffet, PlatoServido)
    public List<TipoServicio> getAll() {
        return tipoServicioRepository.findAll();
    }

    public TipoServicio save(TipoServicio tipoServicio) {
        return tipoServicioRepository.save(tipoServicio);
    }

    // Obtener un tipo de servicio por ID (devuelve el subtipo específico)
    public Optional<TipoServicio> getById(Long id) {
        return tipoServicioRepository.findById(id);
    }

    // Eliminar un tipo de servicio por ID
    public boolean delete(Long id) {
        if (tipoServicioRepository.existsById(id)) {
            tipoServicioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public TipoServicio update(Long id, TipoServicio newData) {
        return tipoServicioRepository.findById(id).map(ts -> {
            ts.setNombre(newData.getNombre());
            // No hay campo `config`, se elimina esa línea.
            return tipoServicioRepository.save(ts);
        }).orElse(null);
    }
}