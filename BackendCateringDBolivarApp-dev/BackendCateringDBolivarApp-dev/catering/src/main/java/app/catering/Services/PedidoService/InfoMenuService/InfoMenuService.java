package app.catering.Services.PedidoService.InfoMenuService;

import app.catering.DTO.*;
import app.catering.Repository.ItemPackageRepository.CategoriaRepository;
import app.catering.Repository.ItemPackageRepository.ItemRepository;
import app.catering.Repository.PedidoRepository.DetailServicioRepository;
import app.catering.Repository.PedidoRepository.InfoMenuRepository.DetailServicioInfoRepository;
import app.catering.Repository.PedidoRepository.InfoMenuRepository.TipoServicioRepository;
import app.catering.Users.ItemsPackages.Categoria;
import app.catering.Users.ItemsPackages.Item;
import app.catering.Users.Pedido.DetailExtra.DetailExtra;
import app.catering.Users.Pedido.DetailExtra.DetailExtraInfo;
import app.catering.Users.Pedido.DetailPersonal.DetailPersonal;
import app.catering.Users.Pedido.DetailPersonal.DetailPersonalInfo;
import app.catering.Users.Pedido.InfoMenu.DetailServicio;
import app.catering.Users.Pedido.InfoMenu.DetailServicioInfo;
import app.catering.Users.Pedido.InfoMenu.TipoServicio;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.catering.Repository.PedidoRepository.InfoMenuRepository.InfoMenuRepository;
import app.catering.Users.Pedido.InfoMenu.InfoMenu;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class InfoMenuService {

    @Autowired
    private InfoMenuRepository infoMenuRepository;

    @Autowired
    private TipoServicioRepository tipoServicioRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private DetailServicioRepository detailServicioRepository;

    @Autowired
    private DetailServicioInfoRepository detailServicioInfoRepository;

    public InfoMenu createInfoMenu(InfoMenuDTO dto) {
        InfoMenu infoMenu = new InfoMenu();

        infoMenu.setTitulo(dto.getTitulo());
        infoMenu.setDescripcion(dto.getDescripcion());
        infoMenu.setPrecio(dto.getPrecio());
        infoMenu.setImageURL(dto.getImageURL());
        infoMenu.setActivo(dto.getActivo());
        infoMenu.setCantPersonas(dto.getCantPersonas());
        infoMenu.setTipoInfoMenu(dto.getTipoInfoMenu());

        // Convertir sub-DTOs a entidades
        DetailServicio servicio = convertToServicio(dto.getServicio());
        DetailPersonal personal = convertToPersonal(dto.getPersonal());
        DetailExtra extra = convertToExtra(dto.getExtra());

        infoMenu.setServicio(servicio);
        infoMenu.setPersonal(personal);
        infoMenu.setExtra(extra);

        return infoMenuRepository.save(infoMenu);
    }

    public InfoMenuDTO convertInfoToDTO(InfoMenu infoMenu) {
        InfoMenuDTO dto = new InfoMenuDTO();
        dto.setTitulo(infoMenu.getTitulo());
        dto.setDescripcion(infoMenu.getDescripcion());
        dto.setPrecio(infoMenu.getPrecio());
        dto.setImageURL(infoMenu.getImageURL());
        dto.setActivo(infoMenu.getActivo());
        dto.setCantPersonas(infoMenu.getCantPersonas());
        dto.setTipoInfoMenu(infoMenu.getTipoInfoMenu());

        // Convertir servicio
        if (infoMenu.getServicio() != null) {
            dto.setServicio(convertServicioToDTO(infoMenu.getServicio()));
        }

        // Convertir personal
        if (infoMenu.getPersonal() != null) {
            dto.setPersonal(convertPersonalToDTO(infoMenu.getPersonal()));
        }

        // Convertir extra
        if (infoMenu.getExtra() != null) {
            dto.setExtra(convertExtraToDTO(infoMenu.getExtra()));
        }

        return dto;
    }

    private DetailExtraDTO convertExtraToDTO(DetailExtra extra) {
        DetailExtraDTO dto = new DetailExtraDTO();

        List<DetailExtraInfoDTO> extraInfo = extra.getExtraInfo().stream().map(info -> {
            DetailExtraInfoDTO infoDTO = new DetailExtraInfoDTO();
            infoDTO.setCantidad(info.getCantidad());
            infoDTO.setTipoExtra(info.getTipoExtra());
            return infoDTO;
        }).toList();

        dto.setExtraInfo(extraInfo);
        return dto;
    }
    private DetailServicioDTO convertServicioToDTO(DetailServicio servicio) {
        DetailServicioDTO dto = new DetailServicioDTO();

        if (servicio.getTipoServicio() != null) {
            TipoServicioDTO tipoDTO = new TipoServicioDTO();
            tipoDTO.setId(servicio.getTipoServicio().getId());
            dto.setTipoServicio(tipoDTO);
        }

        List<DetailServicioInfoDTO> items = servicio.getItems().stream().map(item -> {
            DetailServicioInfoDTO infoDTO = new DetailServicioInfoDTO();
            ItemDTO itemDTO = new ItemDTO();
            itemDTO.setId(item.getItem().getId());
            infoDTO.setItem(itemDTO);
            return infoDTO;
        }).toList();

        dto.setItems(items);
        return dto;
    }
    private DetailPersonalDTO convertPersonalToDTO(DetailPersonal personal) {
        DetailPersonalDTO dto = new DetailPersonalDTO();

        List<DetailPersonalInfoDTO> personalInfo = personal.getPersonalInfo().stream().map(info -> {
            DetailPersonalInfoDTO infoDTO = new DetailPersonalInfoDTO();
            infoDTO.setCantidad(info.getCantidad());
            infoDTO.setTipoPersonal(info.getTipoPersonal());
            return infoDTO;
        }).toList();

        dto.setPersonalInfo(personalInfo);
        return dto;
    }

    // Métodos auxiliares para convertir DTOs a entidades
    private DetailServicio convertToServicio(DetailServicioDTO dto) {
        DetailServicio servicio = new DetailServicio();

        // ✅ Buscar y asignar tipoServicio existente
        TipoServicio tipo = tipoServicioRepository.findById(dto.getTipoServicio().getId())
                .orElseThrow(() -> new RuntimeException("TipoServicio no encontrado"));

        servicio.setTipoServicio(tipo);

        // Convertir y asignar items si tienes lógica para eso
        List<DetailServicioInfo> items = new ArrayList<>();
        for (DetailServicioInfoDTO itemDTO : dto.getItems()) {
            DetailServicioInfo item = new DetailServicioInfo();
            item.setDetailServicio(servicio); // establecer relación bidireccional
            // si hay entidad Item, búscala por ID
            Item itemEntity = itemRepository.findById(itemDTO.getItem().getId())
                    .orElseThrow(() -> new RuntimeException("Item no encontrado"));
            item.setItem(itemEntity);
            items.add(item);
        }
        servicio.setItems(items);

        return servicio;
    }

    private DetailPersonal convertToPersonal(DetailPersonalDTO dto) {
        DetailPersonal personal = new DetailPersonal();

        List<DetailPersonalInfo> infoList = dto.getPersonalInfo().stream().map(infoDTO -> {
            DetailPersonalInfo info = new DetailPersonalInfo();
            info.setCantidad(infoDTO.getCantidad());
            info.setTipoPersonal(infoDTO.getTipoPersonal());

            // Relación bidireccional (opcional pero recomendable si tienes mappedBy en JPA)
            info.setDetailPersonal(personal);

            return info;
        }).toList();

        personal.setPersonalInfo(infoList);

        return personal;
    }

    private DetailExtra convertToExtra(DetailExtraDTO dto) {
        DetailExtra extra = new DetailExtra();

        List<DetailExtraInfo> infoList = dto.getExtraInfo().stream().map(infoDTO -> {
            DetailExtraInfo info = new DetailExtraInfo();
            info.setCantidad(infoDTO.getCantidad());
            info.setTipoExtra(infoDTO.getTipoExtra());

            // Relación bidireccional (opcional pero recomendado)
            info.setDetailExtra(extra);

            return info;
        }).toList();

        extra.setExtraInfo(infoList);

        return extra;
    }

    // Obtener todos los InfoMenu
    public List<InfoMenu> getAllInfoMenus() {
        return infoMenuRepository.findAll();
    }

    // Obtener InfoMenu por ID
    public Optional<InfoMenu> getInfoMenuById(Long id) {
        return infoMenuRepository.findById(id);
    }

    // Obtener InfoMenu Predeterminado
    public List<InfoMenu> getAllInfoMenusDefault() {
        return infoMenuRepository.findByTipoInfoMenu("Predeterminado");
    }
    // Actualizar InfoMenu existente
    @Transactional
    public Optional<InfoMenu> updateInfoMenu(Long id, InfoMenuDTO dto) {
        Optional<InfoMenu> optionalInfoMenu = infoMenuRepository.findById(id);
        if (optionalInfoMenu.isEmpty()) return Optional.empty();

        InfoMenu infoMenu = optionalInfoMenu.get();
        mapDtoToEntity(dto, infoMenu);
        return Optional.of(infoMenuRepository.save(infoMenu));
    }

    // Eliminar InfoMenu
    public boolean deleteInfoMenu(Long id) {
        if (!infoMenuRepository.existsById(id)) return false;
        infoMenuRepository.deleteById(id);
        return true;
    }

    // Utilidad para mapear DTO a entidad
    private void mapDtoToEntity(InfoMenuDTO dto, InfoMenu entity) {
        entity.setTitulo(dto.getTitulo());
        entity.setDescripcion(dto.getDescripcion());
        entity.setPrecio(dto.getPrecio());
        entity.setImageURL(dto.getImageURL());
        entity.setActivo(dto.getActivo());
        entity.setCantPersonas(dto.getCantPersonas());
        entity.setTipoInfoMenu(dto.getTipoInfoMenu());

        // Mapeo DetailServicio
        DetailServicio servicio = new DetailServicio();


        TipoServicio tipoServicio = new TipoServicio();
        tipoServicio.setId(dto.getServicio().getTipoServicio().getId()); // solo el ID
        servicio.setTipoServicio(tipoServicio);

        List<DetailServicioInfo> servicioItems = new ArrayList<>();
        for (DetailServicioInfoDTO itemDto : dto.getServicio().getItems()) {
            DetailServicioInfo item = new DetailServicioInfo();
            item.setDetailServicio(servicio);

            Item itemEntity = new Item();
            itemEntity.setId(itemDto.getItem().getId());
            item.setItem(itemEntity);



            servicioItems.add(item);
        }
        servicio.setItems(servicioItems);
        entity.setServicio(servicio);


    }
    public InfoMenu saveInfoMenu(InfoMenuDTO dto) {
        InfoMenu infoMenu = new InfoMenu();

        // Setear campos simples
        infoMenu.setTitulo(dto.getTitulo());
        infoMenu.setDescripcion(dto.getDescripcion());
        infoMenu.setPrecio(dto.getPrecio());
        infoMenu.setActivo(dto.getActivo());
        infoMenu.setCantPersonas(dto.getCantPersonas());
        infoMenu.setTipoInfoMenu(dto.getTipoInfoMenu());
        infoMenu.setImageURL(dto.getImageURL());

        // DetailServicio
        DetailServicio detailServicio = new DetailServicio();

        // Buscar TipoServicio existente por id
        TipoServicio tipoServicio = tipoServicioRepository.findById(dto.getServicio().getTipoServicio().getId())
                .orElseThrow(() -> new RuntimeException("TipoServicio no encontrado"));
        detailServicio.setTipoServicio(tipoServicio);



        // Agregar items DetailServicioInfo
        List<DetailServicioInfo> items = new ArrayList<>();
        for (DetailServicioInfoDTO infoDTO : dto.getServicio().getItems()) {
            DetailServicioInfo info = new DetailServicioInfo();

            info.setDetailServicio(detailServicio);

            // Buscar Categoria e Item existentes por id
            Item item = itemRepository.findById(infoDTO.getItem().getId())
                    .orElseThrow(() -> new RuntimeException("Item no encontrado"));
            info.setItem(item);



            items.add(info);
        }
        detailServicio.setItems(items);
        infoMenu.setServicio(detailServicio);

        // DetailPersonal
        DetailPersonal detailPersonal = new DetailPersonal();
        detailPersonal.setInfoMenu(infoMenu);

        List<DetailPersonalInfo> personalInfos = new ArrayList<>();
        for (DetailPersonalInfoDTO dpDTO : dto.getPersonal().getPersonalInfo()) {
            DetailPersonalInfo dpi = new DetailPersonalInfo();
            dpi.setDetailPersonal(detailPersonal);
            dpi.setTipoPersonal(dpDTO.getTipoPersonal());
            dpi.setCantidad(dpDTO.getCantidad());
            personalInfos.add(dpi);
        }
        detailPersonal.setPersonalInfo(personalInfos);
        infoMenu.setPersonal(detailPersonal);

        // DetailExtra
        DetailExtra detailExtra = new DetailExtra();
        detailExtra.setInfoMenu(infoMenu);

        List<DetailExtraInfo> extrasInfo = new ArrayList<>();
        for (DetailExtraInfoDTO deDTO : dto.getExtra().getExtraInfo()) {
            DetailExtraInfo dei = new DetailExtraInfo();
            dei.setDetailExtra(detailExtra);
            dei.setTipoExtra(deDTO.getTipoExtra());
            dei.setCantidad(deDTO.getCantidad());
            extrasInfo.add(dei);
        }
        detailExtra.setExtraInfo(extrasInfo);
        infoMenu.setExtra(detailExtra);

        // Finalmente guardar infoMenu, que cascada guarda todo lo demás
        return infoMenuRepository.save(infoMenu);
    }

    public void crearOActualizarDetailServicioInfo(Long itemId, Long categoriaId, Long tipoServicioId,
                                                   DetailServicio detailServicio,
                                                   DetailServicioInfo detailServicioInfo) {

        // Cargar entidades existentes
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada"));
        TipoServicio tipoServicio = tipoServicioRepository.findById(tipoServicioId)
                .orElseThrow(() -> new RuntimeException("TipoServicio no encontrado"));

        // Setear relaciones
        detailServicio.setTipoServicio(tipoServicio);
        detailServicioInfo.setItem(item);
        detailServicioInfo.setDetailServicio(detailServicio);

        // Guardar entidades en el orden correcto
        detailServicioRepository.save(detailServicio);
        detailServicioInfoRepository.save(detailServicioInfo);
    }
}