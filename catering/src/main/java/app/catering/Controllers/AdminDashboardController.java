package app.catering.Controllers;

import app.catering.Auth.AuthResponse;
import app.catering.Auth.AuthService;
import app.catering.Auth.RegisterRequest;
import app.catering.Entity.Pedido.Pedido;
import app.catering.Entity.User.Role;
import app.catering.Entity.User.RoleName;
import app.catering.Repository.PedidoRepository.InfoMenuRepository.InfoMenuRepository;
import app.catering.Repository.PedidoRepository.PedidoRepository;
import app.catering.Repository.RoleRepository;
import app.catering.Repository.UsuarioRepository;
import app.catering.DTO.PedidoDTO;
import app.catering.Services.PedidoService.InfoMenuService.PedidoService;
import app.catering.Services.AdminReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3001", allowCredentials = "true")
@RestController
@RequestMapping("/api/admin/dashboard")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminDashboardController {

    private static final Logger logger = LoggerFactory.getLogger(AdminDashboardController.class);

    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private InfoMenuRepository infoMenuRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private AdminReportService adminReportService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        try {
            List<PedidoDTO> allPedidos = pedidoService.findAll();
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalPedidos", allPedidos.size());
            stats.put("pedidosPendientes", allPedidos.stream().filter(p -> "pendiente".equals(p.getEstado())).count());
            stats.put("pedidosCompletados", allPedidos.stream().filter(p -> "completado".equals(p.getEstado())).count());
            stats.put("pedidosCancelados", allPedidos.stream().filter(p -> "cancelado".equals(p.getEstado())).count());
            stats.put("totalIngresos", calculateTotalIngresos(allPedidos));
            stats.put("promedioEventosPorMes", calculatePromedioEventosPorMes(allPedidos));
            stats.put("distritosMasPopulares", getDistritosMasPopulares(allPedidos));
            stats.put("tiposEventoMasPopulares", getTiposEventoMasPopulares(allPedidos));
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/userCounts")
    public ResponseEntity<Map<String, Object>> getUserCounts() {
        try {
            Map<String, Object> counts = adminReportService.getUserCounts();
            return ResponseEntity.ok(counts);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/pedidoCount")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> getPedidoCount() {
        long count = pedidoRepository.count();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/infomenu/cant-predeterminados")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> getTotalMenusPredeterminados() {
        long totalPredeterminados = infoMenuRepository.countByTipoInfoMenu("Predeterminado");
        return ResponseEntity.ok(totalPredeterminados);
    }

    @PostMapping("/admin/register")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<AuthResponse> crearAdmin(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.crearAdmin(request));
    }

    // PEDIDOS

    @GetMapping("/pedidos-por-usuario")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Map<String, List<Pedido>>> getPedidosPorUsuario() {
        List<Pedido> pedidos = pedidoRepository.findAll();
        Map<String, List<Pedido>> pedidosPorUsuario = new HashMap<>();

        for (Pedido pedido : pedidos) {
            String email = pedido.getUsuario().getEmail(); // Ajusta según tu entidad
            pedidosPorUsuario.computeIfAbsent(email, k -> new ArrayList<>()).add(pedido);
        }

        return ResponseEntity.ok(pedidosPorUsuario);
    }

    private double calculateTotalIngresos(List<PedidoDTO> pedidos) {
        // Implementar lógica de cálculo de ingresos basada en tus necesidades
        return pedidos.stream()
                .filter(p -> "pagado".equals(p.getEstado()) || "completado".equals(p.getEstado()))
                .mapToDouble(p -> p.getInfoMenu() != null ? p.getInfoMenu().getPrecio() : 0.0)
                .sum();
    }

    private double calculatePromedioEventosPorMes(List<PedidoDTO> pedidos) {
        // Implementar lógica de cálculo de promedio mensual
        return pedidos.size() / 12.0; // Simplificado
    }

    private List<Map<String, Object>> getDistritosMasPopulares(List<PedidoDTO> pedidos) {
        return pedidos.stream()
                .filter(p -> p.getDatosEvento() != null && p.getDatosEvento().getDistrito() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                        p -> p.getDatosEvento().getDistrito(),
                        java.util.stream.Collectors.counting()
                ))
                .entrySet().stream()
                .map(entry -> {
                    Map<String, Object> distrito = new HashMap<>();
                    distrito.put("nombre", entry.getKey());
                    distrito.put("cantidad", entry.getValue());
                    return distrito;
                })
                .sorted((a, b) -> ((Long) b.get("cantidad")).compareTo((Long) a.get("cantidad")))
                .limit(5)
                .collect(java.util.stream.Collectors.toList());
    }

    private List<Map<String, Object>> getTiposEventoMasPopulares(List<PedidoDTO> pedidos) {
        return pedidos.stream()
                .filter(p -> p.getDatosEvento() != null && p.getDatosEvento().getTipoEvento() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                        p -> p.getDatosEvento().getTipoEvento(),
                        java.util.stream.Collectors.counting()
                ))
                .entrySet().stream()
                .map(entry -> {
                    Map<String, Object> tipo = new HashMap<>();
                    tipo.put("nombre", entry.getKey());
                    tipo.put("cantidad", entry.getValue());
                    return tipo;
                })
                .sorted((a, b) -> ((Long) b.get("cantidad")).compareTo((Long) a.get("cantidad")))
                .limit(5)
                .collect(java.util.stream.Collectors.toList());
    }
}
