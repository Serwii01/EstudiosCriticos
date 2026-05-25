package com.estudios.criticos.backend.config;

import com.estudios.criticos.backend.model.Assembly;
import com.estudios.criticos.backend.model.User;
import com.estudios.criticos.backend.repository.AssemblyRepository;
import com.estudios.criticos.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    // En Railway: añade ADMIN_USERNAME y ADMIN_PASSWORD en Settings → Variables
    // En local: se usan los valores por defecto (solo para desarrollo)
    @Value("${ADMIN_USERNAME:admin}")
    private String adminUsername;

    @Value("${ADMIN_PASSWORD:eecc-local-dev}")
    private String adminPassword;

    @Bean
    CommandLineRunner initDatabase(
            UserRepository userRepository,
            AssemblyRepository assemblyRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Usuario admin — credenciales leídas desde variables de entorno
            if (userRepository.findByUsername(adminUsername).isEmpty()) {
                User admin = new User();
                admin.setUsername(adminUsername);
                admin.setPassword(passwordEncoder.encode(adminPassword));
                admin.setRole("ADMIN");
                userRepository.save(admin);
                System.out.println("✅ Usuario ADMIN creado: " + adminUsername);
            }

            // Asambleas iniciales
            if (assemblyRepository.count() == 0) {
                Assembly sevilla = new Assembly();
                sevilla.setCiudad("Sevilla");
                sevilla.setEmail("eeccsevilla@gmail.com");
                sevilla.setInstagramUrl("https://www.instagram.com/eeccsevilla");
                sevilla.setActiva(true);
                assemblyRepository.save(sevilla);

                Assembly malaga = new Assembly();
                malaga.setCiudad("Málaga");
                malaga.setEmail("eeccmalaga@gmail.com");
                malaga.setInstagramUrl("https://www.instagram.com/eeccmalaga");
                malaga.setActiva(true);
                assemblyRepository.save(malaga);

                Assembly granada = new Assembly();
                granada.setCiudad("Granada");
                granada.setEmail("eeccgranada@gmail.com");
                granada.setInstagramUrl("https://www.instagram.com/eeccgranada");
                granada.setActiva(true);
                assemblyRepository.save(granada);

                System.out.println("✅ Asambleas iniciales creadas: Sevilla, Málaga, Granada");
            }
        };
    }
}
