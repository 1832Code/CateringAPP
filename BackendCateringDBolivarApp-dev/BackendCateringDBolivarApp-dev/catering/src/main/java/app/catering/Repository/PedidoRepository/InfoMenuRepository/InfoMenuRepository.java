package app.catering.Repository.PedidoRepository.InfoMenuRepository;

import org.springframework.stereotype.Repository;

import app.catering.Users.Pedido.InfoMenu.InfoMenu;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface InfoMenuRepository extends JpaRepository<InfoMenu, Long> {
    List<InfoMenu> findByTipoInfoMenu(String tipoInfoMenu);
}
