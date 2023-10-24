import { useEffect, useState } from 'react';
import styles from './app.module.css'
import './App.css';

import Map from './pages/Map'
import Search from './pages/Search'

function App() {
  const [placeKeyword, setPlaceKeyword] = useState("")

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    // let vw = window.innerWidth * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    // document.documentElement.style.setProperty("--vw", `${vw}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <div className={styles.searchInput}>
          <input type="text" placeholder="검색어를 입력하세요" onChange={e => setPlaceKeyword(e.target.value)}/>
        </div>

        {!placeKeyword ?
        <Map />
        : <Search />
        }
      </div>
    </div>
  );
}

export default App;
