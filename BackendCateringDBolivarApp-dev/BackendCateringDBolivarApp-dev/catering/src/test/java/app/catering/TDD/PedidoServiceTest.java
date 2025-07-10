package app.catering.TDD;


import app.catering.DTO.DatosEventoDTO;
import app.catering.DTO.PedidoDTO;
import app.catering.Mappers.DatosEventoMapper;
import app.catering.Mappers.InfoMenuMapper;
import app.catering.Mappers.PedidoMapper;
import app.catering.Repository.ClienteRepository;
import app.catering.Repository.PedidoRepository.InfoMenuRepository.InfoMenuRepository;
import app.catering.Repository.PedidoRepository.PedidoRepository;
import app.catering.Services.PedidoService.InfoMenuService.PedidoService;
import app.catering.Entity.Cliente;
import app.catering.Entity.Pedido.DatosEvento;
import app.catering.Entity.Pedido.InfoMenu.InfoMenu;
import app.catering.Entity.Pedido.Pedido;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PedidoServiceTest {
    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private InfoMenuRepository infoMenuRepository;

    @Mock
    private DatosEventoMapper datosEventoMapper;

    @Mock
    private InfoMenuMapper infoMenuMapper;

    @Mock
    private PedidoMapper pedidoMapper;

    @InjectMocks
    private PedidoService pedidoService;

    @Test
    void createPedido_predeterminado_deberiaGuardarCorrectamente() {
        // Arrange
        PedidoDTO dto = new PedidoDTO();
        dto.setClienteId(1L);
        dto.setInfoMenuId(2L);
        dto.setEstado("Pendiente");

        Cliente cliente = new Cliente();
        cliente.setId(1L);

        InfoMenu infoMenu = new InfoMenu();
        infoMenu.setId(2L);

        DatosEventoDTO datosEventoDTO = new DatosEventoDTO();
        dto.setDatosEvento(datosEventoDTO);

        DatosEvento datosEvento = new DatosEvento();
        datosEvento.setId(2L);

        Pedido pedido = new Pedido();
        pedido.setId(10L);

        PedidoDTO expectedDto = new PedidoDTO();
        expectedDto.setId(10L);

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));
        when(infoMenuRepository.findById(2L)).thenReturn(Optional.of(infoMenu));
        when(datosEventoMapper.toEntity(any(DatosEventoDTO.class))).thenReturn(datosEvento); // Ya tienes la variable
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);
        when(pedidoMapper.toDTO(pedido)).thenReturn(expectedDto);

        // Act
        PedidoDTO result = pedidoService.create(dto);

        // Assert
        assertEquals(10L, result.getId());
        verify(clienteRepository).findById(1L);
        verify(infoMenuRepository).findById(2L);
        verify(pedidoRepository).save(any(Pedido.class));
    }
}
