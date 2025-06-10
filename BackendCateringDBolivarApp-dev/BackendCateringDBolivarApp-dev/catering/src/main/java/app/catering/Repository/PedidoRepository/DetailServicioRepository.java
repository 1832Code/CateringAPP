package app.catering.Repository.PedidoRepository;

import app.catering.Users.Pedido.InfoMenu.DetailServicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailServicioRepository extends JpaRepository<DetailServicio, Long> {
}
