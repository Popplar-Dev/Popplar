package com.popplar.gameservice.repository;

import com.popplar.gameservice.entity.Conqueror;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConquerorRepository extends JpaRepository<Conqueror, Long> {
    Conqueror findByHotPlaceId(Long hotPlaceId);
}
