import React, { useEffect } from "react"
import styles from './styles/map.module.css'
import './styles/frame.css'

const { kakao } = window;

export default function Map () {

  useEffect(() => {
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.50134, 127.0397), //지도의 중심좌표.
      level: 4 //지도의 레벨(확대, 축소 정도)
    };
  
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 마커가 표시될 위치입니다 
    var markerPosition  = new kakao.maps.LatLng(37.50134, 127.0397); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

  }, [])

  return (
  <div className={`container`}>
    <div className={`Box`} id={`top`}></div>
    <div className={`Box`} id={`left`}></div>
    <div className={`Box`} id={`right`}></div>
    <div className={`Box`} id={`bottom`}></div>

    <div id="map" className={styles.container}></div>
  </div>
  )
}