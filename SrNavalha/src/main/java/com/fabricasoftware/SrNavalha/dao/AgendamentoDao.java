package com.fabricasoftware.SrNavalha.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fabricasoftware.SrNavalha.entity.Agendamento;

@Repository
public interface AgendamentoDao extends JpaRepository<Agendamento, Long> {

}
