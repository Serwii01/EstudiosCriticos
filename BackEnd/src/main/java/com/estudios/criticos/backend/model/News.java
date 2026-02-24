package com.estudios.criticos.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
@Table(name = "news")
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 500)
    private String description;

    @Column(columnDefinition = "TEXT")
    private String longDescription;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType activityType;

    @Column(nullable = false, length = 50)
    private String assembly;

    private String imageUrl;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] imageData;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date date;

    public News() {}
}