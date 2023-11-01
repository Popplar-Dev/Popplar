import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { getAllHotplace } from './services/getHotplace'

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import NameBox from './NameBox/NameBox'
import PlaceOptionBox from './PlaceOptionBox/PlaceOptionBox'
import { FlipInEasyX } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type SpaceInfo = {
  id: string
  place_name: string
  road_address_name: string
  category_group_name: string
  likeCount: number
  phone: string
  placeType: string
  visitorCount: number
  y: string
  x: string
  // place_url: string
}

const MapScreen: React.FC = () => {

  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>({})
  // bottom-sheet
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['26.95%', '95%'], []);

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
  }, [])

  useEffect(() => {
    getAllHotplace()
    .then((res) => console.log(res))
  }, [])

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
          
          <View style={styles.spaceName}>
            <NameBox w={200} h={38} text={spaceInfo.place_name} />
            <View style={styles.buttons}>
              <Icon name="comments" size={20} color={'white'} style={styles.Icon}/>
              <Icon name="gamepad" size={20} color={'white'} style={styles.Icon}/>
              <Icon name="flag-checkered" size={20} color={'white'} style={styles.Icon}/>
            </View>
          </View>
          <View style={styles.bottomsheetContainer}>

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
              {spaceInfo.phone ? 
              (<Text style={styles.bottomSheetPhone}>{spaceInfo.phone}</Text>)
              :(<Text style={styles.bottomSheetPhone}>번호가 없습니다</Text>)}
            </View>
          </View>

          {/* <View style={styles.placeDetail}>
            <View style={styles.info}>
              <Icon name="globe" size={11} color={'white'} style={styles.globeIcon}/>
              {spaceInfo.place_url ? 
              (<Text style={styles.bottomSheetPhone}>{spaceInfo.place_url}</Text>)
              : (<Text style={styles.bottomSheetPhone}>페이지 주소가 없습니다</Text>)
              }
            </View>
          </View> */}
        
          <View style={styles.qnaContainer}>
            <View style={styles.qnaTitle}>
              <Icon name="question" size={16} color={'white'} style={styles.qnaIcon}/>
              <Text style={styles.optionName}>Q & A</Text>
            </View>
            <View style={styles.answerContainer}>
              <Text>여기 답변 출력될거예요</Text>
            </View>
          </View>

          <View style={styles.placeBottomContainer}>
            <PlaceOptionBox type="chat"/>
            <PlaceOptionBox type="game"/>
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
    paddingRight: 20,

    // borderWidth: 1, 
    // borderColor: 'red', 
  },
  spaceName: {
    flex: 0.06, 
    flexDirection: 'row',
    marginLeft: 20, 
    height: 30, 
    justifyContent: "space-between"
  },
  previewContainer: {
    flex: 0.1,
    marginTop: 10,
    marginBottom: 8,
    lineHeight: 40,
  },
  previewTopContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    lineHeight: 40,
    paddingRight: 20,
    marginBottom: 10,
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
    marginTop: 8,
    marginLeft: 11,
    marginRight: 9,
  },
  phoneIcon: {
    margin: 8,
    marginTop: 5,
    marginLeft: 9,
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
    flex: 0.06,
    // borderWidth: 1, 
    // borderColor: 'red',
  },
  globeIcon: {
    margin: 5,
    marginRight: 8,
    marginLeft: 9,
  },
  qnaContainer: {
    flex: 0.4,
    marginTop: 5,
    // borderWidth: 1, 
    // borderColor: 'red',
  },
  qnaIcon: {
    margin: 9,
  },
  qnaTitle: {
    flex: 0.2,
    justifyContent: 'center',
    flexDirection: 'row',
    // borderWidth: 1, 
    // borderColor: 'red',
  },
  optionName: {
    color: 'white',
    fontSize: 25,
    width: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginLeft: 5,
    // borderWidth: 1, 
    // borderColor: 'red',
  },
  answerContainer: {
    flex: 0.8,
    marginTop: 9,
    backgroundColor: '#8B90F7',
    borderRadius: 20,
    opacity: 0.5,
    height: 2,
    // borderWidth: 1, 
    // borderColor: 'red',
  },
  placeBottomContainer: {
    flex: 0.35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    // borderWidth: 1, 
    // borderColor: 'red',
  },
})
