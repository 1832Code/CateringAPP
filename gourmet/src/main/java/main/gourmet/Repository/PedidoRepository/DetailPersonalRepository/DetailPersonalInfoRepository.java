package main.gourmet.Repository.PedidoRepository.DetailPersonalRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.gourmet.Entity.Pedido.DetailPersonal.DetailPersonalInfo;

@Repository
public interface DetailPersonalInfoRepository extends JpaRepository<DetailPersonalInfo,Long> {
}
