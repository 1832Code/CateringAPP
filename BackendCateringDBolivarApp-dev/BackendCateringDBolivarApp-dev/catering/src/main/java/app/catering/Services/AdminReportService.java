package app.catering.Services;

import app.catering.Repository.RoleRepository;
import app.catering.Repository.UsuarioRepository;
import app.catering.Entity.User.Role;
import app.catering.Entity.User.RoleName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminReportService {

    private final UsuarioRepository userRepository;
    private final RoleRepository roleRepository;

    public Map<String, Object> getUserCounts() {
        long totalUsers = userRepository.count();

        Optional<Role> adminRoleOptional = roleRepository.findByName(RoleName.ROLE_ADMIN);

        long totalAdmins = 0;
        if (adminRoleOptional.isPresent()) {
            Role adminRole = adminRoleOptional.get();
            totalAdmins = userRepository.countByRolesContaining(adminRole);
        }

        Map<String, Object> counts = new HashMap<>();
        counts.put("totalUsers", totalUsers);
        counts.put("totalAdmins", totalAdmins);

        return counts;
    }
}