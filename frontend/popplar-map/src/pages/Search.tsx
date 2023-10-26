import './styles/frame.css'
import styles from './styles/search.module.css'

import { Place } from '../types/place'

type Props = {
  result: Place[] | null
  placeSelectClick: () => void
}

export default function Search ({ result, placeSelectClick }: Props) {

  function placeSelectHandler () {
    placeSelectClick()
  }
  
  return (
    <div className={`container`}>
      {result && result.map((place) => 
        (
        <button className={styles.seachbox} onClick={placeSelectHandler}>
          <div className={styles.name}>{place.place_name}</div>
          <div className={styles.name}>{place.road_address_name}</div>
          <div className={styles.name}>{place.category_group_code}</div>
          <div className={styles.name}>{place.category_group_name}</div>
          <div className={styles.name}>{place.category_name}</div>
          <div className={styles.name}>{place.phone}</div>
          <div className={styles.name}>{place.road_address_name}</div>
          <div className={styles.name}>{place.x}</div>
          <div className={styles.name}>{place.y}</div>
        </button>
      ))}
    </div>
  )
}