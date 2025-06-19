package app.catering.Repository.PedidoRepository;

import app.catering.Entity.Pedido.Pedido;
import app.catering.Entity.User.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findAllByUsuarioEmail(String email);
}
