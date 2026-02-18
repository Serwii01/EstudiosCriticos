package com.estudios.criticos.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "news") // Buena práctica: definir nombre de tabla explícito
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Título obligatorio
    @Column(nullable = false, length = 200)
    private String title;

    // Resumen corto para la tarjeta (Home/Noticias)
    @Column(length = 500)
    private String description;

    // Texto completo para la vista detallada (TEXT permite +65.000 caracteres)
    @Column(columnDefinition = "TEXT")
    private String longDescription;

    // Tipo de actividad: Se guarda como texto ("HUELGA", etc.)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false) // Obligatorio tener tipo
    private ActivityType activityType;

    // Asamblea (Sevilla, Málaga...). Obligatorio.
    @Column(nullable = false, length = 50)
    private String assembly;

    // URL de la imagen (puede ser nula si la noticia no tiene foto)
    private String imageUrl;

    // Datos binarios de la imagen
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] imageData;

    // Fecha de publicación
    @Temporal(TemporalType.DATE) // Guarda solo día/mes/año (usar TIMESTAMP para hora)
    @Column(nullable = false)
    private Date date;

    // Constructor vacío requerido por JPA (Lombok suele ponerlo, pero a veces ayuda explicitarlo)
    public News() {}
}