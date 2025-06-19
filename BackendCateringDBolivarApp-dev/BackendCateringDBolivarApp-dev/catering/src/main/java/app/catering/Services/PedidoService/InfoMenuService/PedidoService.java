package app.catering.Services.PedidoService.InfoMenuService;

import app.catering.DTO.PedidoDTO;
import app.catering.Entity.User.Usuario;
import app.catering.Mappers.DatosEventoMapper;
import app.catering.Mappers.InfoMenuMapper;
import app.catering.Mappers.PedidoMapper;
import app.catering.Repository.PedidoRepository.InfoMenuRepository.InfoMenuRepository;
import app.catering.Repository.PedidoRepository.PedidoRepository;
import app.catering.Entity.Pedido.DatosEvento;
import app.catering.Entity.Pedido.InfoMenu.InfoMenu;
import app.catering.Entity.Pedido.Pedido;
import app.catering.Repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final PedidoMapper pedidoMapper;
    private final UsuarioRepository usuarioRepository;
    private final InfoMenuRepository infoMenuRepository;
    private final DatosEventoMapper datosEventoMapper;
    private final InfoMenuMapper infoMenuMapper;
    @Autowired
    private Validator validator;


    public PedidoService(PedidoRepository pedidoRepository,
                         PedidoMapper pedidoMapper,
                         UsuarioRepository usuarioRepository, InfoMenuRepository infoMenuRepository, DatosEventoMapper datosEventoMapper, InfoMenuMapper infoMenuMapper) {
        this.pedidoRepository = pedidoRepository;
        this.pedidoMapper = pedidoMapper;
        this.usuarioRepository = usuarioRepository;
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
    public List<PedidoDTO> getPedidosByEmail(String email) {
        List<Pedido> pedidos = pedidoRepository.findAllByUsuarioEmail(email);
        return pedidos.stream()
                .map(pedidoMapper::toDTO)
                .toList();
    }

    public PedidoDTO create(PedidoDTO dto) {
        // Validaciones básicas
        if (dto == null) throw new IllegalArgumentException("PedidoDTO no puede ser nulo.");
        if (dto.getUsuarioId() == null) throw new IllegalArgumentException("Usuario ID es obligatorio.");
        if (dto.getDatosEvento() == null) throw new IllegalArgumentException("Datos del evento son obligatorios.");
        if (dto.getInfoMenuId() == null && dto.getInfoMenu() == null)
            throw new IllegalArgumentException("Debe especificar infoMenuId o infoMenu personalizado.");
        if (dto.getEstado() == null) throw new IllegalArgumentException("Estado del pedido es obligatorio.");



        Pedido pedido = new Pedido();

        // Usuario existente
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        pedido.setUsuario(usuario);

        // Convierte y VALIDA DatosEvento antes de setear
        DatosEvento datosEvento = datosEventoMapper.toEntity(dto.getDatosEvento());

        // Retorna los errores de las validaciones
        Set<ConstraintViolation<DatosEvento>> violations = validator.validate(datosEvento);

        if (!violations.isEmpty()) {
            String errorMsg = violations.stream()
                    .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                    .collect(Collectors.joining(", "));
            throw new IllegalArgumentException("Errores en DatosEvento: " + errorMsg);
        }

        pedido.setDatosEvento(datosEvento);
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
        existing.setUsuario(pedidoMapper.toEntity(pedidoDTO).getUsuario());
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
