package com.estudios.criticos.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "assemblies")
public class Assembly {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String ciudad;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(length = 255)
    private String telegramUrl;

    @Column(length = 255)
    private String instagramUrl;

    @Column(nullable = false)
    private boolean activa = true;

    public Assembly() {}
}
