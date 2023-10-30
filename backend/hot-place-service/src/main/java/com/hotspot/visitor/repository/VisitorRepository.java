package com.hotspot.visitor.repository;

import com.hotspot.visitor.entity.Visitor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {

    List<Visitor> findVisitorsByHotPlaceId(Long hotPlaceId);

    Optional<Visitor> findVistorsByMemberIdAndHotPlaceIdAndVisitedDate(Long memberId,
        Long hotPlaceId, LocalDateTime visitedDate);

    int countByVisitedDateAfterAndHotPlaceId(LocalDateTime twoWeeksAgo, Long hotPlaceId);
}
