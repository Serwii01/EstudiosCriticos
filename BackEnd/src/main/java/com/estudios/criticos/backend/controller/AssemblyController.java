package com.estudios.criticos.backend.controller;

import com.estudios.criticos.backend.model.Assembly;
import com.estudios.criticos.backend.service.AssemblyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assemblies")
@CrossOrigin(origins = "http://localhost:4200")
public class AssemblyController {

    private final AssemblyService assemblyService;

    public AssemblyController(AssemblyService assemblyService) {
        this.assemblyService = assemblyService;
    }

    // GET público — cualquier visitante puede ver las asambleas
    @GetMapping
    public List<Assembly> getAllAssemblies() {
        return assemblyService.getAllAssemblies();
    }

    // POST solo admin (Spring Security exige auth para todo lo que no sea GET)
    @PostMapping
    public ResponseEntity<Assembly> createAssembly(@RequestBody Assembly assembly) {
        if (assemblyService.existsByCiudad(assembly.getCiudad())) {
            return ResponseEntity.badRequest().build();
        }
        // Formato email automático si viene vacío
        if (assembly.getEmail() == null || assembly.getEmail().isBlank()) {
            String slug = assembly.getCiudad().toLowerCase()
                    .replace(" ", "")
                    .replace("á","a").replace("é","e").replace("í","i")
                    .replace("ó","o").replace("ú","u").replace("ñ","n");
            assembly.setEmail("eecc" + slug + "@gmail.com");
        }
        return ResponseEntity.ok(assemblyService.save(assembly));
    }

    // DELETE solo admin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssembly(@PathVariable Long id) {
        if (assemblyService.getById(id).isEmpty()) {
            return ResponseEntity.<Void>notFound().build();
        }
        assemblyService.delete(id);
        return ResponseEntity.<Void>noContent().build();
    }
}
