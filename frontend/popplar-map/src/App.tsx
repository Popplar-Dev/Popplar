import { useEffect, useState } from 'react';
import styles from './app.module.css'
import './App.css';

import Map from './pages/Map'
import Search from './pages/Search'

import { Place } from './types/place'

const { kakao } = window;

function App() {
  const [placeKeyword, setPlaceKeyword] = useState<string>("")
  const [searchPlaceObj, setSearchPlacObj] = useState<any | null>(null)
  const [searchResult, setSearchResult] = useState<Place[] | null>(null);

  function placeSelectClick () {
    setPlaceKeyword("")

  }
  
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    // let vw = window.innerWidth * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    // document.documentElement.style.setProperty("--vw", `${vw}px`);
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

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        // displayPlaces(data);

        // 페이지 번호를 표출합니다
        // displayPagination(pagination);

    } 
    // else if (status === kakao.maps.services.Status.ZERO_RESULT) {

    //     alert('검색 결과가 존재하지 않습니다.');
    //     return;

    // } else if (status === kakao.maps.services.Status.ERROR) {

    //     alert('검색 결과 중 오류가 발생했습니다.');
    //     return;

    // }
  }

  // 키워드 검색을 요청하는 함수입니다
  function searchPlaces() {

    const keywordInput: HTMLInputElement | null = document.getElementById('keyword') as HTMLInputElement
    if (keywordInput) {
      const keyword: string = keywordInput.value.trim();
    
      // if (!keyword.replace(/^\s+|\s+$/g, '')) {
      //   alert('키워드를 입력해주세요!');
      //   return false;
      // }
      
      // if (!keyword.replace(/^\s+|\s+$/g, '')) {
      //   alert('키워드를 입력해주세요!');
      //   return false;
      // }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      if (searchPlaceObj && keyword) {
        searchPlaceObj.keywordSearch(keyword, placesSearchCB)
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <div className={styles.searchInput}>
          <input type="text" id='keyword' value={placeKeyword} placeholder="search..." onChange={
            e => {
              setPlaceKeyword(e.target.value);
              console.log(e.target.value)
              setTimeout(() => {
                searchPlaces()
              }, 300) 
              }
            }/>
        </div>

        {!placeKeyword ?
        <Map />
        : <Search result={searchResult} placeSelectClick={placeSelectClick}/>
        }
      </div>
    </div>
  );
}

export default App;
