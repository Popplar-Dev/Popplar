import { useEffect, useRef, useState } from 'react';
import './userMarker.css'

import { FaMapMarkerAlt } from 'react-icons/fa'

type Props = {
  user: {
    hotPlaceId: number
    memberId: number
    x: number
    y: number
  }
}

export default function UserMarker({ user }: Props) {
  // const [selectUser, setSelectUser] = useState<boolean>(false)
  const translateYRef = useRef(0);

  const fallAndRebound = () => {
    translateYRef.current = 0;
    setTimeout(() => {
      translateYRef.current = -5;
      fallAndRebound(); // Repeat the animation
    }, 500);
  };

  useEffect(() => {
    fallAndRebound();
  }, []); // Similar to componentDidMount

  const handleUserInfo = () => {
    // console.log('hiiiiiiiiiiii')
    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ 
          type: 'user',
          data: { data: user.memberId }
        })
      );
    }
  }

  return (
    <div className="animated-container" onClick={() => handleUserInfo()}>
      <div className="fall-and-rebound" style={{ transform: `translateY(${translateYRef.current}px)` }}>
        <i className="icon" style={{ color: "red"}}>▼</i>
      </div>
      <i className="map-marker-icon"><FaMapMarkerAlt /></i>
    </div>
  );
}