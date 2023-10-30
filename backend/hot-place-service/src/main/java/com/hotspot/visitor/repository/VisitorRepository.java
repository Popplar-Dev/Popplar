package com.hotspot.visitor.repository;

import com.hotspot.hotplace.entity.HotPlace;
import com.hotspot.visitor.entity.Visitor;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {

    List<Visitor> findVisitorsByHotPlaceId(Long hotPlaceId);
}
