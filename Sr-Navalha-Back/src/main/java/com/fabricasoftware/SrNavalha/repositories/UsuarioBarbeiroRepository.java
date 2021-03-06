package com.fabricasoftware.SrNavalha.repositories;

import com.fabricasoftware.SrNavalha.models.UsuarioBarbeiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioBarbeiroRepository extends JpaRepository<UsuarioBarbeiro, Long> {

	UsuarioBarbeiro findBarbeiroByEmail (String email);


}
