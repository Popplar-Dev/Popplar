import { useEffect, useRef } from 'react';
import './userMarker.css'

import { FaMapMarkerAlt } from 'react-icons/fa'

export default function UserMarker() {
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

  return (
    <div className="animated-container">
      <div className="fall-and-rebound" style={{ transform: `translateY(${translateYRef.current}px)` }}>
        <i className="icon" style={{ color: "red"}}>▼</i>
      </div>
      <i className="map-marker-icon"><FaMapMarkerAlt /></i>
    </div>
  );
}