import styles from './styles/searchContentBox.module.css'
import { Place } from '../types/place'

import flag from '../assets/images/flag-iso-color.png'

type Props = {
  place: Place
  placePosHandler: (x: string, y: string) => void
}

export default function SearchContentBox({ place, placePosHandler }: Props) {

  const requestPermission = (data: any) => {
  
    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ 
          type: 'place',
          data: data
        })
      );
    }
  }

  function placeSelectHandler() {
    placePosHandler(place.x, place.y)
    console.log(place)
    requestPermission(place)
    // setHotPlaceInfo(place)
  }
  
  return(
  <button className={styles.seachbox} onClick={() => placeSelectHandler()}>
    <div style={{display: "flex"}}>
      <img src={flag} alt="flag" style={{ width: "35px", height: "35px" }}/>
      <div className={styles["place"]}>
        <div className={styles["place-name"]}>{place.place_name}</div>
      </div>
    </div>
    <div className={styles["infos-category"]}>{place.category_name}</div>

    {/* <div className={styles.name}>{place.category_name}</div> */}
    <div className={styles["infos"]}>{place.road_address_name}</div>
    {/* <div className={styles.name}>{place.address_name}</div> */}
    <div className={styles["infos"]}>{place.phone}</div>
  </button>
  )
}