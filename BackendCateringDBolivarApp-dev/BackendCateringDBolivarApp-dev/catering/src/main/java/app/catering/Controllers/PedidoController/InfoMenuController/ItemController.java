package app.catering.Controllers.PedidoController.InfoMenuController;

import app.catering.DTO.ItemDTO;
import app.catering.Services.CloudinaryService;
import app.catering.Services.PedidoService.InfoMenuService.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;
    private final CloudinaryService cloudinaryService;
    /**
     * Obtiene todos los ítems.
     * Ruta: GET /api/items
     * Accesible para cualquier usuario.
     */
    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        List<ItemDTO> items = itemService.getAllItems();
        return ResponseEntity.ok(items); // Devuelve lista de ítems y 200 OK
    }

    /**
     * Obtiene un ítem específico por su ID.
     * Ruta: GET /api/items/{id}
     * Accesible para cualquier usuario.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> getItemById(@PathVariable Long id) {
        ItemDTO item = itemService.getItemById(id);
        // Si existe, devuelve 200 OK con el ítem; si no, 404 Not Found
        return item != null ? ResponseEntity.ok(item) : ResponseEntity.notFound().build();
    }

    /**
     * Crea un nuevo ítem.
     * Ruta: POST /api/items
     * Solo accesible para usuarios con rol ADMIN.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ItemDTO> createItem(@RequestBody ItemDTO itemDTO) {
        ItemDTO newItem = itemService.createItem(itemDTO);
        return ResponseEntity.ok(newItem); // Devuelve el ítem creado
    }

    /**
     * Actualiza un ítem existente por su ID.
     * Ruta: PUT /api/items/{id}
     * Solo accesible para usuarios con rol ADMIN.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ItemDTO> updateItem(@PathVariable Long id, @RequestBody ItemDTO itemDTO) {
        ItemDTO updatedItem = itemService.updateItem(id, itemDTO);
        // Si existe, devuelve 200 OK con el ítem actualizado; si no, 404 Not Found
        return updatedItem != null ? ResponseEntity.ok(updatedItem) : ResponseEntity.notFound().build();
    }

    /**
     * Elimina un ítem existente por su ID.
     * Ruta: DELETE /api/items/{id}
     * Solo accesible para usuarios con rol ADMIN.
     */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        boolean deleted = itemService.deleteItem(id);
        // Si existe, devuelve 204 No Content; si no, 404 Not Found
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String url = cloudinaryService.uploadImage(file);
            return ResponseEntity.ok().body(url);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al subir la imagen: " + e.getMessage());
        }
    }
}
