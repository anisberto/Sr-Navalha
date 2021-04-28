package com.fabricasoftware.SrNavalha.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fabricasoftware.SrNavalha.entity.Cidade;

@Repository
public interface CidadeDao extends JpaRepository<Cidade, Long> {

}
