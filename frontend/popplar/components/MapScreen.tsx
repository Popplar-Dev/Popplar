import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import WebView from 'react-native-webview';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type SpaceInfo = {
  name: string
  address: string
}

const MapScreen: React.FC = () => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>({})

  // bottom-sheet
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['35%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  // backdrop close by pressing background
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );


  let webRef = useRef<WebView | null>(null);

  /* native -> web */
  const native_to_web = () => {
    if (webRef.current) {
      console.log(webRef.current.postMessage("전송 데이터(React) : 웹으로 데이터 전송"));
    }
  }

  /* web -> native */
  const web_to_native = (e) => {
    console.log(e.nativeEvent.data);
  }

  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLogitude] = useState<any>(null);

  const geoLocation = () => {
    // 사용자의 위치를 감지
    Geolocation.getCurrentPosition(
        position => {
            const latitude = JSON.stringify(position.coords.latitude);
            const longitude = JSON.stringify(position.coords.longitude);

            setLatitude(latitude);
            setLogitude(longitude);
        },
        error => { console.log(error.code, error.message); },
        {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
    )
    
    // 사용자의 위치 변화를 감지
    Geolocation.watchPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude =  JSON.stringify(position.coords.longitude);

        console.log('move', latitude, longitude)
      },
      error => { console.log(error.code, error.message); },
      {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
    )
  }

  useEffect(() => {
    geoLocation();
  })

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: '#2C2C2C' }}
        >
          
          <View>
            {spaceInfo.name && <Text style={styles.bottomSheetText}>{spaceInfo.name}</Text>}
            <Text style={styles.bottomSheetText}>{spaceInfo.address}</Text>
          </View>
        </BottomSheetModal>

        {/* <Button title={'postMessage'} onPress={native_to_web}></Button>
        <Button title="Get GeoLocation" onPress={() => geoLocation()}/> */}
        {/* <Text style={{ color: "white" }}> latitude: {latitude} </Text>
        <Text style={{ color: "white" }}> longitude: {longitude} </Text> */}
        <WebView 
          ref={webRef}
          style={styles.webview}
          source={{uri: 'https://jiwoopaeng.github.io/popmmm/'}}
          javaScriptEnabled={true}
          onLoad={native_to_web}
          onMessage={(event) => {
            handlePresentModalPress();
            const data = JSON.parse(event.nativeEvent.data)
            setSpaceInfo(data.data)
            // console.log("받은 데이터(React) : " + data.data);
          }}
        />
      </View>
    </BottomSheetModalProvider>
  </GestureHandlerRootView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  bottomSheetText: {
    backgroundColor: '#2C2C2C',
    color: 'white',
  },
})
