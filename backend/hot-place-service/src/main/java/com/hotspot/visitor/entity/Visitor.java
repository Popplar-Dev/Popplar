package com.hotspot.visitor.entity;

import com.hotspot.hotplace.entity.HotPlace;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "visitors")
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hot_place_id")
    HotPlace hotPlace;

    @NotNull
    Long memberId;

    @NotNull
    LocalDateTime visitedDate;

    @Builder
    public Visitor(HotPlace hotPlace, Long memberId, LocalDateTime visitedDate) {
        this.hotPlace = hotPlace;
        this.memberId = memberId;
        this.visitedDate = visitedDate;
    }

    public void updateHotPlace(HotPlace hotPlace) {
        this.hotPlace = hotPlace;
    }
}
