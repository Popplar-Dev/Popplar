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

import { LatLng, nonFlaggedLatLng } from '../types/LatLng'

import { getAllHotplace, getIdHotplace } from '../api/getHotplace'

import HotPlaceUsers from '../components/HotPlaceUsers/HotPlaceUsers'
import { getHotplaceUsers } from '../api/postLocation'

import { BsFire } from 'react-icons/bs'

import rocket from '../assets/images/rocket.png';
import Star2 from '../assets/images/Star2.png';
import stars from '../assets/images/stars.png';

const { kakao } = window;

type user = {
  hotPlaceId: number
  memberId: number
  x: number
  y: number
}

export default function Map () {
  const [visibleMap, setVisibleMap] = useState<any | null>(null)
  const [hotplaceList, setHotplaceList] = useState<hotPlaceResDto[]>([])
  
  const [hotPlaceLatLng, sethotPlaceLatLng] = useRecoilState<LatLng>(HotLatLngState);
  const [searchHotPlace, setSearchHotPlace] = useState<nonFlaggedLatLng>({x: "", y: ""})
  // const [centerLat, setCenterLat] = useRecoilState<string>(CenterLatState);
  // const [centerLng, setCenterLng] = useRecoilState<string>(CenterLngState);
  const [currLocation, setCurrLocation] = useRecoilState<Location>(CurrLocation);

  const [currSpaceId, setCurrSpaceId] = useState<number>(0)
  const [showHotPlaceUsers, setShowHotPlaceUsers] = useState(false);
  const [hotplaceUsers, setHotplaceUsers] = useState<user[]>([])

  // 최초 마운트 시, 전체 hotplace 조회
  useEffect(() => {
    getAllHotplace()
    .then((res) => setHotplaceList(res.data))
    // .then((res) => console.log('hot place', res.data))
    .then((err) => console.log(err))
  }, [])

  // 모바일 화면 리사이징
  useEffect(() => {
    window.addEventListener('resize', function() {
      let vh = window.innerHeight * 0.01;
      // let vw = window.innerWidth * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, [])

  async function movemove(x: string, y: string) {
    var moveLatLon = new kakao.maps.LatLng(x, y);
    visibleMap.panTo(moveLatLon); 

    setTimeout(() => {
      visibleMap.setLevel(4); 
    }, 400)    
  }

  const myMessageHandler = (event: any) => {
    const sample = event.data
    const data = event.data.data;
    const type = event.data.type;
    if (type=="location") {
      const Lat = data.y.toString().slice(0, 8)
      const Lng = data.x.toString().slice(0, 8)
      setCurrLocation(prev => ({...prev, Lat: Lat, Lng: Lng}))
      // movemove(Lat, Lng)
      if (typeof window !== 'undefined' && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ 
            type: 'test',
            data: { sample, data, Lat, Lng }
          })
        );
      }
    } else if (type=="postHotplace") {
      // getAllHotplace()
      // .then((res) => setHotplaceList(res.data))
    } else if (type=="pickHotPlace") {
      const Lat = data.y.toString().slice(0, -8)
      const Lng = data.x.toString().slice(0, -8)
      setSearchHotPlace({x: Lng, y: Lat})
      // movemove(Lat, Lng)   
      // if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      //   window.ReactNativeWebView.postMessage(
      //     JSON.stringify({ 
      //       type: 'test',
      //       data: { data: `지금 장난 ?, ${Lat}, ${Lng}` }
      //     })
      //   );
      // }
    } else if (type=="entrance") {
      setCurrSpaceId(data.id)
      // if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      // window.ReactNativeWebView.postMessage(
      //   JSON.stringify({ 
      //     type: 'test',
      //     data: { data: `이번에야말로 정말?, ${data.id}` }
      //   })
      // );
      // }
    }
  }

  // native -> web 데이터 수신
  useEffect(() => {
    window.addEventListener("message", (event: any) => myMessageHandler(event))

  // 언마운트시 eventListner remove
  return (
    window.removeEventListener("message", (event: any) => myMessageHandler(event))
  )
  }, [])

  // 현재 입장한 spaceId 갱신 시
  useEffect(() => {
    if (currSpaceId !== 0) {
      getHotplaceUsers(currSpaceId)
      .then((res) => {
        setHotplaceUsers(res.data)
      })
    }
  }, [currSpaceId])

  // 내 위치 돌아가기 버튼 선택시, web- > native 에 내 위치 데이터 보내달라고 요청
  const requestLocation = () => {
    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ 
          type: 'relocation',
        })
      );
    }
  }

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
  }

  // 내 위치로 돌아가기
  async function moveToMypos() {
    if (hotPlaceLatLng.x) {
      await sethotPlaceLatLng({x: "", y: "", flagged: false});
    }
    await requestLocation();
    // await movemove(currLocation.Lat, currLocation.Lng)  
  }

  // 마운트 시, 최초에 map을 그리는 작업 수행
  useEffect(() => {
    window.kakao.maps.load(() => {
      setTimeout(() => {
      var mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      if (hotPlaceLatLng.x) {
        const Lat = hotPlaceLatLng.y.slice(0, -8)
        const Lng = hotPlaceLatLng.x.slice(0, -8)
        var mapOptions = { //지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(Lat, Lng), //지도의 중심좌표.
          level: 4 //지도의 레벨(확대, 축소 정도)
        };
        var map = new kakao.maps.Map(mapContainer, mapOptions); //지도 생성 및 객체 리턴
        setVisibleMap(map) 

        } else {
          var mapOptions = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(currLocation.Lat, currLocation.Lng), //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
          };

          var map = new kakao.maps.Map(mapContainer, mapOptions); //지도 생성 및 객체 리턴
          setVisibleMap(map) 
        }
      }, 200)
      })
  }, [hotPlaceLatLng])

  useEffect(() => {
    movemove(currLocation.Lat, currLocation.Lng)  
  }, [currLocation])

  function setDraggable(draggable: boolean) {
    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
    if (visibleMap) {
      visibleMap.setDraggable(draggable);    
    }
  }

  useEffect(() => {
    movemove(searchHotPlace.y, searchHotPlace.x)
    setCurrSpaceId(0)
    setDraggable(false)
  }, [searchHotPlace])

  // 지도 위에, 내 위치 마커 띄우기
  // useEffect(() => {
  //   setTimeout(() => {
  //     const Lat = currLocation.Lat
  //     const Lng = currLocation.Lng
  //     var markerPosition = new kakao.maps.LatLng(Lat, Lng);

  //     var imageSize = new kakao.maps.Size(40, 45);
  //     var imageSrc = "https://github.com/JiwooPaeng/popmmm/assets/122685653/8f938ed7-61cf-450d-b3fe-4e8ebbf070c9";
  //     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

  //     // 마커를 생성합니다
  //     var marker = new kakao.maps.Marker({
  //       // map: visibleMap,
  //       position: markerPosition,
  //       image: markerImage
  //     });

  //     // 마커가 지도 위에 표시되도록 설정합니다
  //     marker.setMap(visibleMap);
  //     }, 600)  
  //   }, [visibleMap])

  // 검색 시, 지도위에 검색위치 마커 띄우기
  useEffect(() => {
    setTimeout(() => {
      if (!hotPlaceLatLng.flagged) {
        // 내 위치 마커
        // 마커가 표시될 위치입니다 
        const Lat = hotPlaceLatLng.y.slice(0, -8)
        const Lng = hotPlaceLatLng.x.slice(0, -8)
        var markerPosition = new kakao.maps.LatLng(Lat, Lng);

        var imageSize = new kakao.maps.Size(23, 35);
        var imageSrc = "https://github.com/JiwooPaeng/popmmm/assets/122685653/e396e77d-3d6c-4eb0-b169-de888a738092";
        } else {
          var imageSize = new kakao.maps.Size(45, 50);
          var imageSrc = "";
        }

      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        // map: visibleMap,
        position: markerPosition,
        image: markerImage
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(visibleMap);
      }, 600)  
  }, [visibleMap])

  // 표시된 지도 위에, 핫플레이스 마커 띄우는 로직
  useEffect(() => {
    setTimeout(() => {
    // 핫플 마커 띄우기
    var positions = hotplaceList

    if (positions) {
      
      for (var i = 0; i < positions.length; i ++) {
        // console.log(positions[i])
        // 마커 이미지의 이미지 크기 입니다
        
        if (positions[i].placeType==="FLAG") {
          var imageSize = new kakao.maps.Size(40, 45); 
          // 깃발 이미지
          var imageSrc = "https://github.com/JiwooPaeng/popmmm/assets/122685653/b3564221-b312-4f4d-a073-fc14dccb3c15";
        } else {
          var imageSize = new kakao.maps.Size(35, 45);
          if (positions[i].tier===5) {
            var imageSrc = "https://github.com/JiwooPaeng/popmmm/assets/122685653/c1c16fdb-45db-485b-9322-9e74a9f0fef2";
          } else if (positions[i].tier===4) {
            var imageSrc = "https://github.com/JiwooPaeng/popmmm/assets/122685653/4a020cb7-9651-4e8a-9155-4fca453ad39e";
          } else if (positions[i].tier===3) {
            var imageSrc = "https://github.com/JiwooPaeng/popmmm/assets/122685653/0c5546a6-cddf-43c9-8702-aa17801c2231";
          } else if (positions[i].tier===2) {
            var imageSrc = "https://github.com/JiwooPaeng/popmmm/assets/122685653/a8fe3468-f4c0-401f-b6c9-e9d34520bcf1";
          } else {
            var imageSrc = "https://github.com/JiwooPaeng/popmmm/assets/122685653/ef5fd7c4-4e5b-4628-be7f-1ad1fd166574";
        }}
        
        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

        const La = positions[i].y.toString().slice(0, -8)
        const Ma = positions[i].x.toString().slice(0, -8)

        // 마커를 생성합니다
        var hotMarker = new kakao.maps.Marker({
            map: visibleMap, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(La, Ma),
            title : positions[i].placeName,
            image : markerImage // 마커 이미지 
        });

        hotMarker.setMap(visibleMap);

        const place_name = positions[i].placeName
        const road_address_name = positions[i].roadAddressName
        const category_group_name = positions[i].category
        const address = positions[i].addressName
        const id = positions[i].id
        kakao.maps.event.addListener(hotMarker, 'click', function() {
          // 클릭한 위도, 경도 정보를 가져옵니다 
          panToHandler(La, Ma);
          // requestPermission({
          //   id, 
          //   place_name, 
          //   road_address_name, 
          //   category_group_name,
          //   address, 
          // })
          getIdHotplace(id)
          .then((res) => res.data)
          // .then((res) => console.log(res))
          .then((res) => {
            setDraggable(false)
            requestPermission({
            id, 
            place_name, 
            road_address_name, 
            category_group_name, 
            address_name: res.addressName,
            likeCount: res.likeCount,
            phone: res.phone,
            placeType: res.placeType,
            visitorCount: res.visitorCount,
            y: res.y,
            x: res.x,
            tier: res.tier,
            myLike: res.myLike
          })
        }
          )
        })
      }
    }
    
      // 핫플 마커 클릭시 중심으로 이동
      function panToHandler(La: string, Ma: string) {
        // 이동할 위도 경도 위치를 생성합니다 \
        var moveLatLon = new kakao.maps.LatLng(La, Ma);
        
        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        visibleMap.panTo(moveLatLon);
        setTimeout(() => {
          visibleMap.setLevel(2); 
        }, 400)             
      } 
    }, 600)  

    // setTimeout(() => {
    //   // visibleMap.setMap(null);
    //   setVisibleMap(null);
    //   console.log('맵 마커 갱신 완료~~')
    //  } , 700)
}, [visibleMap, hotplaceList])
useEffect(() => {
  if (currSpaceId !== 0) {
    const timeoutId = setTimeout(() => {
      setShowHotPlaceUsers(true);
    }, 550);

    return () => clearTimeout(timeoutId); // Cleanup on component unmount or when currSpaceId changes
  } else {
    setShowHotPlaceUsers(false); // Reset showHotPlaceUsers when currSpaceId is 0
  }
}, [currSpaceId]);

  return (
  <div className={`container`}>
    {/* <div className={styles.search}>Search...</div> */}
    
    {/* <div className={`Box`} id={`top`}></div> */}
    {/* <div className={`Box`} id={`left`}></div>
    <div className={`Box`} id={`right`}></div>
    <div className={`Box`} id={`bottom`}></div> */}

    <img
        className={`Box`} id={`top`}
        src={stars} 
        alt="top"
      />
    <img
        className={`Box`} id={`left`}
        src={stars}
        alt="left"
      />
    <img
        className={`Box`} id={`right`}
        src={stars}
        alt="right"
      />
    <img
        className={`Box`} id={`bottom`}
        src={stars}
        alt="bottom"
      />

    <img
        className="sideRocket"
        src={rocket} 
        alt="sideRocket"
      />
    <img
        className="sideStar"
        src={Star2} 
        alt="sideStar"
      />


    {showHotPlaceUsers && 
    <>
      <HotPlaceUsers hotplaceUsers={hotplaceUsers} />

    </>
    }

    {currSpaceId && (
      <button onClick={() => {
        setDraggable(true)
        setCurrSpaceId(0);
        setHotplaceUsers([])
        }} className={styles.draggable}>
        <div style={{marginTop: '3px'}}><BsFire color={'#8B90F7'}/></div>
        <div className={styles.draggableText}>다른 핫플레이스로 이동</div>
      </button>
    )}

    {/* <button onClick={() => {
      // setDraggable(true)
      setCurrSpaceId(0);
      setCurrSpaceId(currSpaceId);
      // setHotplaceUsers([])
      }} className={styles.refreshUser}>
      <div style={{marginTop: '3px'}}><BsFire color={'#8B90F7'}/></div>
      <div className={styles.refreshUserText}>사용자 정보 갱신</div>
    </button> */}

    <div id="map" className={styles.container}></div>

    <button className={styles.mypos} onClick={() => {
      moveToMypos();
      setCurrSpaceId(0);
      setHotplaceUsers([])
      setDraggable(true)
    }}>
      <BiSolidRocket size={25} color={'#8B90F7'}/>
    </button>

    
  </div>
  )
}