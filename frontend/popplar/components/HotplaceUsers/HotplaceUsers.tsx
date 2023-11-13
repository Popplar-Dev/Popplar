import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

import { getHotplaceUsers } from '../services/postLocation'
import { generateRandomMarkers } from './randomPosition'

import UserMarker from './UserMarker'

type Props = {
  id: number
}

type user = {
  hotPlaceId: number
  id: string
  memberId: number
  x: number
  y: number
}

type markers = {
  id: number
  position: {
    left: number
    top: number
  }
}

export default function HotplaceUsers({ id }: Props) {
  // const [userCount, setUserCount] = useState<number>(0)
  const [HotplaceUsers, setHotplaceUsers] = useState<user[]>([])
  const [markerPositions, setMarkerPositions] = useState<markers[]>([])

  // 현재 핫플레이스에 몇명 있는지 불러오기
  useEffect(() => {
    console.log(id)
    getHotplaceUsers(id)
    .then((res) => {
      console.log('user 정보', res.data)
      setHotplaceUsers(res.data)
    
      const markers = generateRandomMarkers(res.data.length)
      console.log('markers', markers[0])
      setMarkerPositions(markers)
    }
    )
  }, [])

  // // 핫플레이스에 임의의 마커 표시
  // useEffect(() => {
  //   const markers = generateRandomMarkers(1)
  //   console.log('markers', markers[0] )
  //   setMarkerPositions(markers)
  // }, [userCount])

return (
  <>
    {/* <View style={styles.container}> */}
      {HotplaceUsers && markerPositions.length > 0 &&
      HotplaceUsers.map((user, i) => (
        <View key={i} style={[styles.point, {top: Number(markerPositions[i].position.top), left: Number(markerPositions[i].position.left)}]}>
          <UserMarker />
        </View>
      ))}
    {/* </View> */}
  </>
  );
};


const styles = StyleSheet.create({                           
	container: {
    position: 'absolute',
    top: 160, // 상단 여백
    left: 60, // 좌측 여백
    width: 300,
    height: 520,
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // 반투명 빨간 배경
    zIndex: 0.5, // 웹뷰 위에 보이도록 함
  },
  point: {
    position: 'absolute',
    width: 20,
    height: 50,
    zIndex: 0.8, // 웹뷰 위에 보이도록 함
    // backgroundColor: 'rgba(255, 0, 0, 0.5)', // 반투명 빨간 배경
    // borderWidth: 2, 
    // borderColor: 'red', 
  }
});