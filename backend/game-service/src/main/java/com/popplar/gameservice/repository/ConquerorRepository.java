package com.popplar.gameservice.repository;

import com.popplar.gameservice.entity.Conqueror;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConquerorRepository extends JpaRepository<Conqueror, Long> {

    Optional<Conqueror> findTopByHotPlaceIdAndDeletedFalseOrderByPointsDesc(Long hotPlaceId);
}
