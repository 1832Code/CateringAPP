package app.catering.Repository.PedidoRepository.InfoMenuRepository;

import app.catering.Users.Pedido.InfoMenu.DetailServicioInfo;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailServicioInfoRepository extends JpaRepository<DetailServicioInfo,Long> {
    // Usando JPQL explícito
    @Query("SELECT d FROM DetailServicioInfo d WHERE d.detailServicio.id = :id")
    List<DetailServicioInfo> findByDetailServicioId(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM DetailServicioInfo d WHERE d.detailServicio.id = :id")
    void deleteByDetailServicioId(@Param("id") Long id);
}
