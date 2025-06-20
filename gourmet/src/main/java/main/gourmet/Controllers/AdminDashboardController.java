package main.gourmet.Controllers;

import main.gourmet.Entity.ENUM.Role;
import main.gourmet.Entity.ENUM.Role.RoleName; // Import the nested enum RoleName
import main.gourmet.Repository.RoleRepository;
import main.gourmet.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

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

            System.err.println("Warning: ROLE_ADMIN not found in the roles table.");
        }

        Map<String, Long> counts = new HashMap<>();
        counts.put("totalUsers", totalUsers);
        counts.put("totalAdmins", totalAdmins);

        return ResponseEntity.ok(counts);
    }

    // You can add other admin dashboard specific endpoints here
}