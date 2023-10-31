package com.popplar.gameservice.repository;

import com.popplar.gameservice.dto.GameDto;
import com.popplar.gameservice.entity.Game;
import com.popplar.gameservice.entity.GameType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    List<GameDto> findByHotPlaceIdAndTypeAndMemberIdAndDeletedFalseOrderByPointsDesc(Long hotPlaceId, GameType type, Long memberId);
}
