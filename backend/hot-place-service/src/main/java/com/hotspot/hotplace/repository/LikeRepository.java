package com.hotspot.hotplace.repository;

import com.hotspot.hotplace.entity.HotPlace;
import com.hotspot.hotplace.entity.Like;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByHotPlaceAndMemberId(HotPlace hotPlace, Long memberId);
}
