package main.gourmet.Config;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String getUserProfile() {
        return "Este es el perfil de usuario. Solo accesible para USER y ADMIN.";
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String getAdminDashboard() {
        return "Este es el panel de administración. Solo accesible para ADMIN.";
    }
}