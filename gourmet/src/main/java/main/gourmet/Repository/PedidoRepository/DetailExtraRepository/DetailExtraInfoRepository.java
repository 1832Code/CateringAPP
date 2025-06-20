package main.gourmet.Repository.PedidoRepository.DetailExtraRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.gourmet.Entity.Pedido.DetailExtra.DetailExtraInfo;

@Repository
public interface DetailExtraInfoRepository  extends JpaRepository<DetailExtraInfo,Long> {
}
