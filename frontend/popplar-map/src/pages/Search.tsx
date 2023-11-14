import './styles/frame.css'
import styles from './styles/search.module.css'

import { useEffect } from 'react'
import { Place } from '../types/place'
import SearchContentBox from '../components/SearchContentBox'

type Props = {
  result: Place[] | null
  placeSelectClick: (x: string, y: string, status: boolean) => void
}

export default function Search ({ result, placeSelectClick }: Props) {

  function placeSelectHandler (x: string, y: string, status: boolean) {
    placeSelectClick(x, y, status)
  }

  useEffect(() => {
    window.addEventListener('resize', function() {
      let vh = window.innerHeight * 0.01;
      // let vw = window.innerWidth * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, [])
  
  return (
    <div className={styles.container}>

      <div className={styles["result-container"]}>
      {result && result.map((place) => 
        ( 
        <SearchContentBox place={place} placePosHandler={placeSelectHandler}/>
        ))}
      </div>
    </div>
  )
}