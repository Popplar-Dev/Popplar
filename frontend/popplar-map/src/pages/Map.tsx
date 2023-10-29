import React, { useEffect, useState } from "react"
import styles from './styles/map.module.css'
import './styles/frame.css'

import { BiSolidRocket } from 'react-icons/bi';

import { useRecoilState } from 'recoil';
import { HotLatLngState } from "../recoil/hotLatLng/index";
import { LatLng } from '../types/LatLng'

const { kakao } = window;

export default function Map () {
  const [searchPlaceObj, setSearchPlacObj] = useState<any | null>(null)
  const [visibleMap, setVisibleMap] = useState<any | null>(null)
  const [hotPlaceLatLng, sethotPlaceLatLng] = useRecoilState<LatLng>(HotLatLngState);
  console.log(hotPlaceLatLng.y.slice(0, -8), hotPlaceLatLng.x.slice(0, -8))

  useEffect(() => {
    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();  
    setSearchPlacObj(ps)
  }, [])

  // function placesSearchCB(data: any, status: any, pagination: any) {
  //   if (status === kakao.maps.services.Status.OK) {
  //     console.log(data)
  //     if (window.ReactNativeWebView) {
  //       window.ReactNativeWebView.postMessage(
  //         JSON.stringify({ data })
  //       );
  //   }}
  // }

  // 핫플 마커 선택시, web->native 데이터 전송
  const requestPermission = (data: any) => {
    console.log(data)
  
    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ data })
      );
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    // if (searchPlaceObj && data) {
    //   searchPlaceObj.keywordSearch(data, placesSearchCB)
    // }
  }

    // if (typeof window !== 'undefined' && window.ReactNativeWebView) {
    //   window.ReactNativeWebView.postMessage(
    //     JSON.stringify({ data })
    //   );
    // } else {
    //   // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
    //   // alert({ message: ERROR_TYPES.notMobile });
    //   alert( '모바일 환경에서 실행해주세요' );
    // }

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
    if (hotPlaceLatLng.x) {
      const Lat = hotPlaceLatLng.y.slice(0, -8)
      const Lng = hotPlaceLatLng.x.slice(0, -8)
      console.log(Lat, Lng)
      mapOptions = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(Lat, Lng), //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
      };
    }

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
          name: '스타벅스 역삼대로점',
          address: '서울 강남구 테헤란로 211 한국고등교육재단빌딩1층', 
          latlng: new kakao.maps.LatLng(37.50189, 127.0393)
      },
      {
          name: '역삼역 2호선', 
          address: '서울 강남구 테헤란로 지하 156', 
          latlng: new kakao.maps.LatLng(37.50067, 127.0364)
      },
      {
          name: '양자강', 
          address: '서울 강남구 테헤란로34길 7',
          latlng: new kakao.maps.LatLng(37.50112, 127.0403)
      },
      {
          name: '공차 역삼GFC점',
          address: '서울 강남구 논현로85길 13',
          latlng: new kakao.maps.LatLng(37.49909, 127.0362)
      },
      {
          name: '지아니스나폴리 역삼점',
          address: '서울 강남구 논현로94길 15',
          latlng: new kakao.maps.LatLng(37.50267, 127.0375)
      },
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
          title : positions[i].name,
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
      const name = positions[i].name
      const address = positions[i].address
      kakao.maps.event.addListener(hotMarker, 'click', function() {
        // 클릭한 위도, 경도 정보를 가져옵니다 
        panToHandler(La, Ma);
        requestPermission({
          name, address
        });
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
    <div className={styles.message}>4 spaces detected...</div>

    <div className={styles.search}>Search...</div>

    <div className={`Box`} id={`top`}></div>
    <div className={`Box`} id={`left`}></div>
    <div className={`Box`} id={`right`}></div>
    <div className={`Box`} id={`bottom`}></div>


    <div id="map" className={styles.container}></div>

    <button className={styles.mypos} onClick={() => {
      moveToMypos();
      sethotPlaceLatLng({x: "", y: ""});
    }}>
      <BiSolidRocket size={25} color={'#8B90F7'}/>
    </button>
  </div>
  )
}