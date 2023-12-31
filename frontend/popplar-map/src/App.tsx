import { useEffect, useState } from 'react';
import styles from './app.module.css'
import './App.css';

import { useRecoilState } from 'recoil';
import { HotLatLngState } from "./recoil/hotLatLng/index";
import { HotPlaceInfo } from "./recoil/hotPlaceInfo/index";
import { LatLng, HotPlace } from './types/LatLng'

import Map from './pages/Map'
import Search from './pages/Search'
import NeonFrame from './components/NeonFrame';
import earthRocket from './assets/images/earth-rocket.png'

import { IoTelescopeSharp } from 'react-icons/io5'
import { RiCloseCircleFill } from 'react-icons/ri'
import { Place } from './types/place'

import HotPlaceUsers from './components/HotPlaceUsers/HotPlaceUsers'

const { kakao } = window;

function App() {
  const [placeKeyword, setPlaceKeyword] = useState<string>("")
  const [searchPlaceObj, setSearchPlacObj] = useState<any | null>(null)
  const [searchResult, setSearchResult] = useState<Place[] | null>(null);
  // 검색시 선택된 hotplace의 위도 경도 정보 recoil로 저장
  const [hotPlaceLatLng, sethotPlaceLatLng] = useRecoilState<HotPlace>(HotLatLngState);

  function placeSelectClick (x: string, y: string, id: number, status: boolean) {
    setPlaceKeyword("")
    const LatLngInfo = {x: x, y: y, id: id, flagged: status}
    sethotPlaceLatLng(LatLngInfo)
  }
  
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  // 장소 검색 관련 로직
  useEffect(() => {
    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();  
    setSearchPlacObj(ps)
  }, [])

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data: any, status: any, pagination: any) {
    if (status === kakao.maps.services.Status.OK) {

        setSearchResult(data)
    } 
  }

  // 키워드 검색을 요청하는 함수입니다
  function searchPlaces() {

    const keywordInput: HTMLInputElement | null = document.getElementById('keyword') as HTMLInputElement
    if (keywordInput) {
      const keyword: string = keywordInput.value.trim();
    
      if (searchPlaceObj && keyword) {
        searchPlaceObj.keywordSearch(keyword, placesSearchCB)
      }
    }
  }

  return (
    <div className={styles.container}>
      {/* <NeonFrame /> */}
      {/* <IoTelescopeSharp size="28" className={styles.telescope}/> */}
      {/* <div className={styles["telescope-background"]}></div> */}
      {/* <img src={earthRocket} className={styles["earth-icon"]} alt="Earth Icon"/>

      {!placeKeyword ?
      (<div className={styles.message}>all spaces detected...</div>)
      :(<div className={styles.message}>search mode connected...</div>)
      } */}

      {placeKeyword &&
      (<>
          <div className={styles["bg-top"]}></div>
          <div className={styles["bg-bottom"]}></div>
      </>)
      }

      {/* <div className={styles.search}>Search...</div> */}
        <div className={styles.map}>
          <div className={styles.searchInput}>
            <input type="text" id='keyword' value={placeKeyword} placeholder="장소 검색..." onChange={
            e => {
              setPlaceKeyword(e.target.value);
              setTimeout(() => {
                searchPlaces()
              }, 300) 
              }
            }/>
            {placeKeyword &&
            <>
              <button className={styles["del-button"]} onClick={() => {
                setPlaceKeyword("");
              }}>
                <RiCloseCircleFill className={styles["del-input"]}/>
              </button>
              <div className={styles["del-background"]}></div>
            </>
            }
        </div>

        {!placeKeyword ?
        <Map />
        : (
        <Search result={searchResult} placeSelectClick={placeSelectClick}/>
        )}

      </div>
    </div>
  );
}

export default App;
