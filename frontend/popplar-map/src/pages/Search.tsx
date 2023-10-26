import './styles/frame.css'

import { Place } from '../types/place'

type Props = {
  result: Place[] | null
}

export default function Search ({ result }: Props) {
  return (
    <div className={`container`}>
      {result && result.map((place) => (
        <>
          <div>{place.place_name}</div>
          <div>{place.road_address_name}</div>
        </>
      ))}
    </div>
  )
}