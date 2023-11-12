import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

import { getHotplaceUsers } from '../services/postLocation'
import { generateRandomMarkers } from './randomPosition'

type Props = {
  id: number
}

export default function HotplaceUsers({ id }: Props) {
  const [userCount, setUserCount] = useState<number>(0)
  const [HotplaceUsers, setHotplaceUsers] = useState({})

  // 현재 핫플레이스에 몇명 있는지 불러오기
  useEffect(() => {
    console.log(id)
    getHotplaceUsers(id)
    .then((res) => {
      setHotplaceUsers(res.data)
      setUserCount(res.data.length)}
    )
  }, [])

  // 핫플레이스에 임의의 마커 표시
  useEffect(() => {
    const markers = generateRandomMarkers(userCount)
    console.log(markers)
  }, [userCount])

return (
    <View style={styles.container}></View>
  );
};


const styles = StyleSheet.create({                           
	container: {

  }
});