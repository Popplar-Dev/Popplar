import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import NameBox from './NameBox/NameBox'
import { FlipInEasyX } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type SpaceInfo = {
  place_name: string
  road_address_name: string
  category_name: string
  category_group_name: string
  id: string
  phone: string
  place_url: string
}

const MapScreen: React.FC = () => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>({})

  // bottom-sheet
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['27.6%', '95%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    console.log('pop!!')
  }, [spaceInfo]);
  const handleSheetChanges = useCallback((index: number) => {
    // bottomSheetModalRef.current?.present();
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
          
          <View style={styles.bottomsheetContainer}>
            <View style={styles.spaceName}>
              <NameBox w={200} h={38} text={spaceInfo.place_name} />
              <View style={styles.buttons}>
                <Icon name="comments" size={20} color={'white'} style={styles.Icon}/>
                <Icon name="gamepad" size={20} color={'white'} style={styles.Icon}/>
                <Icon name="flag-checkered" size={20} color={'white'} style={styles.Icon}/>
              </View>
            </View>

          <View style={styles.previewContainer}>
            <View style={styles.previewTopContainer}>
              <View style={styles.address}>
                <Icon name="map-pin" size={11} color={'white'} style={styles.mapIcon}/>
                <Text style={styles.bottomSheetAddress}>{spaceInfo.road_address_name}</Text>
              </View>
              <Text style={styles.bottomSheetCategory}>{spaceInfo.category_group_name}</Text>
            </View>
            <View style={styles.address}>
              <Icon name="phone" size={11} color={'white'} style={styles.phoneIcon}/>
              <Text style={styles.bottomSheetPhone}>{spaceInfo.phone}</Text>
            </View>
          </View>

          <View style={styles.placeDetail}>
            <View style={styles.info}>
              <Icon name="map-pin" size={11} color={'white'} style={styles.mapIcon}/>
              <Text style={styles.bottomSheetPhone}>{spaceInfo.place_url}</Text>
            </View>
          </View>
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
            // console.log(data?.type)
            console.log(data.data)
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
    justifyContent: 'space-between',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  bottomSheetAddress: {
    backgroundColor: '#2C2C2C',
    color: 'white',
    marginTop: 4,
  },
  bottomSheetCategory: {
    color: 'white',
    marginTop: 4,
    // borderWidth: 1, 
    // borderColor: 'red', 
  },
  bottomSheetPhone: {
    backgroundColor: '#2C2C2C',
    color: 'white',
    // marginTop: 10,
  },
  bottomsheetContainer: {
    flex: 1,
    padding: 5,
    paddingLeft: 20,

    // borderWidth: 1, 
    // borderColor: 'red', 
  },
  spaceName: {
    flex: 0.06, 
    flexDirection: 'row', 
    height: 30, 
    justifyContent: "space-between"
  },
  previewContainer: {
    flex: 0.1,
    marginTop: 10,
    marginBottom: 12,
    lineHeight: 40,
  },
  previewTopContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    lineHeight: 40,
    paddingRight: 20,
    // width: 185, 
    // borderWidth: 1, 
    // borderColor: 'red', 
  },
  address: {
    flex: 1,
    flexDirection: 'row',
    lineHeight: 40,
    width: 185, 
    // borderWidth: 1, 
    // borderColor: 'red', 
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    lineHeight: 40,
  },
  mapIcon: {
    margin: 8,
    marginTop: 8,
    marginLeft: 11,
  },
  phoneIcon: {
    margin: 8,
    marginTop: 5,
    marginLeft: 10,
  },
  Icon: {
    marginLeft: 13,
    marginTop: 10,
  },
  buttons: {
    flex: 1, 
    flexDirection: 'row', 
    paddingRight: 20, 
    justifyContent: "flex-end", 
    height: 40, 
    // borderWidth: 1, 
    // borderColor: 'red',
  },
  placeDetail: {
    flex: 0.1,
    // borderWidth: 1, 
    // borderColor: 'red',
  }
})
