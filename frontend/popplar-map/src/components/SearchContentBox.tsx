import styles from './styles/searchContentBox.module.css'
import { Place } from '../types/place'

import flag from '../assets/images/flag-iso-color.png'

type Props = {
  place: Place
  placeSelectHandler: (x: string, y: string) => void
}

export default function SearchContentBox({ place, placeSelectHandler }: Props) {
  return(
  <button className={styles.seachbox} onClick={() => placeSelectHandler(place.x, place.y)}>
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