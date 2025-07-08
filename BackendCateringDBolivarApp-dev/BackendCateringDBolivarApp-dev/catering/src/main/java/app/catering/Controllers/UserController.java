package app.catering.Controllers;

import java.util.List;
import java.util.Map;

import app.catering.DTO.UsuarioDTO;
import app.catering.DTO.UsuarioResponseDTO;
import app.catering.DTO.UsuarioUpdateAdminDTO;
import app.catering.DTO.UsuarioUpdateDTO;
import app.catering.Entity.User.Usuario;
import app.catering.Mappers.UsuarioMapper;
import app.catering.Repository.UsuarioRepository;
import app.catering.Services.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UserController {


    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;

    /**
     * Obtiene el perfil del usuario autenticado.
     * Ruta: GET /api/usuarios/me
     * Accesible para cualquier usuario autenticado.
     */
    @GetMapping("/me")
    public ResponseEntity<UsuarioDTO> getPerfil(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        Usuario usuario = usuarioService.obtenerPorEmail(email);

        return ResponseEntity.ok(UsuarioMapper.toDTO(usuario));
    }

    /**
     * Actualiza el perfil del usuario autenticado (versión demo para ADMIN).
     * Ruta: PUT /api/usuarios/me/demo
     * Solo accesible para usuarios con rol ADMIN.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/me/demo")
    public ResponseEntity<Usuario> actualizarPerfil(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Usuario datosActualizados
    ) {
        String email = userDetails.getUsername();
        Usuario actualizado = usuarioService.actualizarUsuarioPorEmail(email, datosActualizados);
        return ResponseEntity.ok(actualizado);
    }

    /**
     * Actualiza el perfil del usuario autenticado.
     * Ruta: PUT /api/usuarios/me
     * Accesible para cualquier usuario autenticado.
     */
    @PutMapping("/me")
    public ResponseEntity<UsuarioResponseDTO> actualizarPerfil(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UsuarioUpdateDTO dto) {

        UsuarioResponseDTO actualizado = usuarioService.actualizarPerfil(userDetails.getUsername(), dto);
        return ResponseEntity.ok(actualizado);
    }

    /**
     * ADMIN: Obtiene la lista de todos los usuarios registrados.
     * Ruta: GET /api/usuarios
     * Solo accesible para usuarios con rol ADMIN.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerTodos() {
        return ResponseEntity.ok(usuarioService.obtenerTodos());
    }

    /**
     * ADMIN: Obtiene un usuario específico por su ID.
     * Ruta: GET /api/usuarios/{id}
     * Solo accesible para usuarios con rol ADMIN.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.obtenerPorId(id));
    }

    /**
     * ADMIN: Actualiza un usuario específico por su ID.
     * Ruta: PUT /api/usuarios/{id}
     * Solo accesible para usuarios con rol ADMIN.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> actualizarUsuarioPorId(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioUpdateAdminDTO dto
    ) {
        UsuarioResponseDTO actualizado = usuarioService.actualizarUsuarioPorId(id, dto);
        return ResponseEntity.ok(actualizado);
    }

    /**
     * ADMIN: Elimina un usuario específico por su ID.
     * Ruta: DELETE /api/usuarios/{id}
     * Solo accesible para usuarios con rol ADMIN.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
