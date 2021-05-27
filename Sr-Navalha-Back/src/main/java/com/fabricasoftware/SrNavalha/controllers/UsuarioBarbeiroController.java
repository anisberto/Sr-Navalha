package com.fabricasoftware.SrNavalha.controllers;

import com.fabricasoftware.SrNavalha.models.UsuarioBarbeiro;
import com.fabricasoftware.SrNavalha.services.UsuarioBarbeiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/usuarios_barbeiros")
public class UsuarioBarbeiroController {

    @Autowired
    private UsuarioBarbeiroService usuarioBarbeiroService;

    @GetMapping
    public ResponseEntity<List<UsuarioBarbeiro>> findAll() {
        List<UsuarioBarbeiro> list = usuarioBarbeiroService.findAll();
        return ResponseEntity.ok().body(list);
    }
    
    @GetMapping("/{email}")
    public ResponseEntity<UsuarioBarbeiro> findBarbeiroByEmail( @PathVariable String email) {
        UsuarioBarbeiro barbeiroRetorno = usuarioBarbeiroService.findBarbeiroByEmail(email);
        return ResponseEntity.ok().body(barbeiroRetorno);
    }
    

    @PostMapping
    public ResponseEntity<UsuarioBarbeiro> create(@RequestBody UsuarioBarbeiro usuarioBarbeiro) {
        usuarioBarbeiro = usuarioBarbeiroService.create(usuarioBarbeiro);
        return ResponseEntity.ok().body(usuarioBarbeiro);
    }

    @PutMapping
    public ResponseEntity<UsuarioBarbeiro> update(@RequestBody UsuarioBarbeiro usuarioBarbeiro) {
        usuarioBarbeiro = usuarioBarbeiroService.create(usuarioBarbeiro);
        return ResponseEntity.ok().body(usuarioBarbeiro);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        usuarioBarbeiroService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
