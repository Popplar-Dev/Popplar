import './styles/frame.css'
import styles from './styles/search.module.css'

import { Place } from '../types/place'
import SearchContentBox from '../components/SearchContentBox'

type Props = {
  result: Place[] | null
  placeSelectClick: (x: string, y: string) => void
}

export default function Search ({ result, placeSelectClick }: Props) {

  function placeSelectHandler (x: string, y: string) {
    placeSelectClick(x, y)
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.message}>search mode connected...</div>

      {result && result.map((place) => 
        ( 
        <SearchContentBox place={place} placeSelectHandler={placeSelectHandler}/>
      ))}
    </div>
  )
}