import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable, Modal, Image, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ClickGame({ route }) {
  const spaceId = route.params.spaceId; // 이런 방식으로 사용 가능
  const navigation = useNavigation();
  const [gameInfo, setGameInfo] = useState(route.params.gameInfo);
  const [gameStarted, setGameStarted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10); // 5 seconds
  const [modalVisible, setModalVisible] = useState(false);
  const [planetImage, setPlanetImage] = useState(require('../../assets/planet/game_planet1.png')); // 초기 이미지
  const [planetSize, setPlanetSize] = useState({ width: 10, height: 10 });

  
  useEffect(() => {
    let timer;
    if (gameStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }

    if (gameStarted && timeRemaining === 0) {
      setGameStarted(false);
      setModalVisible(true);
      handleGameEnd();
    }

    return () => {
      clearInterval(timer);
    };
  }, [gameStarted, timeRemaining]);

  const handleGameStart = () => {
    setGameStarted(true);
    setTimeRemaining(10); // Reset the timer
    setClickCount(0); // Reset click count
    setModalVisible(false);
    
    setPlanetSize({ width: 10, height: 10 });
    let index = Math.floor(Math.random() * 4) + 1
    if (index == 1) {
      setPlanetImage(require('../../assets/planet/game_planet1.png'));
    } else if (index == 2) {
      setPlanetImage(require('../../assets/planet/game_planet2.png'));
    } else if (index == 3) {
      setPlanetImage(require('../../assets/planet/game_planet3.png'));
    } else if (index == 4) {
      setPlanetImage(require('../../assets/planet/game_planet4.png'));
    }
  };

  const handleGameEnd = async () => {
    // 게임 종료 시 AccessToken을 AsyncStorage에서 가져온 후 axios 요청
    const AccessToken = await AsyncStorage.getItem('userAccessToken');
    const requestData = {
      type:"FIGHTING",
      hotPlaceId: spaceId,
      points: clickCount
    };

    if (AccessToken !== null) {
      const userAccessToken = JSON.parse(AccessToken);
      axios.post(`https://k9a705.p.ssafy.io:8000/game/insert-result`, requestData,
        { headers: {'Access-Token': userAccessToken} }
        )
        .then((res) => {
          if (res.data.conqueror===true) {
            const body = {
              chattingRoomId : spaceId,
            }
            axios.post(`https://k9a705.p.ssafy.io:8000/live-chat/chatting-member/conqueror`,
              body,
              {headers: {'Access-Token': userAccessToken}}
            )
            .then((res)=>{
            })
            .catch((err) => {
              console.log("에러 메시지 :", err);
            })
          }
          axios.get(`https://k9a705.p.ssafy.io:8000/game/info/${spaceId}`,
          { headers: {'Access-Token': userAccessToken} }
          )
          .then((response) => {
            setGameInfo(response.data)
            if (response.data.conqueror === true) {
              const body = {
                chattingRoomId : spaceId,
              }
              axios.post(`https://k9a705.p.ssafy.io:8000/live-chat/chatting-member/conqueror`,
                body,
                {headers: {'Access-Token': userAccessToken}}
              )
              .then((response) => {
              })
              .catch((err) => {
                console.log("에러 메시지 :", err);
              })
            }
          })
          .catch((err) => {
            console.log("gameInfo ERROR :", err)
          });
        })
        .catch((err) => {
          console.log("insert result ERROR :", err)
        });
    
      }
  };

  const handleButtonClick = () => {
    if (gameStarted && timeRemaining > 0) {
      setClickCount(prevCount => prevCount + 1);
      setPlanetSize({ width: 10 + 5 * clickCount, height: 10 + 5 * clickCount });
    }
  };

  const handleQuitGame = () => {
    navigation.goBack();
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };


  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   if (gameStarted) {
  //     setGameStarted(false);
  //     return true;
  //   }
  //   return false;
  // });

  return (
    <View style={styles.container}>
      {gameStarted && (
        <View style={styles.gameContainer}>
          <View style={styles.gameContainerTop}>
            <Text style={styles.scoreText}>나의 최고 점수 : {gameInfo.myMaxFightingPoints}</Text>
            <Text style={styles.scoreText}>전체 최고 점수 : {gameInfo.maxFightingPoints}</Text>
          </View>
          <Image source={planetImage} style={{ ...styles.planetImage, width: planetSize.width, height: planetSize.height }} />
          <View style={styles.gameContainerBottom}>
            <Text style={styles.text}> CLICK : {clickCount}</Text>
            <Text style={styles.text}> 남은 시간 : {timeRemaining} 초</Text>
          </View>
        </View>
      )}
      {gameStarted && timeRemaining > 0 && (
        <Pressable onPress={handleButtonClick} style={styles.boostbuttonContainer}>
          <Icon style={styles.icons} name='rocket' size={25} color='#000000'/>
          <Text style={styles.buttonText}>
            BOOST!
          </Text>
        </Pressable>
      )}
      {!gameStarted && (
        <>
        <View style={styles.start}>
          {/* <Image source={planetImage} style={styles.planetImagebefore} /> */}
          { !modalVisible && (
          <View style={styles.planetImagebefore}>
            <Text style={styles.text}>
              게임이 시작되면 BOOST 버튼을 눌러
            </Text>
            <Text style={styles.text}>
              행성에 최대한 가까이 도달하세요!
            </Text>
            <Pressable onPress={handleGameStart} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>게임 시작</Text>
            </Pressable>
          </View>
          )}
        </View>
        </>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>재도전하시겠습니까?</Text>
            <Text style={styles.modalText}>현재 점수: {clickCount}</Text>
            <Pressable onPress={handleModalClose} style={styles.modalButton}>
              <Text style={styles.buttonText}>예</Text>
            </Pressable>
            <Pressable onPress={handleQuitGame} style={styles.modalButton}>
              <Text style={styles.buttonText}>아니오</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameContainerTop: {
    position: 'absolute',
    top: 0,
    // left: 0,
    // right: 0,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems:'center',
    width: '100%',
  },
  planetImage: {
    width: 200, 
    height: 200, 
    top:'12%',
    position: 'absolute',
  },
  planetImagebefore: {
    // width: 350, 
    // height: 200, 
    marginBottom: 50,
    borderWidth:2,
    padding:10,
    borderRadius:10,
    borderColor:'#717BF0',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  gameContainerBottom: {
    position: 'absolute',
    top: '85%',
    
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'flex-end',
  },
  scoreText: {
    fontSize: 20,
    color: 'white',
    // fontWeight: 'bold',
    justifyContent: 'flex-end',
  },
  largeText: {
    justifyContent: 'flex-end',
    fontSize: 24,
  },
  buttonContainer: {
    backgroundColor: '#717BF0',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    marginTop: 50,
    width:300
    // justifyContent: 'flex-end', 
  },
  boostbuttonContainer: {
    backgroundColor: '#717BF0',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    marginBottom: 100,
    width:300,
    flexDirection:'row',
    justifyContent:'center'
  },
  startButton: {
    backgroundColor: '#717BF0',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight:'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(161, 161, 161, 0.2)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'white',
  },
  modalButton: {
    backgroundColor: '#717BF0',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  start: {
    width:350,
  },
  icons: {
		marginRight:20,
	},
});
