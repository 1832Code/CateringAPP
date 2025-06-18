package app.catering.Repository.PedidoRepository.DetailExtraRepository;

import app.catering.Entity.Pedido.DetailExtra.DetailExtraInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailExtraInfoRepository  extends JpaRepository<DetailExtraInfo,Long> {
}
