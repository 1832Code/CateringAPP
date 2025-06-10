package app.catering.Controllers;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user/me")
    public Map<String, Object> userInfo(@AuthenticationPrincipal OAuth2User principal) {
        return Map.of(
            "nombre", principal.getAttribute("name"),
            "email", principal.getAttribute("email"),
            "proveedor", principal.getAttribute("iss") != null ? "google" : "github"
        );
    }
}
