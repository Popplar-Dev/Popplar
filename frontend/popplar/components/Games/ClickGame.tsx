import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable, Modal, Image, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function ClickGame({ route }) {
  const spaceId = route.params.spaceId; // 이런 방식으로 사용 가능
  const navigation = useNavigation();
  const [gameInfo, setGameInfo] = useState({ userHighScore: 0, totalHighScore: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10); // 5 seconds
  const [modalVisible, setModalVisible] = useState(false);
  const [planetImage, setPlanetImage] = useState(require('../../assets/planet/1.png')); // 초기 이미지

  
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

    // 클릭 횟수가 10, 20, 30, 40, 50일 때 이미지 업데이트
    if (clickCount < 10) {
      setPlanetImage(require('../../assets/planet/1.png'));
    } else if (clickCount < 20) {
      setPlanetImage(require('../../assets/planet/2.png'));
    } else if (clickCount < 30) {
      setPlanetImage(require('../../assets/planet/3.png'));
    } else if (clickCount < 40) {
      setPlanetImage(require('../../assets/planet/4.png'));
    } else if (clickCount < 50) {
      setPlanetImage(require('../../assets/planet/5.png'));
    } else {
      setPlanetImage(require('../../assets/planet/6.png'));
    }

    return () => {
      clearInterval(timer);
    };
  }, [gameStarted, timeRemaining]);

  const handleGameStart = () => {
    setGameStarted(true);
    setTimeRemaining(5); // Reset the timer
    setClickCount(0); // Reset click count
    setModalVisible(false);
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
        .then((response) => {
          setGameInfo({
            userHighScore: response.data.userHighScore,
            totalHighScore: response.data.totalHighScore
          });
        })
        .catch((err) => {
          console.log("ERROR :", err)
        });
      }
  };

  const handleButtonClick = () => {
    if (gameStarted && timeRemaining > 0) {
      setClickCount(prevCount => prevCount + 1);
    }
  };

  const handleQuitGame = () => {
    navigation.goBack();
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setPlanetImage(require('../../assets/planet/1.png'));
  };

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (gameStarted) {
      setGameStarted(false);
      return true;
    }
    return false;
  });

  return (
    <View style={styles.container}>
      {gameStarted && (
        <View style={styles.gameContainer}>
          <Text style={styles.text}>나의 최고 점수 : {gameInfo.userHighScore}</Text>
          <Text style={styles.text}>전체 최고 점수 : {gameInfo.totalHighScore}</Text>
          <Image source={planetImage} style={styles.planetImage} />
          <Text style={styles.text}> CLICK : {clickCount}</Text>
          <Text style={styles.text}> 남은 시간 : {timeRemaining} 초</Text>
        </View>
      )}
      {gameStarted && timeRemaining > 0 && (
        <Pressable onPress={handleButtonClick} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>클릭!</Text>
        </Pressable>
      )}
      {!gameStarted && (
        <>
          <Image source={planetImage} style={styles.planetImage} />
          <Pressable onPress={handleGameStart} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>게임 시작</Text>
          </Pressable>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planetImage: {
    width: 200, // 이미지의 폭을 조절합니다.
    height: 200, // 이미지의 높이를 조절합니다.
    marginBottom: 100,
  },
  text: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
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
    marginBottom: 100,
    justifyContent: 'flex-end', // 클릭 버튼을 아래로 이동
  },
  startButton: {
    backgroundColor: '#717BF0',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
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
});
