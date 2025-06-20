package main.gourmet.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import main.gourmet.Entity.ENUM.Role;
import main.gourmet.Entity.Pedido.Pedido;
import lombok.AllArgsConstructor;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.HashSet;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dni;
    private String firstName;
    private String lastName;
    private String telephone;
    private String email;
    private String password;
    private String verificationCode; // Código para verificación de email
    private boolean enabled; // Indica si la cuenta está verificada

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Pedido> pedidos;
}