package app.catering.Controllers.PedidoController.InfoMenuController;


import app.catering.DTO.CategoriaDTO;
import app.catering.Services.PedidoService.InfoMenuService.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<CategoriaDTO> listarCategoriasDTO() {
        return categoriaService.obtenerTodasDTO();
    }

    @GetMapping("/{id}")
    public CategoriaDTO obtenerCategoriaDTO(@PathVariable Long id) {
        return categoriaService.obtenerPorIdDTO(id);
    }

    @PostMapping
    public CategoriaDTO crearCategoria(@RequestBody CategoriaDTO dto) {
        return categoriaService.guardarDesdeDTO(dto);
    }

    @PutMapping("/{id}")
    public CategoriaDTO actualizarCategoria(@PathVariable Long id, @RequestBody CategoriaDTO dto) {
        dto.setId(id);
        return categoriaService.guardarDesdeDTO(dto);
    }

    @DeleteMapping("/{id}")
    public void eliminarCategoria(@PathVariable Long id) {
        categoriaService.eliminar(id);
    }
}
