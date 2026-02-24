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

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Long id) {
        News news = newsService.getNewsById(id);
        if (news != null) {
            return ResponseEntity.ok(news);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<News> createNews(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("longDescription") String longDescription,
            @RequestParam("assembly") String assembly,
            @RequestParam("activityType") ActivityType activityType,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) throws IOException {

        News news = new News();
        news.setTitle(title);
        news.setDescription(description);
        news.setLongDescription(longDescription);
        news.setAssembly(assembly);
        news.setActivityType(activityType);
        news.setDate(new Date());

        if (file != null && !file.isEmpty()) {
            news.setImageData(file.getBytes());
        }

        News savedNews = newsService.saveNews(news);

        if (savedNews.getImageData() != null) {
            String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/news/")
                    .path(savedNews.getId().toString())
                    .path("/image")
                    .toUriString();

            savedNews.setImageUrl(imageUrl);
            newsService.saveNews(savedNews);
        }

        return ResponseEntity.ok(savedNews);
    }


    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getNewsImage(@PathVariable Long id) {
        News news = newsService.getNewsById(id);

        if (news == null || news.getImageData() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE)
                .body(news.getImageData());
    }
}