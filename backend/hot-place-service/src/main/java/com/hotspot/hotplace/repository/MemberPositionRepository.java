package com.hotspot.hotplace.repository;

import com.hotspot.hotplace.entity.MemberPosition;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberPositionRepository extends CrudRepository<MemberPosition, String> {
    List<MemberPosition> findAllByHotPlaceId(Long hotPlaceId);

    boolean existsByMemberId(Long memberId);

    void deleteAllByMemberId(Long memberId);
}
