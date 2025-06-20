package main.gourmet.Repository.PedidoRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import main.gourmet.Entity.Pedido.DatosEvento;


public interface DatosEventoRepository extends JpaRepository<DatosEvento, Long> {
}