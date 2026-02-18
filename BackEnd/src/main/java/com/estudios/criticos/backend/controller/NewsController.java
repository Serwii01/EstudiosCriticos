package com.estudios.criticos.backend.controller;

import com.estudios.criticos.backend.model.ActivityType;
import com.estudios.criticos.backend.model.News;
import com.estudios.criticos.backend.service.NewsService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:4200") // Mantenemos tu configuración CORS
public class NewsController {

    private final NewsService newsService;

    // Inyección por constructor (Buenas prácticas Spring Boot 3)
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // ✅ 1. GET: Obtener todas las noticias
    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }

    // ✅ 2. GET: Obtener una noticia por ID
    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Long id) {
        News news = newsService.getNewsById(id);
        if (news != null) {
            return ResponseEntity.ok(news);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ 3. POST: Crear noticia (Con imagen y nuevos campos)
    // Usamos 'consumes = MULTIPART_FORM_DATA' para aceptar ficheros
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<News> createNews(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("longDescription") String longDescription, // Nuevo campo
            @RequestParam("assembly") String assembly,
            @RequestParam("activityType") ActivityType activityType, // Nuevo campo (Enum)
            @RequestParam(value = "file", required = false) MultipartFile file // El archivo de imagen
    ) throws IOException {

        News news = new News();
        news.setTitle(title);
        news.setDescription(description);
        news.setLongDescription(longDescription);
        news.setAssembly(assembly);
        news.setActivityType(activityType);
        news.setDate(new Date()); // Fecha automática al momento de crear

        // Procesar la imagen si viene alguna
        if (file != null && !file.isEmpty()) {
            news.setImageData(file.getBytes());
        }

        // Guardamos primero para generar el ID
        News savedNews = newsService.saveNews(news);

        // Si tiene imagen, generamos la URL pública para verla
        if (savedNews.getImageData() != null) {
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/news/")
                    .path(savedNews.getId().toString())
                    .path("/image")
                    .toUriString();

            savedNews.setImageUrl(imageUrl);
            newsService.saveNews(savedNews); // Actualizamos la noticia con su URL
        }

        return ResponseEntity.ok(savedNews);
    }

    // ✅ 4. GET IMAGEN: Endpoint para servir los bytes de la foto
    // Este es el que usará el navegador cuando lea <img src="...">
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getNewsImage(@PathVariable Long id) {
        News news = newsService.getNewsById(id);

        if (news == null || news.getImageData() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE) // Funciona para JPG y PNG
                .body(news.getImageData());
    }
}