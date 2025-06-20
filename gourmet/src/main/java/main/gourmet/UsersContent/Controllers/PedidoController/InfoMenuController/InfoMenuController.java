package main.gourmet.UsersContent.Controllers.PedidoController.InfoMenuController;

import lombok.RequiredArgsConstructor;
import main.gourmet.DTO.InfoMenuDTO;
import main.gourmet.Entity.Pedido.InfoMenu.InfoMenu;
import main.gourmet.Services.PedidoService.InfoMenuService.InfoMenuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/infomenu")
@RequiredArgsConstructor
public class InfoMenuController {
    private final InfoMenuService infoMenuService;

    // Crear un nuevo InfoMenu
    @PostMapping
    public ResponseEntity<InfoMenuDTO> createInfoMenu(@RequestBody InfoMenuDTO dto) {
        InfoMenu created = infoMenuService.createInfoMenu(dto);
        InfoMenuDTO responseDTO = infoMenuService.convertInfoToDTO(created);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    // Obtener todos los InfoMenu
    @GetMapping
    public ResponseEntity<List<InfoMenu>> getAllInfoMenus() {
        List<InfoMenu> list = infoMenuService.getAllInfoMenus();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // Obtener un InfoMenu por ID
    @GetMapping("/{id}")
    public ResponseEntity<InfoMenu> getInfoMenuById(@PathVariable Long id) {
        Optional<InfoMenu> infoMenu = infoMenuService.getInfoMenuById(id);
        return infoMenu.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Obtener todos los InfoMenu tipo "Predeterminado" (opcional)
    @GetMapping("/predeterminados")
    public ResponseEntity<?> getPredeterminedMenus() {
        return ResponseEntity.ok(infoMenuService.getAllInfoMenusDefault());
    }

    // Actualizar un InfoMenu por ID
    @PutMapping("/{id}")
    public ResponseEntity<InfoMenu> updateInfoMenu(@PathVariable Long id, @RequestBody InfoMenuDTO dto) {
        Optional<InfoMenu> updated = infoMenuService.updateInfoMenu(id, dto);
        return updated.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Eliminar un InfoMenu por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInfoMenu(@PathVariable Long id) {
        boolean deleted = infoMenuService.deleteInfoMenu(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
