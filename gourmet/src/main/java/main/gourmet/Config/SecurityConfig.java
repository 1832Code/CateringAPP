package main.gourmet.Config;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import main.gourmet.Entity.Service.CustomUserDetailsService;
import main.gourmet.Jwt.JwtAuthEntryPoint;
import main.gourmet.Jwt.JwtAuthenticationFilter;
import org.springframework.http.HttpMethod; 
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true) // Habilita la seguridad a nivel de método
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JwtAuthEntryPoint unauthorizedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Deshabilitar CSRF para APIs REST
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll() // Rutas de autenticación permitidas para todos
                        .requestMatchers("/api/items/**").permitAll() // Rutas de prueba permitidas para todos
                        .requestMatchers("/api/infomenu/**").permitAll() // Rutas de prueba permitidas para todos
                        .requestMatchers("/api/menu/**").permitAll() // Rutas de prueba permitidas para todos
                        .requestMatchers("/api/tipo-servicio/**").permitAll() // Rutas de prueba permitidas para todos
                        .requestMatchers("/api/categorias/**").permitAll() // Rutas de prueba permitidas para todos
                        .requestMatchers("/api/public/**").permitAll() // Rutas públicas si las tienes
                        .requestMatchers("/api/admin/dashboard/**").hasRole("ADMIN") // Protect admin dashboard
                        .requestMatchers("/api/v1/users/export/excel").hasRole("ADMIN") // Protect excel export
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() //
                        .requestMatchers("/api/admin/**").hasRole("ADMIN") // Rutas solo para ADMIN
                        .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN") // Rutas para USER y ADMIN
                        .anyRequest().authenticated() // Todas las demás rutas requieren autenticación
                );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Configuración CORS global
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:3000", "http://localhost:3001"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}