package com.hotspot.visitor.controller;

import com.hotspot.visitor.dto.VisitorReqDto;
import com.hotspot.visitor.dto.VisitorResDto;
import com.hotspot.visitor.service.VisitorService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequestMapping("/hot-place")
@Slf4j
public class VisitorController {

    private final VisitorService visitorService;

    @GetMapping("/visitor/{hotPlaceId}")
    public ResponseEntity<List<VisitorResDto>> findAllVisitor(
        @PathVariable Long hotPlaceId) {
        List<VisitorResDto> visitorModelList = visitorService.findAllVisitor(
            hotPlaceId);

        return new ResponseEntity<>(visitorModelList, HttpStatus.OK);
    }

    @PostMapping("/visitor")
    public ResponseEntity<Void> insertVisitor(@RequestHeader("Member-Id") Long memberId,
        @RequestBody VisitorReqDto visitorReqDto) {
        visitorService.insertVisitor(visitorReqDto, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
