package app.catering.Entity.User;
import jakarta.persistence.*;


import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuarios", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "El DNI es obligatorio")
    private String dni;

    @Column(nullable = false)
    @NotBlank(message = "Nombres son obligatorios")
    private String nombres;

    @Column(nullable = false)
    @NotBlank(message = "Apellidos son obligatorios")
    private String apellidos;

    @Column(nullable = false)
    @NotBlank(message = "Teléfono es obligatorio")
    private String telefono;

    @Column(nullable = false, unique = true)
    @Email(message = "Correo electrónico no válido")
    private String email;

    @Column(nullable = false)
    @NotBlank(message = "Contraseña es obligatoria")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;



    private boolean confirmed;

    public boolean isConfirmed() {
        return confirmed;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((role.name())));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
