package app.catering.TDD;

import app.catering.DTO.*;
import app.catering.Repository.ItemPackageRepository.CategoriaRepository;
import app.catering.Repository.ItemPackageRepository.ItemRepository;
import app.catering.Repository.PedidoRepository.DetailExtraRepository.DetailExtraInfoRepository;
import app.catering.Repository.PedidoRepository.DetailExtraRepository.DetailExtraRepository;
import app.catering.Repository.PedidoRepository.DetailPersonalRepository.DetailPersonalInfoRepository;
import app.catering.Repository.PedidoRepository.DetailPersonalRepository.DetailPersonalRepository;
import app.catering.Repository.PedidoRepository.DetailServicioRepository;
import app.catering.Repository.PedidoRepository.InfoMenuRepository.DetailServicioInfoRepository;
import app.catering.Repository.PedidoRepository.InfoMenuRepository.InfoMenuRepository;
import app.catering.Repository.PedidoRepository.InfoMenuRepository.TipoServicioRepository;
import app.catering.Services.PedidoService.InfoMenuService.InfoMenuService;
import app.catering.Users.ItemsPackages.Item;
import app.catering.Users.Pedido.DetailExtra.DetailExtraInfo;
import app.catering.Users.Pedido.DetailPersonal.DetailPersonalInfo;
import app.catering.Users.Pedido.InfoMenu.InfoMenu;
import app.catering.Users.Pedido.InfoMenu.TipoServicio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
public class InfoMenuServiceTest {

    @InjectMocks
    private InfoMenuService infoMenuService;

    @Mock
    private InfoMenuRepository infoMenuRepository;

    @Mock
    private TipoServicioRepository tipoServicioRepository;

    @Mock
    private ItemRepository itemRepository;

    @Mock
    private CategoriaRepository categoriaRepository;

    @Mock
    private DetailServicioRepository detailServicioRepository;

    @Mock
    private DetailPersonalRepository detailPersonalRepository;

    @Mock
    private DetailExtraRepository detailExtraRepository;

    @Mock
    private DetailServicioInfoRepository detailServicioInfoRepository;

    @Mock
    private DetailPersonalInfoRepository detailPersonalInfoRepository;

    @Mock
    private DetailExtraInfoRepository detailExtraInfoRepository;

    private InfoMenuDTO dto;

    @BeforeEach
    void setUp() {
        // Simulamos DTO de prueba
        dto = new InfoMenuDTO();
        dto.setTitulo("Menu de prueba");
        dto.setDescripcion("Descripción");
        dto.setPrecio(99.99F);
        dto.setImageURL("url.jpg");
        dto.setActivo(true);
        dto.setCantPersonas(5);
        dto.setTipoInfoMenu("Predeterminado");


        // Servicio
        TipoServicioDTO tipoServicioDTO = new TipoServicioDTO();
        tipoServicioDTO.setId(1L);

        ItemDTO itemDTO = new ItemDTO();
        itemDTO.setId(1L);

        DetailServicioInfoDTO infoServicio = new DetailServicioInfoDTO();
        infoServicio.setItem(itemDTO);

        DetailServicioDTO servicioDTO = new DetailServicioDTO();
        servicioDTO.setTipoServicio(tipoServicioDTO);
        servicioDTO.setItems(List.of(infoServicio));

        dto.setServicio(servicioDTO);

        DetailPersonalInfoDTO infoPersonal = new DetailPersonalInfoDTO();
        DetailPersonalDTO personalDTO = new DetailPersonalDTO();
        personalDTO.setPersonalInfo(List.of(infoPersonal));

        dto.setPersonal(personalDTO);


        DetailExtraInfoDTO infoExtra = new DetailExtraInfoDTO();
        DetailExtraDTO extraDTO = new DetailExtraDTO();
        extraDTO.setExtraInfo(List.of(infoExtra));
        dto.setExtra(extraDTO);
    }

    @Test
    void testCreateInfoMenu_success() {
        // Mock tipoServicio y item
        TipoServicio tipoServicio = new TipoServicio();
        tipoServicio.setId(1L);
        Item item = new Item();
        item.setId(1L);

        when(tipoServicioRepository.findById(1L)).thenReturn(Optional.of(tipoServicio));
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));
        when(infoMenuRepository.save(any(InfoMenu.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));


        InfoMenu created = infoMenuService.createInfoMenu(dto);

        assertNotNull(created);
        assertEquals("Menu de prueba", created.getTitulo());
        assertEquals(1, created.getServicio().getItems().size());
        assertEquals(item, created.getServicio().getItems().get(0).getItem());

        verify(infoMenuRepository, times(1)).save(any(InfoMenu.class));
        verify(tipoServicioRepository, times(1)).findById(1L);
        verify(itemRepository, times(1)).findById(1L);
    }
}