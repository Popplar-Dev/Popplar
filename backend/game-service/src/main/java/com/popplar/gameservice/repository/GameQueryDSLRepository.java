package com.popplar.gameservice.repository;

import com.popplar.gameservice.dto.BoardDto;
import com.popplar.gameservice.dto.GameDto;
import com.popplar.gameservice.dto.RankDto;
import com.popplar.gameservice.entity.GameType;
import com.popplar.gameservice.entity.QConqueror;
import com.popplar.gameservice.entity.QGame;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Repository;


@Repository
public class GameQueryDSLRepository {

    private final EntityManager entityManager;

    public GameQueryDSLRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<BoardDto> findMaxPointsByHotPlaceIdAndType(Long hotPlaceId, GameType type,
        LocalDateTime startDate, LocalDateTime endDate) {
        QGame game = QGame.game;

        JPAQuery<GameDto> query = new JPAQuery<>(entityManager);

        return query
            .select(
                Projections.constructor(BoardDto.class, game.type, game.memberId, game.hotPlaceId,
                    game.points.max()))
            .from(game)
            .where(game.hotPlaceId.eq(hotPlaceId).and(game.type.eq(type))
                .and(game.createdDate.between(startDate, endDate)))
            .groupBy(game.memberId)
            .orderBy(game.points.max().desc())
            .fetch();
    }

    public List<RankDto> findMaxPointsMemberByHotPlaceIdAndType(Long hotPlaceId, GameType type,
        LocalDateTime startDate, LocalDateTime endDate) {
        QGame game = QGame.game;
        JPAQuery<GameDto> query = new JPAQuery<>(entityManager);

        return query
            .select(
                Projections.constructor(RankDto.class, game.memberId, game.hotPlaceId, game.type,
                    game.points.max()))
            .from(game)
            .where(game.hotPlaceId.eq(hotPlaceId).and(game.type.eq(type))
                .and(game.createdDate.between(startDate, endDate)))
            .groupBy(game.memberId, game.hotPlaceId)
            .orderBy(game.points.max().desc())
            .limit(10)
            .fetch();
    }
    public List<RankDto> findMaxPointsConquerorByHotPlaceId(Long hotPlaceId,
        LocalDateTime startDate, LocalDateTime endDate) {
        QConqueror conqueror = QConqueror.conqueror;
        JPAQuery<GameDto> query = new JPAQuery<>(entityManager);

        return query
            .select(
                Projections.constructor(RankDto.class, conqueror.memberId, conqueror.hotPlaceId,
                    conqueror.points.max()))
            .from(conqueror)
            .where(conqueror.hotPlaceId.eq(hotPlaceId)
                .and(conqueror.createdDate.between(startDate, endDate)))
            .groupBy(conqueror.memberId, conqueror.hotPlaceId)
            .orderBy(conqueror.points.max().desc())
            .limit(10)
            .fetch();
    }
}