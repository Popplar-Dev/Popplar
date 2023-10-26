import React, { useEffect, useState } from "react"
import styles from './styles/map.module.css'
import './styles/frame.css'

import { BiSolidRocket } from 'react-icons/bi';

const { kakao } = window;

export default function Map () {
  const [visibleMap, setVisibleMap] = useState<any | null>(null)

  // 내 위치로 돌아가기
  const moveToMypos = () => {
    var moveLatLon = new kakao.maps.LatLng(37.50134, 127.0397);
    visibleMap.panTo(moveLatLon); 
    setTimeout(() => {
      visibleMap.setLevel(4); 
    }, 400)    
  }

  useEffect(() => {
    var mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var mapOptions = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.50134, 127.0397), //지도의 중심좌표.
      level: 4 //지도의 레벨(확대, 축소 정도)
    };
  
    var map = new kakao.maps.Map(mapContainer, mapOptions); //지도 생성 및 객체 리턴
    setVisibleMap(map) 

    // 내 위치 마커
    // 마커가 표시될 위치입니다 
    var markerPosition = new kakao.maps.LatLng(37.50134, 127.0397);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);


    // 핫플 마커 띄우기
    var positions = [
      {
          content: '<div>카카오</div>', 
          latlng: new kakao.maps.LatLng(37.4994, 127.0397)
      },
      {
          content: '<div>생태연못</div>', 
          latlng: new kakao.maps.LatLng(37.50334, 127.0397)
      },
      {
          content: '<div>텃밭</div>', 
          latlng: new kakao.maps.LatLng(37.50134, 127.0437)
      },
      {
          content: '<div>근린공원</div>',
          latlng: new kakao.maps.LatLng(37.50124, 127.0407)
      }
  ];

  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  
  for (var i = 0; i < positions.length; i ++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35); 

      // 마커 이미지를 생성합니다    
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

      // 마커를 생성합니다
      var hotMarker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커의 위치
          title : positions[i].content,
          image : markerImage // 마커 이미지 
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      // hotMarker.setMap(map);
  
      // 마커에 표시할 인포윈도우를 생성합니다 
      // var infowindow = new kakao.maps.InfoWindow({
      //     content: positions[i].content // 인포윈도우에 표시할 내용
      // });
  
      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다 
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      // kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      // kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
      const La = positions[i].latlng.La
      const Ma = positions[i].latlng.Ma
      kakao.maps.event.addListener(hotMarker, 'click', function() {
        // 클릭한 위도, 경도 정보를 가져옵니다 
        panToHandler(La, Ma)
      })

      // marker.setMap(map);
    }
  
    // 핫플 마커 클릭시 중심으로 이동
    function panToHandler(La: number, Ma: number) {
      // 이동할 위도 경도 위치를 생성합니다 \
      var moveLatLon = new kakao.maps.LatLng(Ma, La);
      
      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      map.panTo(moveLatLon);
      setTimeout(() => {
        map.setLevel(2); 
      }, 400)             
    }        

}, [])

  return (
  <div className={`container`}>
    <div className={`Box`} id={`top`}></div>
    <div className={`Box`} id={`left`}></div>
    <div className={`Box`} id={`right`}></div>
    <div className={`Box`} id={`bottom`}></div>

    <div id="map" className={styles.container}></div>

    <button className={styles.mypos} onClick={() => {
      moveToMypos();
    }}>
      <BiSolidRocket size={25} color={'#8B90F7'}/>
    </button>
  </div>
  )
}