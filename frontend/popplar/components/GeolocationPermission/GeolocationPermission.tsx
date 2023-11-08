import React, { useState, useEffect } from 'react';
import { View, Platform, PermissionsAndroid, Alert  } from 'react-native';
// import Geolocation from "react-native-geolocation-service";
import Geolocation from '@react-native-community/geolocation';
import { Linking } from 'react-native';

import { useRecoilState } from 'recoil';
import { locationState } from '../recoil/locationState'

async function requestPermission() {
  try {
    // if (Platform.OS === "ios") {
    //   return await Geolocation.requestAuthorization("always");
    // }
    // 안드로이드 위치 정보 수집 권한 요청
    if (Platform.OS === "android") {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

type Here = {
  granted: string
  y: string
  x: string
}

export default function GeolocationPermission() {
  const [location, setLocation] = useRecoilState<Here>(locationState);

  useEffect(() => {
    requestPermission().then(result => {
      console.log(result);
      console.log(typeof result)
      setLocation(prev => ({...prev, granted: result as string}))
      if (result === "granted") {
        Geolocation.getCurrentPosition(
          pos => {
            console.log('IM HERE', pos)
            const lat = pos.coords.latitude.toString()
            const lng = pos.coords.longitude.toString()
            setLocation(prev => ({...prev, y: lat, x: lng }))
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 3600,
            maximumAge: 3600,
          },
        );
      } else {
        Alert.alert(
          '제목', '내용',
          [
            {
              text: '확인',
              onPress: () => Linking.openSettings()
            },
          ],
          {cancelable: false}
        );
      }
    });
  }, []);

  return (
    <View></View>
  );
};