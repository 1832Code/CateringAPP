package app.catering.Controllers;

import app.catering.DTO.UsuarioAdminDto;
import app.catering.DTO.UsuarioResponseDTO;
import app.catering.DTO.UsuarioUpdateAdminDTO;
import app.catering.Entity.User.Usuario;
import app.catering.Mappers.UsuarioMapper;
import app.catering.Services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admins/usuarios")
@RequiredArgsConstructor
public class AdminUsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<UsuarioAdminDto>> listarUsuarios() {
        List<UsuarioAdminDto> usuarios = usuarioService.obtenerTodos()
                .stream()
                .map(UsuarioMapper::toAdminDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioAdminDto> obtenerPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.obtenerPorId(id);
        return ResponseEntity.ok(UsuarioMapper.toAdminDTO(usuario));
    }

    @PostMapping
    public ResponseEntity<UsuarioAdminDto> crear(@RequestBody UsuarioUpdateAdminDTO dto) {
        Usuario nuevo = usuarioService.crearUsuarioDesdeAdmin(dto);
        return ResponseEntity.ok(UsuarioMapper.toAdminDTO(nuevo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> actualizar(@PathVariable Long id,
            @RequestBody UsuarioUpdateAdminDTO dto) {
        return ResponseEntity.ok(usuarioService.actualizarUsuarioPorId(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
