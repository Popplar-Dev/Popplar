import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Modal, TouchableWithoutFeedback, Image } from 'react-native'; // SafeAreaView를 import합니다.
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from "@react-native-community/blur";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import SettingScreen from '../Settings/SettingScreen';

interface GameListModalProps {
  visible: boolean;
  onClose: () => void;
  spaceid: number;
}

interface GameInfo {
  conquerorInfo: {
    name: string;
    profileImage: string;
  };
  conquerorPoints: number;
  hasConqueror: boolean;
  maxFightingPoints: number;
  maxReflexesPoints: number;
  myMaxFightingPoints: number;
  myMaxReflexesPoints: number;
}

export default function GameListModal({ visible, onClose,spaceid}:GameListModalProps) {
  const navigation = useNavigation();
  const [gameinfo, setgameinfo] = useState<GameInfo | null>(null);
  const [conqueror, setConquerorScores] = useState()
  const [loading, setLoading] = useState(true);

	function gospeedtouchgame() {
    // navigation.navigate('SpeedTouch' , {spaceId: spaceid, mybestscore:gameinfo.myMaxReflexesPoints/(-100)})
    navigation.navigate('FiveGame' , {spaceId: spaceid, gameInfo:gameinfo})
  }

	function goClickGame() {
    navigation.navigate('ClickGame', {spaceId: spaceid, gameInfo: gameinfo})
  }

  useEffect(() => {
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.get(`https://k9a705.p.ssafy.io:8000/game/info/${spaceid}`,
          {headers: {'Access-Token': userAccessToken}}
        )
        .then((response) => {
          setgameinfo(response.data)
          setLoading(false); 
        })
        .catch((err) => {
          console.log("에러 메시지 :", err);
          setLoading(false); 
        })
      }
    }
    isLogin()
  }, [spaceid, gameinfo]);
  
  // console.log(gameinfo)

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalContainer}>
      <BlurView
        style={styles.blurContent} 
        blurType="dark" 
      >
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
          ) : (
          <View style={styles.modalContent}>
              <Text style={styles.text}>Game List</Text>
            <View style={styles.modalhead}>
              {gameinfo!.hasConqueror ? (
                <View style={styles.conquerorbox}> 
                    <Text style={styles.text}>오늘의 정복자</Text>
                  <View style={styles.conquerorboxdetail}>
                    <View style={styles.conquerorprofile}>
                      <Text style={styles.headtext}> {gameinfo!.conquerorInfo.name}</Text>
                      <Text style={styles.headtext}>{(gameinfo!.conquerorPoints).toFixed(3)} 점</Text>
                    </View>
                      <Image
                        source={{uri:gameinfo!.conquerorInfo.profileImage}}
                        style={styles.profileImage}
                      />
                  </View>
                </View>
              ):(
                <View>
                  <Text style={styles.headtext}>아직 정복자가 없습니다!</Text>
                </View>
              )}
            </View>
              <View style={styles.gamecontainer}>
                <View style={styles.gametop}>
                  <Text style={styles.textbig}>행성 잡기 미니게임</Text>
                  <View style={styles.gameinfo}>
                  {gameinfo ? (
                    <View style={styles.gameinfotitle}>
                      <Text style={styles.text}>
                        나의 최고 기록 : {gameinfo.myMaxReflexesPoints === 0 ? '없음' : (30 / gameinfo.myMaxReflexesPoints).toFixed(3) + '초'} 
                      </Text>
                      <Text style={styles.text}>
                        전체 최고 기록 : {gameinfo.maxReflexesPoints === 0 ? '없음' : (30 / gameinfo.maxReflexesPoints).toFixed(3) + '초'}
                      </Text>
                    </View>
                    ):(
                      <View style={styles.gameinfotitle}>
                        <ActivityIndicator size="large" color="#ffffff" />
                      </View>
                    )} 
                    <Pressable style={styles.gamestart} onPress={gospeedtouchgame}>
                      <Text style={styles.text}>게임 하기</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.gamebottom}>
                  <Text style={styles.textbig}>행성 도달 미니게임</Text>
                  <View style={styles.gameinfo}>
                  {gameinfo ? (
                    <View style={styles.gameinfotitle}>
                      <Text style={styles.text}>
                        나의 최고 기록 : {gameinfo.myMaxFightingPoints === 0 ? '없음' : `${gameinfo.myMaxFightingPoints} 회`}
                      </Text>
                      <Text style={styles.text}>
                        전체 최고 기록 : {gameinfo.maxFightingPoints === 0 ? '없음' : `${gameinfo.maxFightingPoints} 회`}
                      </Text>

                    </View>
                    ):(
                      <View style={styles.gameinfotitle}>
                        <ActivityIndicator size="large" color="#ffffff" />
                      </View>
                    )} 
                    <Pressable style={styles.gamestart} onPress={goClickGame}>
                      <Text style={styles.text}>게임 하기</Text>
                    </Pressable>
                  </View>
                </View>
              </View>      
          </View>
          )}
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
	text: {
		color:'white',
		fontSize:15,
    paddingBottom:3,
	},
  headtext: {
    color:'white',
		fontSize:18,
    // marginBottom:10
  },
  textbig: {
    color:'white',
		fontSize:18,
    marginBottom:20,
  },
  modalhead: {
    alignItems: 'center',
    marginTop:10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContent: {
    width: '90%',
		height:'60%',
  },
  modalContent: {
    backgroundColor: 'rgba(161, 161, 161, 0.2)',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
	modalInfo: {
		alignItems:'center',
	},
  gamecontainer: {
    marginBottom:5,
    marginVertical:10,
    width:'100%',
    // paddingVertical:10
  },
  gametop: {
    paddingTop:10,
    paddingBottom:20,
    alignItems:'center',
    // borderTopWidth:2,
    // borderWidth:2,
    paddingHorizontal:10,
    borderRadius:10,
    borderColor:'#717BF0',
    marginBottom:10
  },
  gamebottom: {
    paddingTop:10,
    paddingBottom:20,
    alignItems:'center',
    // borderTopWidth:2,
    // borderBottomWidth:2,
    paddingHorizontal:10,
    borderColor:'#717BF0',
    // borderWidth:2,
    borderRadius:10,
  },
  gameinfo: {
    flexDirection:'row',
    // borderWidth:1,
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%'
  },
  gameinfotitle: {
    justifyContent:'space-between',
    paddingTop:10,
    paddingHorizontal:20,
    paddingBottom:10,
    borderRadius:10,
    backgroundColor:'#2c2c2c'
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
		color:'white'
  },
  gamestart: {
    backgroundColor:'#717BF0',
    borderRadius:5,
    padding:5,
    marginLeft:20,
    alignItems:'center',
    width:80,
    height:35
  },
  conquerorbox: {
    // borderWidth:1, 
    paddingTop:10,
    paddingHorizontal:20,
    paddingBottom:10,
    borderRadius:10,
    backgroundColor:'#2c2c2c',
    alignItems:'center',
    // flexDirection:'row'
  },
  conquerorboxdetail: {
    flexDirection:'row',
    marginTop:10
  },
  conquerorprofile: {
    flexDirection:'column',
    // alignItems:'center',
    marginVertical:8
    // justifyContent:'center'
  },
  profileImage: {
    width: 70,
    height: 70,
    // borderRadius: 75,
    marginLeft:30
    
  }
});
