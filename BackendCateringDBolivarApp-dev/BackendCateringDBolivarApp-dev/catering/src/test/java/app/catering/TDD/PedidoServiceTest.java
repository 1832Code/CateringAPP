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

/**
 * **Clase de pruebas unitarias para
 * {@link app.catering.Services.PedidoService.InfoMenuService.PedidoService}.**
 * <p>
 * Esta clase utiliza el framework JUnit 5 para la ejecución de pruebas y
 * Mockito para
 * la creación de objetos simulados (mocks) y la verificación de interacciones.
 * El objetivo principal es asegurar que la lógica de negocio definida en
 * {@code PedidoService}
 * se comporte como se espera, aislando el servicio de sus dependencias reales
 * (repositorios y mappers) mediante el uso de mocks.
 * </p>
 * <p>
 * La anotación {@code @ExtendWith(MockitoExtension.class)} integra JUnit 5 con
 * Mockito,
 * permitiendo el uso de anotaciones como {@code @Mock} y {@code @InjectMocks}
 * para una configuración de pruebas más limpia y automatizada.
 * </p>
 * <p>
 * Se sigue el patrón Arrange-Act-Assert (AAA) en cada método de prueba para
 * estructurar claramente las fases de configuración, ejecución y verificación.
 * </p>
 *
 * @author Darwin (Asume el autor, ajusta si es necesario)
 * @version 1.0
 * @since 2023-01-15 (Asumida, ajusta si es necesario)
 * @see app.catering.Services.PedidoService.InfoMenuService.PedidoService
 * @see org.junit.jupiter.api.Test
 * @see org.mockito.Mock
 * @see org.mockito.InjectMocks
 * @see org.mockito.Mockito
 * @see org.junit.jupiter.api.extension.ExtendWith
 * @see org.mockito.junit.jupiter.MockitoExtension
 */
@ExtendWith(MockitoExtension.class)
public class PedidoServiceTest {

    /**
     * Mock del repositorio
     * {@link app.catering.Repository.PedidoRepository.PedidoRepository}.
     * <p>
     * Este mock simula el comportamiento de la capa de persistencia para las
     * entidades {@link app.catering.Entity.Pedido.Pedido}.
     * Durante las pruebas, se define qué valores debe retornar cuando se invocan
     * sus métodos,
     * y se verifica que los métodos esperados hayan sido llamados.
     * </p>
     */
    @Mock
    private PedidoRepository pedidoRepository;

    /**
     * Mock del repositorio {@link app.catering.Repository.ClienteRepository}.
     * <p>
     * Este mock simula las operaciones de acceso a datos para las entidades
     * {@link app.catering.Entity.Cliente}.
     * Es utilizado para simular la recuperación de un cliente por su ID.
     * </p>
     */
    @Mock
    private ClienteRepository clienteRepository;

    /**
     * Mock del repositorio
     * {@link app.catering.Repository.PedidoRepository.InfoMenuRepository.InfoMenuRepository}.
     * <p>
     * Este mock simula las operaciones de acceso a datos para las entidades
     * {@link app.catering.Entity.Pedido.InfoMenu.InfoMenu}.
     * Es utilizado para simular la recuperación de información de menú por su ID.
     * </p>
     */
    @Mock
    private InfoMenuRepository infoMenuRepository;

    /**
     * Mock del mapper {@link app.catering.Mappers.DatosEventoMapper}.
     * <p>
     * Este mock simula la transformación de objetos de transferencia de datos
     * (DTOs)
     * a entidades y viceversa para {@link app.catering.Entity.Pedido.DatosEvento}.
     * Es crucial para aislar la lógica del servicio de la lógica de mapeo.
     * </p>
     */
    @Mock
    private DatosEventoMapper datosEventoMapper;

    /**
     * Mock del mapper {@link app.catering.Mappers.InfoMenuMapper}.
     * <p>
     * Este mock simula la transformación de DTOs a entidades y viceversa para
     * {@link app.catering.Entity.Pedido.InfoMenu.InfoMenu}.
     * </p>
     */
    @Mock
    private InfoMenuMapper infoMenuMapper;

    /**
     * Mock del mapper {@link app.catering.Mappers.PedidoMapper}.
     * <p>
     * Este mock simula la transformación de {@link app.catering.DTO.PedidoDTO}
     * a {@link app.catering.Entity.Pedido.Pedido} y viceversa. Es fundamental
     * para verificar que el servicio convierte correctamente los datos entre
     * las capas.
     * </p>
     */
    @Mock
    private PedidoMapper pedidoMapper;

    /**
     * Instancia del servicio
     * {@link app.catering.Services.PedidoService.InfoMenuService.PedidoService}
     * que se va a probar.
     * <p>
     * La anotación {@code @InjectMocks} de Mockito inyecta automáticamente los
     * mocks
     * declarados en esta clase ({@code pedidoRepository},
     * {@code clienteRepository}, etc.)
     * en las dependencias del {@code PedidoService} durante la inicialización de la
     * prueba.
     * </p>
     */
    @InjectMocks
    private PedidoService pedidoService;

    /**
     * **Prueba unitaria para el método {@code create} de
     * {@link app.catering.Services.PedidoService.InfoMenuService.PedidoService}.**
     * <p>
     * Este test verifica que el método {@code create} del servicio de pedidos
     * guarda correctamente un nuevo pedido cuando se le proporciona un
     * {@link app.catering.DTO.PedidoDTO}
     * con datos predeterminados y que todas las interacciones con los mocks son las
     * esperadas.
     * </p>
     * <p>
     * **Fases de la Prueba (Arrange-Act-Assert):**
     * <ol>
     * <li>**Arrange (Configuración):**
     * <ul>
     * <li>Se crea un objeto {@link app.catering.DTO.PedidoDTO} de entrada con datos
     * simulados,
     * incluyendo un ID de cliente y un ID de menú de información.</li>
     * <li>Se crean objetos entidad simulados ({@link app.catering.Entity.Cliente},
     * {@link app.catering.Entity.Pedido.InfoMenu.InfoMenu},
     * {@link app.catering.Entity.Pedido.DatosEvento},
     * {@link app.catering.Entity.Pedido.Pedido}) que representan los datos
     * que serían recuperados o guardados.</li>
     * <li>Se configuran los comportamientos de los mocks utilizando
     * {@code Mockito.when()}:
     * <ul>
     * <li>{@code clienteRepository.findById(1L)}: Simula la búsqueda de un cliente
     * por ID.</li>
     * <li>{@code infoMenuRepository.findById(2L)}: Simula la búsqueda de
     * información de menú por ID.</li>
     * <li>{@code datosEventoMapper.toEntity(any(DatosEventoDTO.class))}: Simula la
     * conversión de DTO a entidad para DatosEvento.
     * Se usa {@code any(DatosEventoDTO.class)} para indicar que cualquier instancia
     * de {@code DatosEventoDTO} es aceptable.</li>
     * <li>{@code pedidoRepository.save(any(Pedido.class))}: Simula el guardado de
     * un pedido en la base de datos.
     * Retorna una instancia de {@link app.catering.Entity.Pedido.Pedido} con un ID
     * asignado.</li>
     * <li>{@code pedidoMapper.toDTO(pedido)}: Simula la conversión de la entidad
     * {@link app.catering.Entity.Pedido.Pedido}
     * guardada de vuelta a un {@link app.catering.DTO.PedidoDTO} para el retorno
     * del servicio.</li>
     * </ul>
     * </li>
     * </ul>
     * </li>
     * <li>**Act (Ejecución):**
     * <ul>
     * <li>Se invoca el método {@code create} del servicio bajo prueba
     * ({@code pedidoService})
     * con el {@link app.catering.DTO.PedidoDTO} preparado.</li>
     * </ul>
     * </li>
     * <li>**Assert (Verificación):**
     * <ul>
     * <li>Se verifica el resultado retornado por el servicio utilizando
     * {@code assertEquals}
     * para asegurar que el ID del DTO resultante sea el esperado (10L).</li>
     * <li>Se verifican las interacciones con los mocks utilizando
     * {@code Mockito.verify()}:
     * <ul>
     * <li>{@code verify(clienteRepository).findById(1L)}: Confirma que el método
     * {@code findById}
     * del {@code clienteRepository} fue llamado exactamente una vez con el ID
     * 1L.</li>
     * <li>{@code verify(infoMenuRepository).findById(2L)}: Confirma que el método
     * {@code findById}
     * del {@code infoMenuRepository} fue llamado exactamente una vez con el ID
     * 2L.</li>
     * <li>{@code verify(pedidoRepository).save(any(Pedido.class))}: Confirma que el
     * método {@code save}
     * del {@code pedidoRepository} fue llamado exactamente una vez con cualquier
     * instancia de {@link app.catering.Entity.Pedido.Pedido}.</li>
     * </ul>
     * </li>
     * </ul>
     * </li>
     * </ol>
     * </p>
     */
    @Test
    void createPedido_predeterminado_deberiaGuardarCorrectamente() {
        // Arrange: Configuración de los datos de entrada y el comportamiento de los
        // mocks.

        // 1. Datos de entrada para el servicio: PedidoDTO
        PedidoDTO dto = new PedidoDTO();
        dto.setClienteId(1L); // ID del cliente asociado al pedido
        dto.setInfoMenuId(2L); // ID de la información del menú asociada al pedido
        dto.setEstado("Pendiente"); // Estado inicial del pedido

        // 2. Entidades simuladas que serían recuperadas de los repositorios o creadas
        // Simulación de un objeto Cliente que sería encontrado por
        // clienteRepository.findById()
        Cliente cliente = new Cliente();
        cliente.setId(1L);

        // Simulación de un objeto InfoMenu que sería encontrado por
        // infoMenuRepository.findById()
        InfoMenu infoMenu = new InfoMenu();
        infoMenu.setId(2L);

        // Simulación de un DatosEventoDTO de entrada (parte del PedidoDTO)
        DatosEventoDTO datosEventoDTO = new DatosEventoDTO();
        // Aquí podrías configurar más propiedades de datosEventoDTO si fueran
        // relevantes para la lógica de mapeo o validación
        dto.setDatosEvento(datosEventoDTO); // Asocia el DTO de datos de evento al PedidoDTO

        // Simulación de un objeto DatosEvento que sería el resultado del mapeo de
        // datosEventoMapper.toEntity()
        DatosEvento datosEvento = new DatosEvento();
        datosEvento.setId(2L); // Asigna un ID simulado al DatosEvento

        // Simulación de un objeto Pedido que sería el resultado de
        // pedidoRepository.save()
        Pedido pedido = new Pedido();
        pedido.setId(10L); // Asigna un ID simulado al Pedido guardado

        // Simulación de un PedidoDTO esperado como resultado del servicio
        PedidoDTO expectedDto = new PedidoDTO();
        expectedDto.setId(10L); // El ID esperado del DTO de salida

        // 3. Configuración del comportamiento de los mocks (When-ThenReturn)
        // Cuando clienteRepository.findById(1L) es llamado, retorna un Optional que
        // contiene el cliente simulado.
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));
        // Cuando infoMenuRepository.findById(2L) es llamado, retorna un Optional que
        // contiene la infoMenu simulada.
        when(infoMenuRepository.findById(2L)).thenReturn(Optional.of(infoMenu));
        // Cuando datosEventoMapper.toEntity() es llamado con cualquier DatosEventoDTO,
        // retorna el datosEvento simulado.
        when(datosEventoMapper.toEntity(any(DatosEventoDTO.class))).thenReturn(datosEvento);
        // Cuando pedidoRepository.save() es llamado con cualquier Pedido, retorna el
        // pedido simulado con ID.
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);
        // Cuando pedidoMapper.toDTO() es llamado con el pedido simulado, retorna el
        // expectedDto.
        when(pedidoMapper.toDTO(pedido)).thenReturn(expectedDto);

        // Act: Ejecución del método del servicio que se está probando.
        // Se llama al método create del servicio de pedidos con el DTO de entrada.
        PedidoDTO result = pedidoService.create(dto);

        // Assert: Verificación de los resultados y las interacciones con los mocks.

        // 1. Verificación del resultado: Asegura que el ID del DTO retornado sea el
        // esperado.
        assertEquals(10L, result.getId(), "El ID del pedido retornado debería ser 10L.");

        // 2. Verificación de interacciones con mocks: Asegura que los métodos esperados
        // fueron llamados.
        // Verifica que clienteRepository.findById(1L) fue llamado exactamente una vez.
        verify(clienteRepository).findById(1L);
        // Verifica que infoMenuRepository.findById(2L) fue llamado exactamente una vez.
        verify(infoMenuRepository).findById(2L);
        // Verifica que pedidoRepository.save() fue llamado exactamente una vez con
        // cualquier instancia de Pedido.
        verify(pedidoRepository).save(any(Pedido.class));

        // Puedes añadir más verificaciones si la lógica del servicio es más compleja,
        // por ejemplo:
        // verify(datosEventoMapper).toEntity(dto.getDatosEvento()); // Verificar que el
        // mapper fue llamado con el DTO correcto
        // verify(pedidoMapper).toDTO(pedido); // Verificar que el mapper de Pedido fue
        // llamado para la conversión final
    }
}