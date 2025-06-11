package app.catering.Services.PedidoService.InfoMenuService;

import app.catering.DTO.PedidoDTO;
import app.catering.Mappers.DatosEventoMapper;
import app.catering.Mappers.InfoMenuMapper;
import app.catering.Mappers.PedidoMapper;
import app.catering.Repository.ClienteRepository;
import app.catering.Repository.PedidoRepository.InfoMenuRepository.InfoMenuRepository;
import app.catering.Repository.PedidoRepository.PedidoRepository;
import app.catering.Users.Cliente;
import app.catering.Users.Pedido.InfoMenu.InfoMenu;
import app.catering.Users.Pedido.Pedido;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final PedidoMapper pedidoMapper;
    private final ClienteRepository clienteRepository;
    private final InfoMenuRepository infoMenuRepository;
    private final DatosEventoMapper datosEventoMapper;
    private final InfoMenuMapper infoMenuMapper;


    public PedidoService(PedidoRepository pedidoRepository,
                         PedidoMapper pedidoMapper,
                         ClienteRepository clienteRepository, InfoMenuRepository infoMenuRepository, DatosEventoMapper datosEventoMapper, InfoMenuMapper infoMenuMapper) {
        this.pedidoRepository = pedidoRepository;
        this.pedidoMapper = pedidoMapper;
        this.clienteRepository = clienteRepository;
        this.infoMenuRepository = infoMenuRepository;
        this.datosEventoMapper = datosEventoMapper;
        this.infoMenuMapper = infoMenuMapper;
    }

    public List<PedidoDTO> findAll() {
        return pedidoRepository.findAll()
                .stream()
                .map(pedidoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public PedidoDTO findById(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado con ID: " + id));
        return pedidoMapper.toDTO(pedido);
    }

    public PedidoDTO create(PedidoDTO dto) {
        Pedido pedido = new Pedido();

        // Cliente existente
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        pedido.setCliente(cliente);

        // Datos del evento
        pedido.setDatosEvento(datosEventoMapper.toEntity(dto.getDatosEvento()));

        // InfoMenu
        if (dto.getInfoMenuId() != null) {
            // Modo predeterminado
            InfoMenu infoMenu = infoMenuRepository.findById(dto.getInfoMenuId())
                    .orElseThrow(() -> new RuntimeException("InfoMenu no encontrado"));
            pedido.setInfoMenu(infoMenu);
        } else if (dto.getInfoMenu() != null) {
            // Modo personalizado
            InfoMenu infoMenuNuevo = infoMenuMapper.toEntity(dto.getInfoMenu());

            // Buscar si ya existe un InfoMenu similar
            List<InfoMenu> menusExistentes = infoMenuRepository.findAll();
            InfoMenu existente = menusExistentes.stream()
                    .filter(m -> m.equals(infoMenuNuevo))
                    .findFirst()
                    .orElse(null);

            if (existente != null) {
                pedido.setInfoMenu(existente); // reutilizar
            } else {
                InfoMenu guardado = infoMenuRepository.save(infoMenuNuevo); // Guardar antes de asociar
                pedido.setInfoMenu(guardado); // usar el nuevo ya persistido
            }
        } else {
            throw new RuntimeException("Debe especificar un infoMenuId o los datos de un nuevo infoMenu.");
        }

        // Estado
        pedido.setEstado(dto.getEstado());

        Pedido saved = pedidoRepository.save(pedido);
        return pedidoMapper.toDTO(saved);
    }

    public PedidoDTO update(Long id, PedidoDTO pedidoDTO) {
        Pedido existing = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado con ID: " + id));

        // Mapeo manual
        existing.setCliente(pedidoMapper.toEntity(pedidoDTO).getCliente());
        existing.setDatosEvento(pedidoMapper.toEntity(pedidoDTO).getDatosEvento());
        existing.setInfoMenu(pedidoMapper.toEntity(pedidoDTO).getInfoMenu());
        existing.setEstado(pedidoDTO.getEstado());

        Pedido updated = pedidoRepository.save(existing);
        return pedidoMapper.toDTO(updated);
    }

    public void delete(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido no encontrado con ID: " + id));
        pedidoRepository.delete(pedido);
    }
}
