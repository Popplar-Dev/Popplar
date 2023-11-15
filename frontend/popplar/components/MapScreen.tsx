import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Alert, TouchableOpacity, TouchableWithoutFeedback, Pressable} from 'react-native';
import { Platform, PermissionsAndroid } from "react-native";
import { Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HotRegisterButton from './HotRegisterButton/HotRegisterButton'
import MetalIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StampButton from './PlaceOptionBox/StampButton'


import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import NameBox from './NameBox/NameBox'
import PlaceOptionBox from './PlaceOptionBox/PlaceOptionBox'
import BottomSheetQnA from './BottomSheetQnA/BottomSheetQnA'
import { FlipInEasyX } from 'react-native-reanimated';

import { requestPermission } from '../utils/reqLocationPermission'

import { useRecoilState, useRecoilValue } from 'recoil';
import { locationState } from './recoil/locationState'
import { chatroomState } from './recoil/chatroomState';

import { getIdHotplace, getMyInfo, updateMyHotPlaceId, getStamp, insertVisitor } from './services/getHotplace'
import { likeHotplace, delLikeHotplace } from './services/postHotplace'
import { previousDay } from 'date-fns';

import { SpaceInfo } from './types/place'
import { useNavigation } from '@react-navigation/native';
import GameListModal from './Modals/GameListModal';
import { useRoute } from '@react-navigation/native';

import { getDistance } from './utils/GetDistance'
import { getToken } from './services/getAccessToken'
import { postMyHotLocation } from './services/postLocation'
import { deleteChatroom } from './services/deleteChatroom'
import axios from 'axios';
import EntranceBox from './PlaceOptionBox/EntranceBox';
import { userInfoState } from './recoil/userState';

import HotplaceUsers from './HotplaceUsers/HotplaceUsers'
import UserModal from './Modals/UserModal'
import { BackHandler } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Here = {
  granted: string
  y: string
  x: string
}

interface HotPlace {
  addressName: string;
  category: string;
  placeName: string;
  placeType: string;
  roadAddressName: string;
  phone: string;
  id: number;
  likeCount: number;
  visitorCount: number;
  tier: number;
}

const MapScreen: React.FC = () => {
  const route = useRoute();
  const [location, setLocation] = useRecoilState<Here>(locationState);
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>({})
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [chatroomId, setChatroomId] = useRecoilState<number|null>(chatroomState); 
  const [spaceLike, setSpaceLike] = useState<boolean>(false)
  const [spaceLikeCount, setSpaceLikeCount] = useState<number>(0)
  const [spaceId, setSpaceId] = useState<string>('')
  const [isInHotPlace, setIsInHotPlace] = useState<boolean>(false);
  const [inDistance, setInDistance] = useState<boolean>(false);
  const [myHotPlaceId, setMyHotPlaceId] = useState<number>(0);
  const [stamp, setStamp] = useState<string>('false');
  const [stampload, setStampload] = useState<boolean>(true);
  const userInfo = useRecoilValue(userInfoState);
  
  const [userId, setUserId] = useState<number>(0)
  const [isMemberModalVisible, setMemberModalVisible] = useState(false);

  const [bottomSheetStatus, setBottomSheetStatus] = useState<number>(0)

  // setLocation -> granted
  useEffect(() => {
    requestPermission().then(result => {
      setLocation(prev => ({...prev, granted: result as string}))
    })
  }, [])


  // 전체 핫플레이스 검색에서 지도로 이동시, 장소 data 이동
  useEffect(() => {
    // handlePresentModalClose()
    const data: any = route.params;
    if (data && data.data) {
      // handlePresentModalClose();
      getIdHotplace(data.data.id)
      .then((res) => {
        // console.log('1111111111111111')
        const {addressName, category, id, likeCount, myLike, phone, placeName, placeType, roadAddressName, tier, visitorCount, x, y} = res.data
        // console.log(y, x)
        const loc: { id: number, y: string, x: string } = {id: id, y: y, x: x}
        const locationData: { type: string, data: { id: number, y: string, x: string } } = {type: 'pickHotPlace', data: loc}
        // console.log(locationData, '~!~!~!~!~!~!~!~!~!~')
        if (webRef.current) {
          handlePresentModalPress();
          setSpaceInfo({
            id,
            place_name: placeName,
            address_name: addressName,
            road_address_name: roadAddressName,
            category_group_name: category,
            likeCount: likeCount,
            phone,
            placeType,
            visitorCount,
            y,
            x,
            tier,
            myLike,
          })
          setSpaceLike(myLike)
          setSpaceLikeCount(likeCount)
          webRef.current.injectJavaScript(`
          window.postMessage(${JSON.stringify(locationData)}, '*')
          `);
        }
      })
    }
    // if (data) {
    //   setSpaceId(data.data.id)
    //   console.log('전체 검색 데이터 들어왔스비다')
    // }
  }, [route.params])

  // 스탬프 여부 확인
  useEffect(() => {
    handlePresentModalClose()
    if (spaceId) {
      getStamp(spaceId)
      .then((res) => {
        // console.log('맵스크린:',res.data, spaceId)
        if (res.data===true) {
          setStamp('true')
          setStampload(false)
        } else if (res.data==false){
          setStamp('false')
          setStampload(false)
        }
      })
      .catch((err) => {
        console.log("스탬프 에러 메시지 :", err);
      })
    }
  }, [spaceId])

  const handleStampUpdate = (newStamp: string) => {
    setStamp(newStamp);
  };

  // 내 핫플레이스 조회   
  useEffect(() => {
    if (userInfo.id != 0) {
      getMyInfo(userInfo.id)
        .then((res) => {
          setMyHotPlaceId(res.data.myHotPlaceId)
        })
        .catch((err) => {
          console.log("에러 메시지 ::", err);
        })
    }

  }, [userInfo.id])

  // 새 space 정보 부여될 경우, 지도 이동 및 bottomSheet 출력 // spaceId 변경시에도
  useEffect(() => {
    // console.log("spaceInfo.id: ", spaceInfo.id)
    if (spaceInfo.id !== undefined) {
      getIdHotplace(spaceInfo.id)
      .then((res) => {
        // console.log(res.data)
        const {addressName, category, id, likeCount, myLike, phone, placeName, placeType, roadAddressName, tier, visitorCount, x, y} = res.data
    
        const loc: { y: string, x: string } = {y: y, x: x}
        const locationData: { type: string, data: { y: string, x: string } } = {type: 'pickHotPlace', data: loc}
        // console.log(locationData, '~!~!~!~!~!~!~!~!~!~')
        if (webRef.current) {
          handlePresentModalPress();
          setSpaceInfo({
            id,
            place_name: placeName,
            address_name: addressName,
            road_address_name: roadAddressName,
            category_group_name: category,
            likeCount: likeCount,
            phone,
            placeType,
            visitorCount,
            y,
            x,
            tier,
            myLike,
          })
          setSpaceLike(myLike)
          setSpaceLikeCount(likeCount)
          // webRef.current.injectJavaScript(`
          // window.postMessage(${JSON.stringify(locationData)}, '*')
          // `);
        }
      }).catch(() => {
        // console.log('핫플레이스 등록된 id가 들어오지 않았으므로, 미출력 또는 검색한 장소를 출력합니다.')
      })
    }
  }, [spaceId])

  // location, spaceId, route.params 갱신시 distance 새로 구함
  useEffect(() => {
    if (spaceInfo && spaceInfo.x && spaceInfo.y) {
      let distance = getDistance(location.x, location.y, spaceInfo.x, spaceInfo.y)
        if (distance <= 500) {
          setInDistance(true)
      } else {
        setInDistance(false)
      }
    }
  }, [spaceId, location, route.params])

  
  const openModal = () => {
    setModalVisible(true);
  };

  // 핫플레이스내 입장한 사용자
  const openMemberModal = () => {
    setMemberModalVisible(true);
  }

  function goqna() {
    navigation.navigate('QnaList', {spaceId: spaceInfo.id, spacename: spaceInfo.place_name} )
  }
  // function goQna(space) {
  //   navigation.navigate('QnaList' , {spaceId: space.spaceId, spacename: space.spacename} )
  // }

  useEffect(() => {
    async function getChatroomId() {
      const userAccessToken = await getToken();
      if (userAccessToken) {
        const url = `https://k9a705.p.ssafy.io:8000/live-chat/chatting-room`;
        try {
          const res = await axios.get(url, {
            headers: {'Access-Token': `${userAccessToken}`}
          }); 
          setChatroomId(res.data);           

        } catch (e) {
          console.log(url);
          console.error(e); 
        }
      } 
    }
    getChatroomId(); 
  }, [])

  async function get_location(type: string) {
    // return new Promise((resolve, reject) => {
    if (location.granted==="granted") {
      Geolocation.getCurrentPosition(
        pos => {
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
          timeout: 5000,
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

  async function handle_native_location (y: string, x: string) {
    if (webRef.current) {
      const data: { y: string, x: string } = {y: y, x: x}
      const locationData: { type: string, data: { y: string, x: string } } = {type: 'location', data: data}

      webRef.current.injectJavaScript(`
      window.postMessage(${JSON.stringify(locationData)}, '*')
      `);
    }
  }

  async function native_to_web_load() {
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
  }, [spaceInfo]);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, [spaceInfo]);
  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetStatus(index)
    // console.log('index', index)
    // bottomSheetModalRef.current?.present();

  }, []);
  // backdrop close by pressing background
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  const hotSpaceLike = () => {
    if (spaceInfo && spaceInfo.id) {
      likeHotplace(spaceInfo.id)
      .then(() => {setSpaceLike(true);  setSpaceLikeCount(prev => prev + 1)})
    }
  }

  const hotSpaceLikeDel = () => {
    if (spaceInfo && spaceInfo.id) {
      delLikeHotplace(spaceInfo.id)
      .then(() => {setSpaceLike(false);  setSpaceLikeCount(prev => prev - 1)})
    }
  }

  // 입장하기 버튼
  const handleEnterPress = async (spaceId: number) => {
    updateMyHotPlaceId(spaceId, userInfo.id)
    insertVisitor(spaceId)
    if (chatroomId) {
      await deleteChatroom(chatroomId); 
      setChatroomId(null); 
    }
    setMyHotPlaceId(spaceId)
    handle_entrance()
  };
  
  // 핫플레이스 입장 후, 5초마다 내위치 서버에 전송하는 로직
  const startInterval = (data) => {
    let intervalId = setInterval(() => {
      // console.log('location 정보 update');
      let distance = getDistance(location.x, location.y, spaceInfo.x, spaceInfo.y)
      if (distance <= 500) {
        postMyHotLocation(data)
        .then((res) => res)
      } else {
        clearInterval(intervalId);
        const out = {hotPlaceId: 0, x: location.x, y: location.y}
        postMyHotLocation(out)
        .then((res) => res)
      }
    }, 5000);
  }

  // 내가 핫플레이스 내에 있다는 정보 전송
  async function handle_entrance () {
    // 현재 입장한 핫플레이스에 5초마다 / 500미터 내에 있으면 위치 정보 전송
    const data = {hotPlaceId: myHotPlaceId, x: location.x, y: location.y}
    // console.log('data--------', data)
    startInterval(data)
  }

  // 해당 장소에 있는 다른 사람들 정보 출력하기 위해 webview로 데이터 전송
  async function handle_hot_users () {

    const spaceData: { type: string, data: {id: string} } = {type: 'entrance', data: { id: spaceInfo.id }}
    // console.log('spaceData', spaceData)
    if (webRef.current) {
      webRef.current.injectJavaScript(`
      window.postMessage(${JSON.stringify(spaceData)}, '*')
      `)
    }
  }

  // 입장하기 누른 핫플레이스와, 현재 들어온 핫플레이스가 동일하다면 주변 사람들 정보 띄워줌
  useEffect(() => {
    handle_hot_users()
    if (myHotPlaceId==spaceInfo.id) {
      handle_entrance()
    }
  }, [spaceInfo])

  const handleOutsideClick = (event) => {
    const { locationY } = event.nativeEvent;
    console.log('Touched Y Coordinate:', locationY);
  };

  let webRef = useRef<WebView | null>(null);

  return (
    <>
    <UserModal 
    visible={isMemberModalVisible}
    onClose={() => setMemberModalVisible(false)}
    memberId={userId}
    placeName={spaceInfo.place_name}
    />
    <GestureHandlerRootView style={{ flex: 1}}>
      <BottomSheetModalProvider>
      {/* {spaceInfo && (bottomSheetStatus===0 ) &&
        <HotplaceUsers id={Number(spaceInfo.id)}/>
      } */}
      <View style={[styles.container]}>
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
            <TouchableWithoutFeedback handleLongPress={handleOutsideClick}>
              <NameBox h={38} text={spaceInfo.place_name} />
            </TouchableWithoutFeedback>
            {!spaceInfo.placeType ? (
              <>
              <HotRegisterButton 
              props={spaceInfo} 
              setSpaceInfo={setSpaceInfo} 
              setSpaceLike={setSpaceLike}
              setSpaceLikeCount={setSpaceLikeCount}
              webRef={webRef}
              />
            </>
            ): (
                <View style={styles.buttons}>
                  {myHotPlaceId === spaceId && (
                    <>
                      <Icon name="comments" size={21} color={'white'} style={styles.Icon} />
                      <TouchableOpacity>
                        <Icon name="gamepad" size={21} color={'white'} style={styles.Icon} onPress={openModal}/>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Icon name="question-circle" size={21} color={'white'} style={styles.Icon} onPress={goqna}/>
                      </TouchableOpacity>
                    </>
                  )}
              {/* <Icon name="flag-checkered" size={20} color={'white'} style={styles.Icon}/> */}
              <TouchableOpacity style={styles.likeContainer}>
                {!spaceLike ? (
                  <Pressable onPress={hotSpaceLike}>
                  <Icon name="heart" size={22} color={'white'} style={styles.heartIcon}/>
                  <Text style={styles.currLikeCount}>{spaceLikeCount}</Text>
                  </Pressable>
                ):
                (
                  <Pressable onPress={hotSpaceLikeDel}>
                  <Icon name="heart" size={22} color={'#B3B7FD'} style={styles.heartIcon} />
                  <Text style={styles.currLikeCount}>{spaceLikeCount}</Text>
                  </Pressable>
                )}
              </TouchableOpacity>
              <GameListModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                spaceid={spaceInfo.id}
              />
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
          <>
          <View style={styles.qnaContainer}>
            <View style={styles.qnaTitle}>
              <Icon name="question" size={16} color={'white'} style={styles.qnaIcon}/>
              <Text style={styles.optionName}>Q & A</Text>
            </View>
            <View style={styles.answerContainer}>
              <BottomSheetQnA spaceId={spaceInfo.id} spacename={spaceInfo.place_name}/>
            </View>
          </View>
          </>
        }

        {spaceInfo &&
          inDistance ? ( // 거리 내에 있으면
            myHotPlaceId === spaceInfo.id ? ( // 내가 입장한 핫플레이스라면
              <>
                <View style={styles.stampcontainer}>
                  {!stampload ? (
                    <>
                      <StampButton spaceId={spaceInfo.id} type={stamp} onStampUpdate={handleStampUpdate} />
                    </>
                  ) : (
                    null
                  )}
                </View>
                <View style={styles.placeBottomContainer}>
                  <PlaceOptionBox spaceId={spaceInfo.id} type="chat"/>
                  <PlaceOptionBox spaceId={spaceInfo.id} type="game"/> 
                </View>
              </>
            ) : (
              <View style={styles.placeBottomContainer}>
                <EntranceBox onEnterPress={handleEnterPress} spaceId={spaceInfo.id} type="possible"/>
              </View>
            )
          ) : (
            <View style={styles.placeBottomContainer}>
              <EntranceBox onEnterPress={handleEnterPress} spaceId={0} type="impossible"/>
            </View>
          )
        }
        </View>
        </BottomSheetModal>

        <WebView 
          ref={webRef}
          style={styles.webview}
          source={{uri: 'https://jiwoopaeng.github.io/popmmm/'}}
          javaScriptEnabled={true}
          onLoad={native_to_web_load}
          // injectedJavaScript={inject}
          onMessage={(event) => {
            const data: any = JSON.parse(event.nativeEvent.data)
            if (data.type=="test") {
              // console.log(data)
            } else if (data.type=="relocation") {
              native_to_web();
            } else if (data.type=="user") {
              // console.log("user~~~~~~", data.data.data)
              setUserId(data.data.data)
              openMemberModal()
            } else if (data.type=="handleBottomSheet") {
              handlePresentModalClose();
            } else {
              handlePresentModalPress();
              // setBottomSheetStatus(0)
              setSpaceInfo(data.data)
              setSpaceId(data.data.id)
              // setSpaceLike(data.data.myLike)
              // setSpaceLikeCount(data.data.likeCount)
            }
          }}
        />
      </View>
    </BottomSheetModalProvider>

  </GestureHandlerRootView>
  </>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  userMarker: {
    position: 'absolute',
    top: 160, // 상단 여백
    left: 60, // 좌측 여백
    width: 300,
    height: 520,
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // 반투명 빨간 배경
    zIndex: 1, // 웹뷰 위에 보이도록 함
  },
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
    justifyContent: 'space-between',
    marginLeft: 20, 
    height: 30,
    // borderWidth: 1, 
    // borderColor: 'red',  
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
    marginTop: 2,
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
    marginTop: 3,
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
  likeContainer: {
    // flex: 1,
    // borderWidth: 1, 
    // borderColor: 'red',
  },
  heartIcon: {
    marginLeft: 12,
    marginTop: 10,
  },
  currLikeCount: {
    position: 'absolute',
    flex: 1,
    top: 14, 
    left: 20, 
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  stampcontainer: {
    alignItems:'center',
    marginTop:20,
    // marginBottom:20,
  },
  stampbutton: {
    width:200,
    borderWidth:2,
    borderColor:'red',
    alignItems:'center',
  },
  stamptext: {
    color:"white"
  }
})
