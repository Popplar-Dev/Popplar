import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native'; // SafeAreaView를 import합니다.
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from "@react-native-community/blur";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

interface GameListModalProps {
  visible: boolean;
  onClose: () => void;
  spaceid: number;
}

export default function GameListModal({ visible, onClose,spaceid}:GameListModalProps) {
  const navigation = useNavigation();
  const [myrefscore, setrefMyScores] = useState<{ points: number, type: string }[] | []>([]);
  const [myfightingscore, setfightingMyScores] = useState<{ points: number, type: string }[]| []>([]);
  const [conqueror, setConquerorScores] = useState()
  const [loading, setLoading] = useState(true);

	function gospeedtouchgame() {
    navigation.navigate('SpeedTouch' as never)
  }

  useEffect(() => {
    console.log(spaceid)
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.get(`https://k9a705.p.ssafy.io:8000/game/get-my-stat/${spaceid}/REFLEXES`,
          {headers: {'Access-Token': userAccessToken}}
        )
        .then((response) => {
          console.log(response.data);
          setrefMyScores(response.data.gameDtoList);
          setLoading(false); 
        })
        .catch((err) => {
          console.log("에러 메시지 :", err);
          setLoading(false); 
        })
        axios.get(`https://k9a705.p.ssafy.io:8000/game/get-my-stat/${spaceid}/FIGHTING`,
          {headers: {'Access-Token': userAccessToken}}
        )
        .then((response) => {
          // console.log(response.data.gameDtoList[0]);
          setfightingMyScores(response.data.gameDtoList);
          setLoading(false); 
        })
        .catch((err) => {
          console.log("에러 메시지 :", err);
          setLoading(false); 
        })
      }
    }
    isLogin()
    // console.log(myscore)
  }, []);


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
            <View style={styles.modalhead}>
              <Text style={styles.headtext}>Game List</Text>
              <Text style={styles.headtext}>정복자 : </Text>
            </View>
              <View style={styles.gamecontainer}>
                <View style={styles.gametop}>
                  <Text style={styles.textbig}>반응 속도 테스트</Text>
                  <View style={styles.gameinfo}>
                  {myrefscore.length === 0 ? (
                    <View style={styles.gameinfotitle}>
                      <Text style={styles.text}>내 최고 기록: 아직 기록이 없습니다</Text>
                      <Text style={styles.text}>전체 최고 기록: </Text>
                    </View>
                    ):(
                      <View style={styles.gameinfotitle}>
                        <Text style={styles.text}>내 최고 기록: {myrefscore[0].points}</Text>
                        <Text style={styles.text}>전체 최고 기록: </Text>
                      </View>
                    )} 
                    <Pressable style={styles.gamestart} onPress={gospeedtouchgame}>
                      <Text style={styles.text}>게임 하기</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.gamebottom}>
                  <Text style={styles.textbig}>??? 게임</Text>
                  <View style={styles.gameinfo}>
                  {myfightingscore.length === 0 ? (
                    <View style={styles.gameinfotitle}>
                      <Text style={styles.text}>내 최고 기록: 아직 기록이 없습니다</Text>
                      <Text style={styles.text}>전체 최고 기록: </Text>
                    </View>
                    ):(
                      <View style={styles.gameinfotitle}>
                        <Text style={styles.text}>내 최고 기록: {myfightingscore[0].points}</Text>
                        <Text style={styles.text}>전체 최고 기록: </Text>
                      </View>
                    )} 
                    <Pressable style={styles.gamestart}>
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
		fontSize:15,
    marginBottom:10
  },
  textbig: {
    color:'white',
		fontSize:18,
    marginBottom:20,
  },
  modalhead: {
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContent: {
    width: '90%',
		height:'50%',
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
    justifyContent:'space-between'
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
  }
});
