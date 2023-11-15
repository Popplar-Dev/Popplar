import { useEffect, useRef, useState } from 'react';
import './HotPlaceUsers.css'

import UserMarker from '../UserMarker/UserMarker'
import { getHotplaceUsers } from '../../api/postLocation'
import { generateRandomMarkers } from './randomPositions'

type Props = {
  hotplaceUsers: user[]
}

type user = {
  hotPlaceId: number
  memberId: number
  x: number
  y: number
}

type markers = {
  id: number
  position: {
    left: string
    top: string
  }
}

export default function HotPlaceUsers({ hotplaceUsers }: Props) {
  // const [HotplaceUsers, setHotplaceUsers] = useState<user[]>([])
  const [markerPositions, setMarkerPositions] = useState<markers[]>([])

  useEffect(() => {
    // getHotplaceUsers(id)
    // .then((res) => {
    //   console.log('user 정보', res.data)
    //   setHotplaceUsers(res.data)
    
    const markers = generateRandomMarkers(hotplaceUsers.length)
    console.log('markers', markers[0])
    setMarkerPositions(markers)
    }, [hotplaceUsers]);

  return (
    <>
      {(hotplaceUsers && markerPositions.length > 0) &&
      hotplaceUsers.map((user, i) => (
        <div key={i} className="point" style={{top: markerPositions[i].position.top, left: markerPositions[i].position.left}}>
          <UserMarker user={user}/>
        </div>
      ))}

      <div>
        
      </div>
    </>
  );
}