
package com.hotspot.hotplace.repository;

import com.hotspot.hotplace.entity.HotPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HotPlaceRepository extends JpaRepository<HotPlace, Long> {

}
