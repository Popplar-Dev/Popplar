import './styles/frame.css'
import styles from './styles/search.module.css'

import { Place } from '../types/place'

type Props = {
  result: Place[] | null
}

export default function Search ({ result }: Props) {
  
  return (
    <div className={`container`}>
      {result && result.map((place) => 
        (
        <>
          <div className={styles.name}>{place.place_name}</div>
          <div className={styles.name}>{place.road_address_name}</div>
          <div>{place.category_group_code}</div>
          <div>{place.category_group_name}</div>
          <div>{place.category_name}</div>
          <div>{place.phone}</div>
          <div>{place.road_address_name}</div>
          <div>{place.x}</div>
          <div>{place.y}</div>
        </>
      ))}
    </div>
  )
}