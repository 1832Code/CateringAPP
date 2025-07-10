package app.catering.Repository.PedidoRepository.DetailExtraRepository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import app.catering.Entity.Pedido.DetailExtra.DetailExtra;

import java.util.List;

@Repository
public interface DetailExtraRepository extends JpaRepository<DetailExtra, Long> {
    // Usando JPQL explícito (más seguro)
    @Transactional
    @Modifying
    @Query("DELETE FROM DetailExtra d WHERE d.infoMenu.id = :idInfoMenu")
    void deleteByInfoMenuId(@Param("idInfoMenu") Long idInfoMenu);

    @Query("SELECT de FROM DetailExtra de WHERE de.infoMenu.id = :id")
    List<DetailExtra> findByInfoMenuId(@Param("id") Long id);
}
