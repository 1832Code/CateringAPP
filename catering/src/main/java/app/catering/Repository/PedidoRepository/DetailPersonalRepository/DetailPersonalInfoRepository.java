package app.catering.Repository.PedidoRepository.DetailPersonalRepository;

import app.catering.Entity.Pedido.DetailPersonal.DetailPersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailPersonalInfoRepository extends JpaRepository<DetailPersonalInfo,Long> {
}
