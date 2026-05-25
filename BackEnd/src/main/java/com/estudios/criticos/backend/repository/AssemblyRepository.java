package com.estudios.criticos.backend.repository;

import com.estudios.criticos.backend.model.Assembly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AssemblyRepository extends JpaRepository<Assembly, Long> {
    List<Assembly> findAllByOrderByCiudadAsc();
    Optional<Assembly> findByCiudadIgnoreCase(String ciudad);
    boolean existsByCiudadIgnoreCase(String ciudad);
}
