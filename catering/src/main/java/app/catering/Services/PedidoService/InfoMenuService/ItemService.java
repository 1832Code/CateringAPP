package app.catering.Services.PedidoService.InfoMenuService;

import app.catering.DTO.CategoriaDTO;
import app.catering.DTO.ItemDTO;
import app.catering.Mappers.ItemMapper;
import app.catering.Repository.ItemPackageRepository.CategoriaRepository;
import app.catering.Repository.ItemPackageRepository.ItemRepository;
import app.catering.Entity.ItemsPackages.Item;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemService {
    private final ItemRepository itemRepository;
    private final CategoriaRepository categoriaRepository;

    public List<ItemDTO> getAllItems() {
        return itemRepository.findAll().stream()
                .map(ItemMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ItemDTO getItemById(Long id) {
        return itemRepository.findById(id)
                .map(ItemMapper::toDTO)
                .orElse(null);
    }

    public ItemDTO createItem(ItemDTO itemDTO) {
        Item item = ItemMapper.toEntity(itemDTO);

        // Establecer la categoría completa desde DB si existe
        CategoriaDTO categoriaDTO = itemDTO.getCategoria();
        if (categoriaDTO != null && categoriaDTO.getId() != null) {
            categoriaRepository.findById(categoriaDTO.getId()).ifPresent(item::setCategoria);
        }

        item.setActivo(true);
        Item savedItem = itemRepository.save(item);
        return ItemMapper.toDTO(savedItem);
    }

    public ItemDTO updateItem(Long id, ItemDTO itemDTO) {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isEmpty()) return null;

        Item item = optionalItem.get();
        item.setNombre(itemDTO.getNombre());
        item.setDescripcion(itemDTO.getDescripcion());
        item.setPrecio(itemDTO.getPrecio());
        item.setImageURL(itemDTO.getImageURL());

        CategoriaDTO categoriaDTO = itemDTO.getCategoria();
        if (categoriaDTO != null && categoriaDTO.getId() != null) {
            categoriaRepository.findById(categoriaDTO.getId()).ifPresent(item::setCategoria);
        }

        Item updatedItem = itemRepository.save(item);
        return ItemMapper.toDTO(updatedItem);
    }

    public boolean deleteItem(Long id) {
        if (!itemRepository.existsById(id)) return false;
        itemRepository.deleteById(id);
        return true;
    }
}
