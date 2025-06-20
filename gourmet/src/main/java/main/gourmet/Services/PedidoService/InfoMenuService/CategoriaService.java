package main.gourmet.Services.PedidoService.InfoMenuService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.gourmet.DTO.CategoriaDTO;
import main.gourmet.Entity.ItemsPackages.Categoria;
import main.gourmet.Mappers.CategoriaMapper;
import main.gourmet.Repository.ItemPackageRepository.CategoriaRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<CategoriaDTO> obtenerTodasDTO() {
        return categoriaRepository.findAll()
                .stream()
                .map(CategoriaMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CategoriaDTO guardarDesdeDTO(CategoriaDTO dto) {
        Categoria categoria = CategoriaMapper.toEntity(dto);
        Categoria guardada = categoriaRepository.save(categoria);
        return CategoriaMapper.toDTO(guardada);
    }

    public CategoriaDTO obtenerPorIdDTO(Long id) {
        Categoria categoria = categoriaRepository.findById(id).orElse(null);
        return categoria != null ? CategoriaMapper.toDTO(categoria) : null;
    }

    public void eliminar(Long id) {
        categoriaRepository.deleteById(id);
    }
}
