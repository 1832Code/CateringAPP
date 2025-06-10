package app.catering.Repository.PedidoRepository.DetailPersonalRepository;

import app.catering.Users.Pedido.DetailExtra.DetailExtra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import app.catering.Users.Pedido.DetailPersonal.DetailPersonal;

import java.util.List;

@Repository
public interface DetailPersonalRepository extends JpaRepository<DetailPersonal, Long> {

    @Query("SELECT dp FROM DetailPersonal dp WHERE dp.infoMenu.id = :id")
    List<DetailPersonal> findByInfoMenuId(@Param("id") Long id);

    @Query("DELETE FROM DetailPersonal dp WHERE dp.infoMenu.id = :id")
    void deleteByInfoMenuId(@Param("id") Long id);
}
