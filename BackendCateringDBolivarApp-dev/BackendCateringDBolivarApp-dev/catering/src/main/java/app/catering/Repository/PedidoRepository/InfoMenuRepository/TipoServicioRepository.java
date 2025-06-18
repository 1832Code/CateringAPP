package app.catering.Repository.PedidoRepository.InfoMenuRepository;

import app.catering.Entity.Pedido.InfoMenu.TipoServicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoServicioRepository extends JpaRepository<TipoServicio, Long> {

}
