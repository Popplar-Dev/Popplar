package com.popplar.gameservice.entity;

import com.popplar.gameservice.repository.GameRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    public static List<Double> maxGamePoint(Long memberId, Long hotPlaceId,
        LocalDateTime startOfDay, LocalDateTime endOfDay, GameRepository gameRepository) {
        List<Double> findMaxPoints = new ArrayList<>();
        List<GameType> typeList = List.of(GameType.values());
        //내 게임별 최고점수들 먼저
        for (GameType type : typeList) {
            Optional<Game> myTemp = gameRepository.findTopByMemberIdAndHotPlaceIdAndTypeAndDeletedFalseAndCreatedDateBetweenOrderByPointsDesc(
                memberId, hotPlaceId, type, startOfDay, endOfDay);
            if (myTemp.isEmpty()) {
                findMaxPoints.add(0.0);
                continue;
            }
            findMaxPoints.add(myTemp.orElseThrow().getPoints());
        }
        //핫플레이스 최고 점수 넣기, fighting부터
        for (GameType type : typeList) {
            Optional<Game> temp = gameRepository.findTopByHotPlaceIdAndTypeAndDeletedFalseAndCreatedDateBetweenOrderByPointsDesc(
                hotPlaceId, type, startOfDay, endOfDay);
            if (temp.isEmpty()) {
                findMaxPoints.add(0.0);
                continue;
            }
            findMaxPoints.add(temp.orElseThrow().getPoints());
        }
        return findMaxPoints;
    }
}
