package app.catering.config;

import java.util.Arrays;

import app.catering.JWT.JwtAuthenticationFilter;
import app.catering.Services.CustomUserDetailService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import app.catering.oauth2.OAuth2LoginFailureHandler;
import app.catering.oauth2.OAuth2LoginSuccessHandler;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class securityConfig {

    // Manejador cuando falla login con OAuth2
    @Autowired
    private OAuth2LoginFailureHandler oAuth2LoginFailureHandler;

    // Manejador cuando login OAuth2 es exitoso
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler = new OAuth2LoginSuccessHandler();

    // Filtro JWT personalizado para validar tokens
    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    /**
     * Define la cadena de filtros de seguridad.
     * Configura:
     * - rutas públicas y protegidas
     * - manejo de sesiones
     * - OAuth2 login
     * - CORS
     * - deshabilita CSRF, formLogin y httpBasic
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable) // Desactiva CSRF (porque usamos JWT)
                .authorizeHttpRequests(auth -> auth
                        // Rutas públicas
                        .requestMatchers(
                                "/api/auth/register",
                                "/api/auth/login",
                                "api/auth/logout",
                                "api/auth/verify",
                                "/api/infomenu/predeterminados",
                                "/api/items/**",
                                "/api/tipo-servicio/**",
                                "/api/categorias/**",
                                "/api/datos-evento/**",
                                "/prueba"
                        ).permitAll()

                        .requestMatchers("/api/infomenu/predeterminados").anonymous()

                        // Rutas protegidas
                        .requestMatchers(HttpMethod.GET, "/api/infomenu/**").permitAll() // GET de infomenú accesible
                        .requestMatchers(HttpMethod.POST, "/api/infomenu/**").hasRole("ADMIN") // POST solo para ADMIN
                        .requestMatchers(HttpMethod.PUT, "/api/infomenu/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/infomenu/**").hasRole("ADMIN")
                        .requestMatchers("/api/auth/me").authenticated()
                        .requestMatchers("/api/pedidos/**").authenticated() // requiere login
                        .requestMatchers("/api/pedidos/*/reporte").hasRole("ADMIN")
                        .requestMatchers("/api/export/**").hasRole("ADMIN")
                        .requestMatchers("/api/usuarios/me").authenticated()
                        .requestMatchers("/api/admin/**", "/api/admins/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                // Manejo de sesión sin estado (stateless, para JWT)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Añade el filtro JWT antes del filtro de usuario/contraseña
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                // Configuración de OAuth2 login
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oAuth2LoginSuccessHandler)
                        .failureHandler(oAuth2LoginFailureHandler)
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // habilita CORS
                .formLogin(form -> form.disable()) // desactiva formLogin clásico
                .httpBasic(basic -> basic.disable()) // desactiva httpBasic
                .build();
    }

    /**
     * Configuración global de CORS.
     * Permite peticiones desde `localhost:3000` y `localhost:3001`
     * con cualquier metodo y cabecera, y permite credenciales (cookies, etc.)
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList(
                "http://localhost:3000",
                "http://localhost:3001"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}