package app.catering.Services.PedidoService.InfoMenuService;

import app.catering.Repository.PedidoRepository.DetailPersonalRepository.DetailPersonalRepository;
import app.catering.Users.Pedido.DetailPersonal.DetailPersonal;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DetailPersonalService {
    private final DetailPersonalRepository detailPersonalRepository;


}
