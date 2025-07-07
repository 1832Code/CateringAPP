package app.catering.Services;

import app.catering.Entity.User.Usuario;
import app.catering.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("CustomUserDetailService - Loading user by email: " + email);
        
        Usuario usuario = usuarioRepository.findByEmailWithRoles(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        System.out.println("CustomUserDetailService - Usuario encontrado: " + usuario.getEmail() + ", Roles: " + usuario.getRoles());

        // 👉 Copiar los roles a un nuevo Set para evitar ConcurrentModificationException
        Set<String> nombresRoles = usuario.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());

        System.out.println("CustomUserDetailService - Nombres de roles: " + nombresRoles);

        List<SimpleGrantedAuthority> authorities = nombresRoles.stream()
                .map(SimpleGrantedAuthority::new)
                .toList();

        System.out.println("CustomUserDetailService - Authorities creadas: " + authorities);

        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),
                usuario.getPassword(),
                authorities
        );
    }
}