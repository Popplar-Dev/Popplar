import React, { useState, useEffect } from 'react';
import { View, Platform, PermissionsAndroid, Alert  } from 'react-native';
import Geolocation from "react-native-geolocation-service";
import { Linking } from 'react-native';

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

export default function GeolocationPermission() {
  const [location, setLocation] = useState();

  useEffect(() => {
    requestPermission().then(result => {
      console.log({ result });
      if (result === "granted") {
        Geolocation.getCurrentPosition(
          pos => {
            console.log(pos)
            // setLocation(pos.coords);
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