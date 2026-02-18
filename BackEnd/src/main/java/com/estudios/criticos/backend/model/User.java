package com.estudios.criticos.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users") // 'user' es palabra reservada en SQL, mejor usar 'users'
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password; // Aquí se guardará encriptada (BCrypt)

    private String role; // Ej: "ADMIN"
}