package com.estudios.criticos.backend.config;

import com.estudios.criticos.backend.model.User;
import com.estudios.criticos.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Si no existe el admin, lo creamos
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("1234")); // <--- AQUÍ CAMBIA TU CONTRASEÑA
                admin.setRole("ADMIN");
                userRepository.save(admin);
                System.out.println("✅ Usuario ADMIN creado: admin / 1234");
            }
        };
    }
}