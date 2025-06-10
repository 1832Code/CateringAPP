package app.catering.TDD;

import app.catering.Repository.PedidoRepository.DatosEventoRepository;
import app.catering.Services.PedidoService.InfoMenuService.DatosEventoService;
import app.catering.Users.Pedido.DatosEvento;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DatosEventoServiceTest {

    private DatosEventoRepository datosEventoRepository;
    private DatosEventoService datosEventoService;

    @BeforeEach
    void setUp() {
        datosEventoRepository = mock(DatosEventoRepository.class);
        datosEventoService = new DatosEventoService();
        datosEventoService.datosEventoRepository = datosEventoRepository;
    }

    private DatosEvento buildEvento(Long id) {
        DatosEvento evento = new DatosEvento();
        evento.setId(id);
        evento.setTipoEvento("Boda");
        evento.setDireccion("Av. Primavera 123");
        evento.setDistrito("Surco");
        evento.setHoraInicio(LocalTime.of(18, 0));
        evento.setFechaEvento(LocalDate.of(2025, 7, 15));
        evento.setCantHorasEvento(5);
        return evento;
    }

    @Test
    void testSave() {
        DatosEvento evento = buildEvento(null);
        DatosEvento savedEvento = buildEvento(1L);

        when(datosEventoRepository.save(evento)).thenReturn(savedEvento);

        DatosEvento result = datosEventoService.save(evento);
        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(datosEventoRepository, times(1)).save(evento);
    }

    @Test
    void testGetAll() {
        DatosEvento e1 = buildEvento(1L);
        DatosEvento e2 = buildEvento(2L);
        when(datosEventoRepository.findAll()).thenReturn(Arrays.asList(e1, e2));

        List<DatosEvento> result = datosEventoService.getAll();
        assertEquals(2, result.size());
        verify(datosEventoRepository, times(1)).findAll();
    }

    @Test
    void testGetByIdExists() {
        DatosEvento evento = buildEvento(1L);
        when(datosEventoRepository.findById(1L)).thenReturn(Optional.of(evento));

        Optional<DatosEvento> result = datosEventoService.getById(1L);
        assertTrue(result.isPresent());
        assertEquals("Boda", result.get().getTipoEvento());
        verify(datosEventoRepository, times(1)).findById(1L);
    }

    @Test
    void testGetByIdNotFound() {
        when(datosEventoRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<DatosEvento> result = datosEventoService.getById(999L);
        assertFalse(result.isPresent());
        verify(datosEventoRepository, times(1)).findById(999L);
    }

    @Test
    void testUpdateExists() {
        DatosEvento existing = buildEvento(1L);
        DatosEvento updatedData = buildEvento(null);
        updatedData.setTipoEvento("Cumpleaños");

        when(datosEventoRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(datosEventoRepository.save(any())).thenReturn(existing);

        DatosEvento result = datosEventoService.update(1L, updatedData);
        assertNotNull(result);
        assertEquals("Cumpleaños", result.getTipoEvento());
        verify(datosEventoRepository, times(1)).findById(1L);
        verify(datosEventoRepository, times(1)).save(existing);
    }

    @Test
    void testUpdateNotFound() {
        DatosEvento updatedData = buildEvento(null);
        when(datosEventoRepository.findById(999L)).thenReturn(Optional.empty());

        DatosEvento result = datosEventoService.update(999L, updatedData);
        assertNull(result);
        verify(datosEventoRepository, times(1)).findById(999L);
        verify(datosEventoRepository, never()).save(any());
    }

    @Test
    void testDeleteExists() {
        when(datosEventoRepository.existsById(1L)).thenReturn(true);
        doNothing().when(datosEventoRepository).deleteById(1L);

        boolean result = datosEventoService.delete(1L);
        assertTrue(result);
        verify(datosEventoRepository, times(1)).existsById(1L);
        verify(datosEventoRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteNotFound() {
        when(datosEventoRepository.existsById(999L)).thenReturn(false);

        boolean result = datosEventoService.delete(999L);
        assertFalse(result);
        verify(datosEventoRepository, times(1)).existsById(999L);
        verify(datosEventoRepository, never()).deleteById(anyLong());
    }
}