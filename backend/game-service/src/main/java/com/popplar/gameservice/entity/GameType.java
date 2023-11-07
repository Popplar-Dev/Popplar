package com.popplar.gameservice.entity;

import com.popplar.gameservice.repository.GameRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public enum GameType {
    FIGHTING, REFLEXES;

    public static boolean isValidGameType(String type) {
        try {
            valueOf(type);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public static boolean isQualified(Game game, GameRepository gameRepository,
        LocalDateTime startOfDay, LocalDateTime endOfDay) {
        List<GameType> typeList = List.of(GameType.values());
        for (GameType type : typeList) {
            Optional<Game> temp = gameRepository.findTopByMemberIdAndHotPlaceIdAndTypeAndDeletedFalseAndCreatedDateBetweenOrderByPointsDesc(
                game.getMemberId(), game.getHotPlaceId(), type, startOfDay, endOfDay);
            if (temp.isEmpty()) {
                return false;
            }
        }
        return true;
    }
}
