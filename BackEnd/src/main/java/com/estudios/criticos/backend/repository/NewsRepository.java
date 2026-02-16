package com.estudios.criticos.backend.repository;

import com.estudios.criticos.backend.model.Assembly;
import com.estudios.criticos.backend.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    // Lista ordenada por fecha DESC (más nueva primero)
    List<News> findAllByOrderByDateDesc();

    List<News> findByAssemblyOrderByDateDesc(Assembly assembly);  // ✅ Solo Assembly

}
