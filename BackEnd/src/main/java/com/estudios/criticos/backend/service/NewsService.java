package com.estudios.criticos.backend.service;

import com.estudios.criticos.backend.model.News;
import com.estudios.criticos.backend.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    public List<News> getAllNews() {
        return newsRepository.findAllByOrderByDateDesc();
    }

    public News createNews(News news) {
        if (news.getDate() == null) {
            news.setDate(LocalDate.now());  // Default hoy
        }
        return newsRepository.save(news);
    }

    public News getNewsById(Long id) {
        return newsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Noticia no encontrada: " + id));
    }
}
