package app.catering.Repository.PedidoRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import app.catering.Users.Pedido.DatosEvento;

public interface DatosEventoRepository extends JpaRepository<DatosEvento, Integer> {

    Optional<DatosEvento> findById(Long id);

    boolean existsById(Long id);

    void deleteById(Long id);
}