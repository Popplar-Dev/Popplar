import styles from './styles/searchContentBox.module.css'
import { Place } from '../types/place'

import flag from '../assets/images/flag-iso-color.png'

import { getIdHotplace } from '../api/getHotplace'

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
    // setHotPlaceInfo(place);
    placePosHandler(place.x, place.y);
    getIdHotplace(place.id)
    .then((res) => {
      requestPermission(res.data)
      console.log('여기에 정보 들어와요', res.data)
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        requestPermission(place)
    }});
  }
  
  return(
  <button className={styles.seachbox} onClick={() => placeSelectHandler()}>
    <div style={{display: "flex"}}>
      <img src={flag} alt="flag" style={{ width: "35px", height: "35px" }}/>
      <div className={styles["place"]}>
        <div className={styles["place-name"]}>{place.place_name}</div>
        <div className={styles["place-category"]}>{place.category_group_name}</div>
      </div>
    </div>

    {/* <div className={styles.name}>{place.category_name}</div> */}
    <div className={styles["address-name"]}>{place.road_address_name}</div>
    {/* <div className={styles.name}>{place.address_name}</div> */}
    <div className={styles["phone-number"]}>{place.phone}</div>
  </button>
  )
}