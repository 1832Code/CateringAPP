package app.catering.TDD;

import app.catering.Repository.PedidoRepository.InfoMenuRepository.TipoServicioRepository;
import app.catering.Services.PedidoService.InfoMenuService.TipoServicioService;
import app.catering.Users.Pedido.InfoMenu.TipoServicio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TipoServicioServiceTest {
    @InjectMocks
    private TipoServicioService tipoServicioService;

    @Mock
    private TipoServicioRepository tipoServicioRepository;

    private TipoServicio tipo1;
    private TipoServicio tipo2;

    @BeforeEach
    void setUp() {
        tipo1 = new TipoServicio();
        tipo1.setId(1L);
        tipo1.setNombre("Buffet");
        tipo1.setDescripcion("Es un tipo de servicio de alta calidad en la gastronomía, que se centra en la excelencia culinaria, la presentación impecable y la experiencia del cliente.");

        tipo2 = new TipoServicio();
        tipo2.setId(2L);
        tipo2.setNombre("Gourmet");
        tipo2.setDescripcion("Es un tipo de servicio de comida en el que los comensales se sirven a sí mismos de una amplia variedad de platillos que se exhiben en una mesa o área de servicio.");
    }

    @Test
    void testGetAll() {
        when(tipoServicioRepository.findAll()).thenReturn(Arrays.asList(tipo1, tipo2));

        List<TipoServicio> result = tipoServicioService.getAll();

        assertEquals(2, result.size());
        verify(tipoServicioRepository, times(1)).findAll();
    }

    @Test
    void testSave() {
        when(tipoServicioRepository.save(tipo1)).thenReturn(tipo1);

        TipoServicio saved = tipoServicioService.save(tipo1);

        assertNotNull(saved);
        assertEquals("Buffet", saved.getNombre());
        verify(tipoServicioRepository, times(1)).save(tipo1);
    }

    @Test
    void testGetById_found() {
        when(tipoServicioRepository.findById(1L)).thenReturn(Optional.of(tipo1));

        Optional<TipoServicio> result = tipoServicioService.getById(1L);

        assertTrue(result.isPresent());
        assertEquals("Buffet", result.get().getNombre());
        verify(tipoServicioRepository, times(1)).findById(1L);
    }

    @Test
    void testGetById_notFound() {
        when(tipoServicioRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<TipoServicio> result = tipoServicioService.getById(99L);

        assertFalse(result.isPresent());
        verify(tipoServicioRepository, times(1)).findById(99L);
    }

    @Test
    void testDelete_success() {
        when(tipoServicioRepository.existsById(1L)).thenReturn(true);

        boolean deleted = tipoServicioService.delete(1L);

        assertTrue(deleted);
        verify(tipoServicioRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDelete_failure() {
        when(tipoServicioRepository.existsById(99L)).thenReturn(false);

        boolean deleted = tipoServicioService.delete(99L);

        assertFalse(deleted);
        verify(tipoServicioRepository, never()).deleteById(anyLong());
    }

    @Test
    void testUpdate_success() {
        TipoServicio updatedData = new TipoServicio();
        updatedData.setNombre("Plato Servido");

        when(tipoServicioRepository.findById(1L)).thenReturn(Optional.of(tipo1));
        when(tipoServicioRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        TipoServicio result = tipoServicioService.update(1L, updatedData);

        assertNotNull(result);
        assertEquals("Plato Servido", result.getNombre());
        verify(tipoServicioRepository, times(1)).save(tipo1);
    }

    @Test
    void testUpdate_notFound() {
        TipoServicio updatedData = new TipoServicio();
        updatedData.setNombre("Plato Servido");

        when(tipoServicioRepository.findById(99L)).thenReturn(Optional.empty());

        TipoServicio result = tipoServicioService.update(99L, updatedData);

        assertNull(result);
        verify(tipoServicioRepository, never()).save(any());
    }
}
