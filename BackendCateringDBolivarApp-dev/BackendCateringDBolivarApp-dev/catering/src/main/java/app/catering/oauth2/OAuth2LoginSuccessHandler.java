package app.catering.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional; // Import para Optional

/**
 * **Manejador de éxito de autenticación para el flujo OAuth2 en la aplicación
 * de catering.**
 * <p>
 * Esta clase {@code @Component} implementa la interfaz
 * {@link org.springframework.security.web.authentication.AuthenticationSuccessHandler}
 * de Spring Security. Su función principal es gestionar las acciones que deben
 * realizarse
 * inmediatamente después de que un usuario ha sido autenticado exitosamente a
 * través de
 * un proveedor OAuth2 (como Google, Facebook, etc.).
 * </p>
 * <p>
 * A diferencia del {@link OAuth2LoginFailureHandler}, este manejador se activa
 * cuando
 * el proceso de autenticación ha culminado sin errores y Spring Security ha
 * validado
 * la identidad del usuario con el proveedor externo.
 * </p>
 * <p>
 * Las responsabilidades clave de esta implementación incluyen:
 * <ol>
 * <li>**Extracción de Datos del Usuario:** Obtener información relevante del
 * usuario
 * (como nombre, email) del objeto
 * {@link org.springframework.security.core.Authentication}.</li>
 * <li>**Generación de Tokens (Simulada):** En un entorno de producción, aquí se
 * generaría
 * un token de sesión (por ejemplo, un JWT) para mantener la sesión del usuario
 * en el frontend
 * o para futuras llamadas a la API. En este ejemplo, se utiliza un token
 * simulado.</li>
 * <li>**Redirección al Frontend:** Construir una URL de redirección que incluya
 * los datos
 * del usuario y el token, y enviar al usuario de vuelta a una página específica
 * del frontend para completar el proceso de inicio de sesión en el lado del
 * cliente.</li>
 * </ol>
 * </p>
 * <p>
 * Es crucial que los datos sensibles, como los tokens, se manejen de forma
 * segura
 * y que las URLs de redirección sean configurables y seguras en un entorno de
 * producción.
 * </p>
 *
 * @author Darwin (Asume el autor, ajusta si es necesario)
 * @version 1.0
 * @since 2023-01-15 (Asumida, ajusta si es necesario)
 * @see org.springframework.security.web.authentication.AuthenticationSuccessHandler
 * @see org.springframework.security.core.Authentication
 * @see org.springframework.security.oauth2.core.user.DefaultOAuth2User
 * @see java.net.URLEncoder
 * @see java.nio.charset.StandardCharsets
 */
@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    /**
     * **Maneja el éxito de la autenticación en el flujo de inicio de sesión
     * OAuth2.**
     * <p>
     * Este método es invocado por Spring Security cuando un usuario se ha
     * autenticado
     * exitosamente a través de un proveedor OAuth2. Su propósito es extraer la
     * información
     * del usuario autenticado, generar un token de sesión (simulado en este caso)
     * y redirigir al usuario de vuelta al frontend con los datos necesarios.
     * </p>
     * <p>
     * **Flujo de Ejecución Detallado:**
     * <ol>
     * <li>**Obtención del Principal Autenticado:**
     * Se accede al objeto {@link org.springframework.security.core.Authentication}
     * para obtener el {@code principal} autenticado. Para usuarios OAuth2,
     * este principal suele ser una instancia de
     * {@link org.springframework.security.oauth2.core.user.DefaultOAuth2User},
     * que contiene los atributos del usuario proporcionados por el proveedor OAuth2
     * (e.g., Google).
     * 
     * <pre>{@code
     * var principal = (org.springframework.security.oauth2.core.user.DefaultOAuth2User) authentication.getPrincipal();
     * }</pre>
     * 
     * </li>
     * <li>**Extracción de Atributos del Usuario:**
     * Se extraen atributos específicos como el nombre (`name`) y el correo
     * electrónico (`email`)
     * del objeto `principal`. Estos atributos son proporcionados por el proveedor
     * OAuth2.
     * Se realiza una división del correo electrónico para obtener un "nombre de
     * usuario" simple.
     * El apellido se establece como un valor por defecto ("LastName") ya que los
     * proveedores
     * OAuth2 no siempre proporcionan el apellido de forma separada en el atributo
     * `name`.
     * 
     * <pre>{@code
     * String nombres = (String) principal.getAttribute("name");
     * String email = (String) principal.getAttribute("email");
     * String nombreUsuario = email.split("@")[0];
     * String apellidos = "LastName"; // Lógica para separar nombres/apellidos puede ser más compleja
     * }</pre>
     * 
     * **Consideraciones para Producción:**
     * <ul>
     * <li>**Manejo de Atributos Nulos:** Los atributos como "name" o "email" pueden
     * ser nulos
     * si el proveedor OAuth2 no los proporciona o si el usuario no dio permiso.
     * Se recomienda usar {@link java.util.Optional} o verificaciones de
     * nulidad.</li>
     * <li>**Separación de Nombres/Apellidos:** La extracción de nombres y apellidos
     * del atributo "name" puede ser compleja y variar entre proveedores.
     * A menudo, se requiere lógica adicional o el uso de otros atributos si están
     * disponibles.</li>
     * <li>**Persistencia de Usuario:** En una aplicación real, en este punto se
     * verificaría
     * si el usuario ya existe en la base de datos de la aplicación. Si no existe,
     * se crearía un nuevo registro de usuario con la información obtenida de
     * OAuth2.</li>
     * </ul>
     * </li>
     * <li>**Simulación de Generación de Token JWT:**
     * Se simula la generación de un token JWT asignando una cadena simple.
     * 
     * <pre>{@code
     * String token = "ejemplo_token";
     * }</pre>
     * 
     * **Consideraciones para Producción:**
     * <ul>
     * <li>**Generación de JWT Real:** En un entorno de producción, este "token"
     * sería un JSON Web Token (JWT) firmado, que contendría información
     * sobre el usuario y su sesión. Se utilizarían librerías como JJWT
     * para generar y firmar el token de forma segura.</li>
     * <li>**Seguridad del Token:** El token debe ser generado de forma segura,
     * con una clave secreta robusta y una expiración adecuada.</li>
     * </ul>
     * </li>
     * <li>**Codificación de Parámetros de URL:**
     * Todos los parámetros que se van a pasar en la URL de redirección
     * se codifican utilizando {@link java.net.URLEncoder} con
     * {@link java.nio.charset.StandardCharsets#UTF_8}.
     * Esto es crucial para asegurar que caracteres especiales y espacios
     * sean transmitidos correctamente en la URL.
     * 
     * <pre>{@code
     * +"?token=" + URLEncoder.encode(token, StandardCharsets.UTF_8)
     * // ... otros parámetros
     * }</pre>
     * 
     * </li>
     * <li>**Construcción de la URL de Redirección:**
     * Se construye la URL completa a la que el navegador del usuario será
     * redirigido.
     * Esta URL apunta a una ruta específica en el frontend
     * (`http://localhost:3000/oauth2`)
     * y adjunta los datos del usuario y el token como parámetros de consulta.
     * 
     * <pre>{@code
     * String redirectUrl = "http://localhost:3000/oauth2"
     * // ... construcción de la URL
     * }</pre>
     * 
     * **Consideraciones para Producción:**
     * <ul>
     * <li>**URL Configurable:** La URL base del frontend (`http://localhost:3000`)
     * debe ser configurable (e.g., a través de `application.properties` en Spring)
     * para adaptarse a diferentes entornos (desarrollo, staging, producción).</li>
     * <li>**Seguridad de Redirección:** Asegurarse de que la URL de redirección
     * esté en una lista blanca si es posible, para prevenir ataques de
     * redirección abierta.</li>
     * </ul>
     * </li>
     * <li>**Redirección al Frontend:**
     * Finalmente, se envía la respuesta de redirección al cliente. El navegador
     * del usuario navegará a la `redirectUrl` construida, donde el frontend
     * puede leer los parámetros de la URL para completar el inicio de sesión
     * (e.g., almacenar el token en el almacenamiento local y redirigir al usuario
     * a la página principal de la aplicación).
     * 
     * <pre>{@code
     * response.sendRedirect(redirectUrl);
     * }</pre>
     * 
     * </li>
     * </ol>
     * </p>
     *
     * @param request        El objeto
     *                       {@link jakarta.servlet.http.HttpServletRequest} que
     *                       representa
     *                       la solicitud HTTP entrante.
     * @param response       El objeto
     *                       {@link jakarta.servlet.http.HttpServletResponse} que se
     *                       utiliza
     *                       para enviar la respuesta HTTP (en este caso, una
     *                       redirección) al cliente.
     * @param authentication El objeto
     *                       {@link org.springframework.security.core.Authentication}
     *                       que
     *                       contiene los detalles del usuario autenticado
     *                       exitosamente.
     * @throws IOException      Si ocurre un error de entrada/salida durante la
     *                          redirección.
     * @throws ServletException Si ocurre un error específico del servlet durante el
     *                          manejo de la solicitud.
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        // Paso 1: Obtener el principal autenticado.
        // Se asume que el principal es una instancia de DefaultOAuth2User, que es común
        // para OAuth2.
        // Este objeto contiene los atributos del usuario proporcionados por el
        // proveedor OAuth2 (e.g., Google).
        var principal = (DefaultOAuth2User) authentication.getPrincipal();

        // Paso 2: Extraer atributos del usuario del principal.
        // Se obtienen los nombres y el correo electrónico.
        // Se utiliza Optional.ofNullable para manejar el caso donde un atributo podría
        // ser nulo,
        // proporcionando un valor por defecto para evitar NullPointerExceptions.
        String nombres = Optional.ofNullable((String) principal.getAttribute("name")).orElse("N/A");
        String email = Optional.ofNullable((String) principal.getAttribute("email")).orElse("N/A");

        // Se deriva un "nombre de usuario" simple del correo electrónico.
        // En un sistema real, el nombre de usuario podría ser un campo persistente en
        // la base de datos.
        String nombreUsuario = email.contains("@") ? email.split("@")[0] : email;

        // Los apellidos no siempre se proporcionan de forma separada por los
        // proveedores OAuth2.
        // Aquí se establece un valor por defecto. En una aplicación real, se podría:
        // - Intentar parsear los 'nombres' para separar nombre y apellido.
        // - Pedir al usuario que complete esta información después del primer login
        // OAuth2.
        String apellidos = "LastName"; // Valor por defecto.

        // Paso 3: Simular la generación de un token de sesión.
        // En una aplicación de producción, este sería el punto donde se generaría un
        // JSON Web Token (JWT) real. Este JWT contendría la identidad del usuario,
        // roles y otra información relevante, y estaría firmado criptográficamente.
        // El frontend usaría este JWT para autenticarse en futuras solicitudes a la
        // API.
        String token = "ejemplo_token_simulado_para_demostracion"; // ¡Reemplazar con generación de JWT real!

        // Paso 4: Codificar los parámetros de la URL.
        // Es fundamental codificar los valores de los parámetros para asegurar que
        // caracteres especiales (como espacios, @, etc.) se transmitan correctamente
        // en la URL sin causar errores o interpretaciones incorrectas.
        String encodedToken = URLEncoder.encode(token, StandardCharsets.UTF_8);
        String encodedNombreUsuario = URLEncoder.encode(nombreUsuario, StandardCharsets.UTF_8);
        String encodedNombres = URLEncoder.encode(nombres, StandardCharsets.UTF_8);
        String encodedApellidos = URLEncoder.encode(apellidos, StandardCharsets.UTF_8);
        String encodedEmail = URLEncoder.encode(email, StandardCharsets.UTF_8);

        // Paso 5: Construir la URL de redirección al frontend.
        // Esta URL es la página del frontend a la que el usuario será enviado
        // después de una autenticación OAuth2 exitosa. Los parámetros de consulta
        // contienen la información que el frontend necesita para establecer la sesión.
        // En un entorno de producción, la URL base (http://localhost:3000) debería
        // ser configurable (e.g., a través de propiedades de Spring) para adaptarse
        // a diferentes entornos de despliegue.
        String redirectUrl = "http://localhost:3000/oauth2"
                + "?token=" + encodedToken
                + "&nombreUsuario=" + encodedNombreUsuario
                + "&nombres=" + encodedNombres
                + "&apellidos=" + encodedApellidos
                + "&email=" + encodedEmail;

        // Paso 6: Realizar la redirección HTTP.
        // El navegador del cliente es instruido para navegar a la URL construida.
        // El frontend en esa URL (`/oauth2`) será responsable de leer estos parámetros
        // de la URL, procesar el token (e.g., almacenarlo en
        // localStorage/sessionStorage),
        // y luego redirigir al usuario a la página principal de la aplicación.
        response.sendRedirect(redirectUrl);
    }
}