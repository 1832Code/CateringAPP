package main.gourmet.Services.PedidoService.InfoMenuService;

import lombok.RequiredArgsConstructor;
import main.gourmet.Repository.PedidoRepository.DetailPersonalRepository.DetailPersonalRepository;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DetailPersonalService {
    private final DetailPersonalRepository detailPersonalRepository;


}
