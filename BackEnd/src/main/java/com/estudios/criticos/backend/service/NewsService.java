package com.estudios.criticos.backend.service;

import com.estudios.criticos.backend.model.News;
import com.estudios.criticos.backend.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    public List<News> getAllNews() {
        // Asegúrate de que este método exista en tu Repository,
        // si no, usa newsRepository.findAll();
        return newsRepository.findAll();
    }

    // ✅ RENOMBRADO: De createNews a saveNews para coincidir con el Controller
    public News saveNews(News news) {
        if (news.getDate() == null) {
            // ✅ CORREGIDO: Usamos java.util.Date en lugar de LocalDate
            news.setDate(new Date());
        }
        return newsRepository.save(news);
    }

    public News getNewsById(Long id) {
        return newsRepository.findById(id)
                .orElse(null); // Devolvemos null para que el Controller lance el 404
    }
}