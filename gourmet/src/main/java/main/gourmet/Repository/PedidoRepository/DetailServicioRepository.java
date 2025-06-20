package main.gourmet.Repository.PedidoRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.gourmet.Entity.Pedido.InfoMenu.DetailServicio;

@Repository
public interface DetailServicioRepository extends JpaRepository<DetailServicio, Long> {
}
