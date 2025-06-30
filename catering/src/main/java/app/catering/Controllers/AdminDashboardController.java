package app.catering.Controllers;


import app.catering.Auth.AuthResponse;
import app.catering.Auth.AuthService;
import app.catering.Auth.RegisterRequest;
import app.catering.Entity.User.Role;
import app.catering.Entity.User.RoleName;
import app.catering.Repository.PedidoRepository.InfoMenuRepository.InfoMenuRepository;
import app.catering.Repository.PedidoRepository.PedidoRepository;
import app.catering.Repository.RoleRepository;
import app.catering.Repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/admin/dashboard")
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



    @GetMapping("/userCounts")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> getUserCounts() {
        long totalUsers = userRepository.count();

        Optional<Role> adminRoleOptional = roleRepository.findByName(RoleName.ROLE_ADMIN);

        long totalAdmins = 0;
        if (adminRoleOptional.isPresent()) {
            Role adminRole = adminRoleOptional.get();
            totalAdmins = userRepository.countByRolesContaining(adminRole);
        } else {

            logger.warn("ROLE_ADMIN not found in the roles table.");
        }

        Map<String, Long> counts = new HashMap<>();
        counts.put("totalUsers", totalUsers);
        counts.put("totalAdmins", totalAdmins);

        return ResponseEntity.ok(counts);
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
}
