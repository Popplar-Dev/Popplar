package com.popplar.gameservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.popplar.gameservice.dto.ConquerorInfoDto;
import com.popplar.gameservice.dto.GameBoardDto;
import com.popplar.gameservice.dto.GameDto;
import com.popplar.gameservice.dto.GameInfoResDto;
import com.popplar.gameservice.dto.GameResultDto;
import com.popplar.gameservice.dto.MyBoardDto;
import com.popplar.gameservice.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/game")
public class GameController {

    private final GameService gameService;

    //게임 시작 전 정복자 정보, 모든 게임에 대한 최대 정보 get
    @GetMapping("/info/{hotPlaceId}")
    public ResponseEntity<GameInfoResDto> getGameInfo(@RequestHeader("Member-Id") Long memberId, @PathVariable Long hotPlaceId){
        return new ResponseEntity<>(gameService.getGameInfo(memberId,hotPlaceId), HttpStatus.OK);
    }

    //일단 게임이 종료되었을 때 결과를 저장하는 메서드
    @PostMapping("/insert-result")
    public ResponseEntity<GameResultDto> insertGameResult(@RequestHeader("Member-Id") Long memberId,
        @RequestBody GameDto gameDto) {
        gameDto.setMemberId(memberId);
        return new ResponseEntity<>(gameService.insertGameService(gameDto), HttpStatus.OK);
    }

    //점수판을 보고싶을때 게임 결과를 순서대로 보여주는 메서드
    @GetMapping("/get-game-board/{hotPlaceId}/{type}")
    public ResponseEntity<GameBoardDto> getGameBoard(@PathVariable Long hotPlaceId,
        @PathVariable String type) {
        return new ResponseEntity<>(gameService.getGameBoard(hotPlaceId, type), HttpStatus.OK);
    }

    //사용자의 기록 모아보기
    @GetMapping("/get-my-stat/{hotPlaceId}/{type}")
    public ResponseEntity<MyBoardDto> getMyGameBoard(@RequestHeader("Member-Id") Long memberId,
        @PathVariable Long hotPlaceId, @PathVariable String type) {
        return new ResponseEntity<>(gameService.getMyGameBoard(memberId, hotPlaceId, type),
            HttpStatus.OK);
    }

    //정복자 보여주기
    @GetMapping("/get-conqueror-info/{hotPlaceId}")
    public ResponseEntity<ConquerorInfoDto> getConquerorInfo(@PathVariable Long hotPlaceId) {
        return new ResponseEntity<>(gameService.getConquerorInfo(hotPlaceId), HttpStatus.OK);
    }

    //카프카 테스트
    @GetMapping("/kafka-test")
    public void testKafka() throws JsonProcessingException {
        gameService.testKafka();
    }
}
