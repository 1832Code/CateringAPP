package main.gourmet.Repository.PedidoRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.gourmet.Entity.Pedido.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
