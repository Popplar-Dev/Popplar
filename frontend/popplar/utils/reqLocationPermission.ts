import { View, Platform, PermissionsAndroid, Alert  } from 'react-native';

export async function requestPermission() {
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