package com.estudios.criticos.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // algoritmo encriptar contraseñas
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // reglas de acceso
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())

                // Aplica la configuración de CORS definida abajo
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                .authorizeHttpRequests(auth -> auth
                        // El GET de noticias es público (para que cualquiera pueda leer la web)
                        .requestMatchers(HttpMethod.GET, "/api/news/**").permitAll()
                        // Permite peticiones preflight (necesarias en navegadores modernos)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Todo lo demás (POST, DELETE, etc.) pide login
                        .anyRequest().authenticated()
                )
                // Usa autenticación básica (usuario/contraseña en cabeceras HTTP)
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    // Configura los permisos para que el Front (Angular) pueda hablar con el Back
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Solo aceptamos peticiones que vengan del puerto de Angular
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));

        // Métodos permitidos para el CRUD
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Cabeceras permitidas (Authorization es clave para el login)
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));

        // Permite enviar cookies o credenciales si fuera necesario
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // Aplica estas reglas a todos los endpoints de la API
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}