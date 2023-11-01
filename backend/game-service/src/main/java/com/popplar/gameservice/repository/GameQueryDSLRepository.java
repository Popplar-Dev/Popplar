package com.popplar.gameservice.repository;

import com.popplar.gameservice.dto.BoardDto;
import com.popplar.gameservice.dto.GameDto;
import com.popplar.gameservice.entity.GameType;
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

    public List<BoardDto> findMaxPointsByHotPlaceIdAndType(Long hotPlaceId, String type,
        LocalDateTime startDate, LocalDateTime endDate) {
        QGame game = QGame.game;

        JPAQuery<GameDto> query = new JPAQuery<>(entityManager);

        return query
            .select(
                Projections.constructor(BoardDto.class, game.type, game.memberId, game.hotPlaceId,
                    game.points.max()))
            .from(game)
            .where(game.hotPlaceId.eq(hotPlaceId).and(game.type.eq(GameType.valueOf(type)))
                .and(game.createdDate.between(startDate, endDate)))
            .groupBy(game.memberId)
            .orderBy(game.points.max().desc())
            .fetch();
    }
}