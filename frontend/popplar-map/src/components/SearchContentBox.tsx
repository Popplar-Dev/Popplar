import styles from './styles/searchContentBox.module.css'
import { Place } from '../types/place'

import flag from '../assets/images/flag-iso-color.png'

import { getIdHotplace } from '../api/getHotplace'

type Props = {
  place: Place
  placePosHandler: (x: string, y: string, status: boolean) => void
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
    getIdHotplace(place.id)
    .then((res) => {
      placePosHandler(place.x, place.y, true);
      const placeData = {
        id: res.data.id,
        place_name: res.data.placeName,
        address_name: res.data.addressName,
        road_address_name: res.data.roadAddressName,
        category_group_name: res.data.category,
        likeCount: res.data.likeCount,
        phone: res.data.phone,
        placeType: res.data.placeType,
        visitorCount: res.data.visitorCount,
        y: res.data.y,
        x: res.data.x,
        tier: res.data.tier,
        myLike: res.data.myLike
      }
      requestPermission(placeData)
      console.log('여기에 정보 들어와요', res.data)
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        console.log('정보 이쪽으로!', place)
        placePosHandler(place.x, place.y, false);
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