package com.popplar.gameservice.repository;

import com.popplar.gameservice.dto.GameDto;
import com.popplar.gameservice.entity.GameType;
import com.popplar.gameservice.entity.QGame;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import org.springframework.stereotype.Repository;


@Repository
public class GameQueryDSLRepository {

    private final EntityManager entityManager;
    private final JPAQueryFactory queryFactory;

    public GameQueryDSLRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    public List<GameDto> findMaxPointsByHotPlaceIdAndType(Long hotPlaceId, String type) {
        QGame game = QGame.game;

        JPAQuery<GameDto> query = new JPAQuery<>(entityManager);
        List<GameDto> result = query
            .select(
                Projections.constructor(GameDto.class, game.type, game.memberId, game.hotPlaceId,
                    game.points.max()))
            .from(game)
            .where(game.hotPlaceId.eq(hotPlaceId).and(game.type.eq(GameType.valueOf(type))))
            .groupBy(game.memberId)
            .orderBy(game.points.max().desc())
            .fetch();

        return result;
    }
}