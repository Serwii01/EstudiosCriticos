package com.estudios.criticos.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "news")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Assembly assembly;  // ← Import auto

    @NotBlank
    private String description;

    private LocalDate date;

    private String details;
}
