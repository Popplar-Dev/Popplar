import React, { useEffect, useState } from "react"
import styles from './styles/map.module.css'
import './styles/frame.css'

import { BiSolidRocket } from 'react-icons/bi';
import { Place, hotPlaceResDto } from '../types/place'

import { useRecoilState } from 'recoil';
import { HotLatLngState } from "../recoil/hotLatLng/index";
import { CenterLatState } from "../recoil/centerLat/index"
import { CenterLngState } from "../recoil/centerLng/index"
import { CurrLocation, Location } from "../recoil/currLocation/index"

import { LatLng } from '../types/LatLng'

import { getAllHotplace, getIdHotplace } from '../api/getHotplace'

const { kakao } = window;

export default function Map () {
  const [searchPlaceObj, setSearchPlacObj] = useState<any | null>(null)
  const [visibleMap, setVisibleMap] = useState<any | null>(null)
  const [hotplaceList, setHotplaceList] = useState<hotPlaceResDto[]>([])
  
  const [hotPlaceLatLng, sethotPlaceLatLng] = useRecoilState<LatLng>(HotLatLngState);
  const [centerLat, setCenterLat] = useRecoilState<string>(CenterLatState);
  const [centerLng, setCenterLng] = useRecoilState<string>(CenterLngState);
  const [currLocation, setCurrLocation] = useRecoilState<Location>(CurrLocation);

  const [event, setEvent] = useState<any>({})

  useEffect(() => {
    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();  
    setSearchPlacObj(ps)
    getAllHotplace()
    .then((res) => setHotplaceList(res.data))
    // .then((res) => console.log('hot place', res.data))
    .then((err) => console.log(err))
  }, [])

  useEffect(() => {
    window.addEventListener('resize', function() {
      let vh = window.innerHeight * 0.01;
      // let vw = window.innerWidth * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, [])

  // const handleLocation = (event: Event) => {
  //   console.log(event)
  //   console.log(event.data)
  //   const data = JSON.parse(event.data);
  //   console.log(data)
  // }

  useEffect(() => {
    // window.addEventListener('message', (event) => {
    //   alert('메세지 수신됨')
    //   const { type, data } = JSON.parse(event.data);
    //   const Lat = data.y.slice(0, -8)
    //   const Lng = data.x.slice(0, -8)
    //   setCenterLat(Lat)
    //   setCenterLng(Lng)
    //   if (typeof window !== 'undefined' && window.ReactNativeWebView) {
    //     window.ReactNativeWebView.postMessage(
    //       JSON.stringify({ 
    //         type: 'test',
    //         data: data,
    //       })
    //     );
    //   }
    // })

    window.addEventListener("message", (event: any) => {
      // if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      //   window.ReactNativeWebView.postMessage(
      //     JSON.stringify('native에서 보낸 정보를 받아줬으면 좋겠어...')
      //   );
      // }
      // const data = JSON.parse(event.data);
      const data = event.data.data;
      // const detail = JSON.parse(data.detail)
      // const data = detail.data
      const LatTest = data.y.toString()
      const LngTest = data.x.toString()
      const Lat = data.y.toString().slice(0, -8)
      const Lng = data.x.toString().slice(0, -8)
      setCurrLocation(prev => ({...prev, Lat: Lat, Lng: Lng}))
      // setCenterLat(Lat)
      // setCenterLng(Lng)
      if (typeof window !== 'undefined' && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ 
            type: 'test',
            data: { data, Lat, Lng }
          })
        );
      }
    });

    // return () => {
    //   document.removeEventListener("message", handleLocation);
    // }
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
  
    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ 
          type: 'place',
          data: data,
        })
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
    var moveLatLon = new kakao.maps.LatLng(currLocation.Lat, currLocation.Lng);
    visibleMap.panTo(moveLatLon); 
    setTimeout(() => {
      visibleMap.setLevel(4); 
    }, 400)    
  }

  useEffect(() => {
    setTimeout(() => {
    var mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    // var mapOptions = { //지도를 생성할 때 필요한 기본 옵션
    //   center: new kakao.maps.LatLng(37.50134, 127.0397), //지도의 중심좌표.
    //   level: 4 //지도의 레벨(확대, 축소 정도)
    // };
    if (hotPlaceLatLng.x) {
      const Lat = hotPlaceLatLng.y.slice(0, -8)
      const Lng = hotPlaceLatLng.x.slice(0, -8)
      setCenterLat(Lat)
      setCenterLng(Lng)
    } else {
      setCenterLat(currLocation.Lat)
      setCenterLng(currLocation.Lng)
    }

    var mapOptions = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(centerLat, centerLng), //지도의 중심좌표.
      level: 4 //지도의 레벨(확대, 축소 정도)
    };

    // 내 위치 마커
    // 마커가 표시될 위치입니다 
    var markerPosition = new kakao.maps.LatLng(centerLat, centerLng);

    var map = new kakao.maps.Map(mapContainer, mapOptions); //지도 생성 및 객체 리턴
    setVisibleMap(map) 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 핫플 마커 띄우기
    var positions = hotplaceList

  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  
  if (positions) {

    for (var i = 0; i < positions.length; i ++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35); 
  
        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
  
        const La = positions[i].y.toString().slice(0, -8)
        const Ma = positions[i].x.toString().slice(0, -8)
  
        // 마커를 생성합니다
        var hotMarker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(La, Ma),
            title : positions[i].placeName,
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
        const place_name = positions[i].placeName
        const road_address_name = positions[i].roadAddressName
        const category_group_name = positions[i].category
        const id = positions[i].id
        kakao.maps.event.addListener(hotMarker, 'click', function() {
          // 클릭한 위도, 경도 정보를 가져옵니다 
          panToHandler(La, Ma);
          getIdHotplace(id)
          .then((res) => res.data)
          .then((res) => requestPermission({
            id, 
            place_name, 
            road_address_name, 
            category_group_name, 
            likeCount: res.likeCount,
            phone: res.phone,
            placeType: res.placeType,
            visitorCount: res.visitorCount,
            y: res.y,
            x: res.x
          }))
        })
        // marker.setMap(map);
      }
  }
  
    // 핫플 마커 클릭시 중심으로 이동
    function panToHandler(La: string, Ma: string) {
      // 이동할 위도 경도 위치를 생성합니다 \
      var moveLatLon = new kakao.maps.LatLng(La, Ma);
      
      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      map.panTo(moveLatLon);
      setTimeout(() => {
        map.setLevel(2); 
      }, 400)             
    } 

  // function displayMarker(locPosition: any) {

  //   // 마커를 생성합니다
  //   var marker = new kakao.maps.Marker({  
  //       map: map, 
  //       position: locPosition
  //   }); 
    
  //   // 지도 중심좌표를 접속위치로 변경합니다
  //   map.setCenter(locPosition);      
  // }    
    
  // if (navigator.geolocation) {
    
  // // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  // navigator.geolocation.getCurrentPosition(function(position) {
      
  //     // var lat = position.coords.latitude, // 위도
  //     var lat = 37.50033, // 위도
  //         // lon = position.coords.longitude; // 경도
  //         lon = 127.0362; // 경도

  //     var locPosition = new kakao.maps.LatLng(lat, lon)
      
  //     // 마커와 인포윈도우를 표시합니다
  //     displayMarker(locPosition);
          
  //   });
  // }
}, 100)  
}, [centerLat, centerLng, hotplaceList])

  return (
  <div className={`container`}>
    {/* <div className={styles.search}>Search...</div> */}

    <div className={`Box`} id={`top`}></div>
    <div className={`Box`} id={`left`}></div>
    <div className={`Box`} id={`right`}></div>
    <div className={`Box`} id={`bottom`}></div>


    <div id="map" className={styles.container}></div>

    <button className={styles.mypos} onClick={() => {
      moveToMypos();
      sethotPlaceLatLng({x: "", y: ""});
      setCenterLat("37.50134");
      setCenterLng("127.0397");
    }}>
      <BiSolidRocket size={25} color={'#8B90F7'}/>
    </button>
  </div>
  )
}