import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { requestPermission } from '../../utils/reqLocationPermission'
import { useRecoilState } from 'recoil';
import { locationState } from '../recoil/locationState'

type Here = {
  granted: string
  y: string
  x: string
}

export default function LocationPermission() {
  const [location, setLocation] = useRecoilState<Here>(locationState);

  useEffect(() => {
    requestPermission().then(result => {
      setLocation(prev => ({...prev, granted: result as string}))
    })
  }, [])

  return (
  <View>
    <Text>위치 추적을 허용하고, popplar를 이용해보세요!</Text>
  </View>
  )
}