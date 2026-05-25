package com.estudios.criticos.backend.service;

import com.estudios.criticos.backend.model.Assembly;
import com.estudios.criticos.backend.repository.AssemblyRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AssemblyService {

    private final AssemblyRepository assemblyRepository;

    public AssemblyService(AssemblyRepository assemblyRepository) {
        this.assemblyRepository = assemblyRepository;
    }

    public List<Assembly> getAllAssemblies() {
        return assemblyRepository.findAllByOrderByCiudadAsc();
    }

    public Optional<Assembly> getById(Long id) {
        return assemblyRepository.findById(id);
    }

    public Assembly save(Assembly assembly) {
        return assemblyRepository.save(assembly);
    }

    public void delete(Long id) {
        assemblyRepository.deleteById(id);
    }

    public boolean existsByCiudad(String ciudad) {
        return assemblyRepository.existsByCiudadIgnoreCase(ciudad);
    }
}
