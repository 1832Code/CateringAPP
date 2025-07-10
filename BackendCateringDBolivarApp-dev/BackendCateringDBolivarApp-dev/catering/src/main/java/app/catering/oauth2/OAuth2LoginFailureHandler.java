package app.catering.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * **Manejador de fallos de autenticación para el flujo OAuth2 en la aplicación
 * de catering.**
 * <p>
 * Esta clase {@code @Component} implementa la interfaz
 * {@link org.springframework.security.web.authentication.AuthenticationFailureHandler}
 * de Spring Security. Su propósito principal es interceptar y gestionar los
 * errores que ocurren
 * durante el proceso de autenticación OAuth2 (por ejemplo, al iniciar sesión
 * con Google, Facebook, etc.).
 * </p>
 * <p>
 * Cuando un intento de autenticación OAuth2 falla por cualquier razón
 * (credenciales incorrectas,
 * proveedor de OAuth2 no disponible, problemas de configuración, etc.), Spring
 * Security
 * delega el manejo de este fallo a la implementación de esta interfaz.
 * </p>
 * <p>
 * En esta implementación específica, el manejador registra la excepción del
 * fallo
 * (imprimiendo la traza de la pila) y redirige al usuario a una URL de error
 * predefinida
 * en el frontend de la aplicación, pasando el mensaje de la excepción como
 * parámetro.
 * Esto permite que el frontend muestre un mensaje de error apropiado al
 * usuario.
 * </p>
 *
 * @author Darwin (Asume el autor, ajusta si es necesario)
 * @version 1.0
 * @since 2023-01-15 (Asumida, ajusta si es necesario)
 * @see org.springframework.security.web.authentication.AuthenticationFailureHandler
 * @see org.springframework.security.core.AuthenticationException
 * @see org.springframework.security.config.annotation.web.builders.HttpSecurity
 */
@Component
public class OAuth2LoginFailureHandler implements AuthenticationFailureHandler {

    /**
     * **Maneja los fallos de autenticación en el flujo de inicio de sesión
     * OAuth2.**
     * <p>
     * Este método es invocado por Spring Security cuando un intento de
     * autenticación
     * OAuth2 no es exitoso. Contiene la lógica para procesar la excepción de
     * autenticación
     * y redirigir al usuario a una página de error en el frontend.
     * </p>
     * <p>
     * Los pasos que realiza este método son:
     * <ol>
     * <li>**Registro de la Excepción:** Imprime la traza de la pila de la
     * {@code AuthenticationException}
     * en la consola del servidor. En un entorno de producción, esto debería ser
     * reemplazado
     * por un sistema de logging más robusto (e.g., SLF4J con Logback/Log4j) para
     * evitar
     * exponer información sensible y para una gestión centralizada de logs.</li>
     * <li>**Redirección al Frontend:** Envía una redirección HTTP al cliente
     * (navegador del usuario)
     * para llevarlo a la página de inicio de sesión del frontend (asumido en
     * `http://localhost:3000/login`).
     * Se adjunta un parámetro de consulta `error` que contiene el mensaje de la
     * excepción
     * para que el frontend pueda mostrar un mensaje descriptivo al usuario.</li>
     * </ol>
     * </p>
     *
     * @param request   El objeto {@link jakarta.servlet.http.HttpServletRequest}
     *                  que representa
     *                  la solicitud HTTP que causó el fallo de autenticación.
     *                  Contiene información
     *                  sobre la solicitud del cliente.
     * @param response  El objeto {@link jakarta.servlet.http.HttpServletResponse}
     *                  que se utiliza
     *                  para enviar la respuesta HTTP al cliente, en este caso, una
     *                  redirección.
     * @param exception La
     *                  {@link org.springframework.security.core.AuthenticationException}
     *                  que
     *                  describe la causa del fallo de autenticación. Contiene
     *                  detalles sobre el error.
     * @throws IOException      Si ocurre un error de entrada/salida durante la
     *                          redirección.
     * @throws ServletException Si ocurre un error específico del servlet durante el
     *                          manejo de la solicitud.
     */
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
        // En un entorno de producción, se recomienda usar un logger (e.g., SLF4J)
        // en lugar de exception.printStackTrace() para un manejo de logs más robusto.
        // Ejemplo: private static final Logger logger =
        // LoggerFactory.getLogger(OAuth2LoginFailureHandler.class);
        // logger.error("OAuth2 authentication failed: {}", exception.getMessage(),
        // exception);
        exception.printStackTrace(); // Imprime la traza de la pila en la consola del servidor para depuración.

        // Redirige al usuario a la página de inicio de sesión del frontend,
        // pasando el mensaje de error como un parámetro de consulta.
        // Esto permite que el frontend muestre un mensaje de error específico al
        // usuario.
        // Nota: 'http://localhost:3000/login' debe ser la URL de tu página de inicio de
        // sesión en el frontend.
        // En un entorno de producción, esta URL debería ser configurable (e.g., desde
        // application.properties).
        response.sendRedirect("http://localhost:3000/login?error=" + exception.getMessage());
    }
}