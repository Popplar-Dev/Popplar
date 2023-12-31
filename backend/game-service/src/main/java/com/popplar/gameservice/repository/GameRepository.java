package com.popplar.gameservice.repository;

import com.popplar.gameservice.entity.Game;
import com.popplar.gameservice.entity.GameType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findAllByHotPlaceIdAndTypeAndMemberIdAndDeletedFalseOrderByPointsDesc(Long hotPlaceId, GameType type, Long memberId);

    Optional<Game> findTopByMemberIdAndHotPlaceIdAndTypeAndDeletedFalseAndCreatedDateBetweenOrderByPointsDesc(
        Long memberId, Long HotPlaceId, GameType type, LocalDateTime startOfDay, LocalDateTime endOfDay);

    List<Game> findAllByHotPlaceIdAndTypeAndDeletedFalseAndCreatedDateBetweenOrderByPointsDesc(
        Long HotPlaceId, GameType type, LocalDateTime startOfDay, LocalDateTime endOfDay);

    Optional<Game> findTopByHotPlaceIdAndTypeAndDeletedFalseAndCreatedDateBetweenOrderByPointsDesc(
        Long hotPlaceId,
        GameType type, LocalDateTime startOfDay, LocalDateTime endOfDay);
}
