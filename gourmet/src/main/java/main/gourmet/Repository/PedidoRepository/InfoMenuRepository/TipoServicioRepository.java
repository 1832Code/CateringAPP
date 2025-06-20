package main.gourmet.Repository.PedidoRepository.InfoMenuRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.gourmet.Entity.Pedido.InfoMenu.TipoServicio;

@Repository
public interface TipoServicioRepository extends JpaRepository<TipoServicio, Long> {

}
