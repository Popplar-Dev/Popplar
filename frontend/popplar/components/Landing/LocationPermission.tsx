import { Linking, View, Text, Alert } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useRecoilState } from 'recoil';
import { locationState } from '../recoil/locationState'

import { requestPermission } from '../../utils/reqLocationPermission'

type Here = {
  granted: string
  y: string
  x: string
}

export default function LocationPermission() {
  const [location, setLocation] = useRecoilState<Here>(locationState);
  const navigation = useNavigation();

  useEffect(() => {
    requestPermission().then(result => {
      if (result==="granted") {
        setLocation(prev => ({...prev, granted: result as string}))
        navigation.navigate('BottomTab' as never);
      } else {
        Alert.alert(
          '위치 추적 허용',     
          '사용자 위치 확인을 위해 위치 정보 제공 동의를 해주세요! (위치 추적 허용하지 않을 경우, poopplar 이용이 불가능합니다 😥)',
          [
            {
              text: '설정 > 위치 추적 허용',
              onPress: () => Linking.openSettings(), 
            },
          ],
          { cancelable: false }
        );
      }
    })
  }, [])

  return (
  <View>
    <Text>위치 추적을 허용하고, popplar를 이용해보세요!</Text>
  </View>
  )
}