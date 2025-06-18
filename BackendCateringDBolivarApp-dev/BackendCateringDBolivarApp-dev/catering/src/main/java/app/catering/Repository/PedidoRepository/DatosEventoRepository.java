package app.catering.Repository.PedidoRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.catering.Entity.Pedido.DatosEvento;

public interface DatosEventoRepository extends JpaRepository<DatosEvento, Long> {
}