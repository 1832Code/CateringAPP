
package main.gourmet.verification.Request;

public class AuthResponse {
    public String token;
    public String type = "Bearer";
    public Long id;
    public String email;
    public String[] roles;

    public AuthResponse(String token, Long id, String email, String[] roles) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.roles = roles;
    }
}