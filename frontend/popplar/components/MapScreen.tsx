import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { Platform, PermissionsAndroid } from "react-native";
import { Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HotRegisterButton from './HotRegisterButton/HotRegisterButton'

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import NameBox from './NameBox/NameBox'
import PlaceOptionBox from './PlaceOptionBox/PlaceOptionBox'
import GeolocationPermission from './GeolocationPermission/GeolocationPermission'
import BottomSheetQnA from './BottomSheetQnA/BottomSheetQnA'
import { FlipInEasyX } from 'react-native-reanimated';

import { requestPermission } from '../utils/reqLocationPermission'

import { useRecoilState } from 'recoil';
import { locationState } from './recoil/locationState'

import { getIdHotplace } from './services/getHotplace'
import { previousDay } from 'date-fns';

import { SpaceInfo } from './types/place'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { getToken } from './services/getAccessToken'

type Here = {
  granted: string
  y: string
  x: string
}

const MapScreen: React.FC = () => {
  const [location, setLocation] = useRecoilState<Here>(locationState);
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo|null>(null)

  useEffect(() => {
    requestPermission().then(result => {
      setLocation(prev => ({...prev, granted: result as string}))
    })
  }, [])

  // 현재 표시된 장소 정보가 변경되면, 핫플레이스 화면에 띄우는 정보 변경해달라고 요청
  useEffect(() => {
    if (webRef.current) {
      webRef.current.injectJavaScript(`
      window.postMessage('{type: 'postHotplace'}', '*')
      `);
    }
  }, [spaceInfo])

  async function get_location(type: string) {
    // return new Promise((resolve, reject) => {
    if (location.granted==="granted") {
      Geolocation.getCurrentPosition(
        pos => {
          // console.log('IM HERE', pos)
          const lat = pos.coords.latitude.toString()
          const lng = pos.coords.longitude.toString()
          setLocation(prev => ({...prev, y: lat, x: lng }))
          

          // 로드시, accessToken web으로 전송해서 사용
          // 현재 비활성화
          // const token = getToken();
          // if (webRef.current) {
          //   webRef.current.injectJavaScript(`
          //   localStorage.setItem('token', '${token}');
          // `);
          // }
          if (type!=="load") {
            handle_native_location(lat, lng)
          }
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
        '위치 추적 허용', 
        '사용자 위치 확인을 위해 위치 정보 제공 동의를 해주세요!',
        [
          {
            text: '설정 변경하기',
            onPress: () => Linking.openSettings()
          },
        ],
        {cancelable: false}
      );
      // reject('Permission not granted');
    // })
    }
  }

  // const inject = `alert('메세지 수신됨')`

  async function handle_native_location (y: string, x: string) {
    if (webRef.current) {
      const data: { y: string, x: string } = {y: y, x: x}
      const locationData: { type: string, data: { y: string, x: string } } = {type: 'location', data: data}
      // console.log('locationData', locationData)
      webRef.current.injectJavaScript(`
      window.postMessage(${JSON.stringify(locationData)}, '*')
      `);
    }
  }

  async function native_to_web_load() {
    // console.log('native_to_web')
    await get_location('relocation')
    setInterval(() => {
      // console.log('location 정보 update');
      get_location('load');
    }, 5000);
    // await handle_native_location()
  }

  async function native_to_web() {
    await get_location('relocation')
  }

  // bottom-sheet
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['26.95%', '95%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    // console.log('pop!!')
  }, [spaceInfo]);
  const handleSheetChanges = useCallback((index: number) => {
    // bottomSheetModalRef.current?.present();

  }, []);
  // backdrop close by pressing background
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );


  let webRef = useRef<WebView | null>(null);

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

        {spaceInfo && spaceInfo.place_name &&
          <View style={styles.spaceName}>
            <NameBox h={38} text={spaceInfo.place_name} />
            {!spaceInfo.placeType ? (
              <HotRegisterButton props={spaceInfo} setSpaceInfo={setSpaceInfo}/>
            ): (
              <View style={styles.buttons}>
                <Icon name="comments" size={20} color={'white'} style={styles.Icon}/>
                <Icon name="gamepad" size={20} color={'white'} style={styles.Icon}/>
                <Icon name="flag-checkered" size={20} color={'white'} style={styles.Icon}/>
              </View>
            )}
          </View>
        } 
          <View style={styles.bottomsheetContainer}>
        {spaceInfo &&
          (
            <>
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
          </>
          )
        }

          {/* <View style={styles.placeDetail}>
            <View style={styles.info}>
              <Icon name="globe" size={11} color={'white'} style={styles.globeIcon}/>
              {spaceInfo.place_url ? 
              (<Text style={styles.bottomSheetPhone}>{spaceInfo.place_url}</Text>)
              : (<Text style={styles.bottomSheetPhone}>페이지 주소가 없습니다</Text>)
              }
            </View>
          </View> */}
        
        {spaceInfo &&
          <View style={styles.qnaContainer}>
            <View style={styles.qnaTitle}>
              <Icon name="question" size={16} color={'white'} style={styles.qnaIcon}/>
              <Text style={styles.optionName}>Q & A</Text>
            </View>
            <View style={styles.answerContainer}>
              <BottomSheetQnA spaceId={spaceInfo.id} spacename={spaceInfo.place_name}/>
            </View>
          </View>
        }

            {spaceInfo ? (
              <View style={styles.placeBottomContainer}>
                <PlaceOptionBox spaceId={spaceInfo.id} type="chat"/>
                <PlaceOptionBox spaceId={spaceInfo.id} type="game"/> 
              </View>
            ):(
              null
            )}
        
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
          onLoad={native_to_web_load}
          // injectedJavaScript={inject}
          onMessage={(event) => {
            const data: any = JSON.parse(event.nativeEvent.data)
            console.log('raw data', data)
            if (data.type=="test") {
              // console.log('web에서 들어왔어요')
              // console.log(data.data)
            } else if (data.type=="relocation") {
              native_to_web();
            } else {
              handlePresentModalPress();
              console.log(data.data.id)
              setSpaceInfo(data.data)
              // console.log("받은 데이터(React) : " + data.data);
            }
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
    marginTop: 5,
    marginLeft: 10,
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
    flex: 0.11,
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
    // backgroundColor: '#8B90F7',
    backgroundColor: '#8B90F733',
    // borderWidth:2,
    borderRadius: 20,
    // opacity: 0.5,
    height: 2,
    // borderWidth: 1, 
    // borderColor: '#8B90F7',
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
