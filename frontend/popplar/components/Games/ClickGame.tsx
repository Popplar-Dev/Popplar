import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable, Modal, Image, BackHandler } from 'react-native';


export default function ClickGame() {
  const navigation = useNavigation();
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

    if (timeRemaining === 0) {
      setGameStarted(false);
      setModalVisible(true);
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

  const handleStartGame = () => {
    setGameStarted(true);
    setTimeRemaining(10); // Reset the timer
    setClickCount(0); // Reset click count
    setModalVisible(false);
  };

  const handleButtonClick = () => {
    if (gameStarted && timeRemaining > 0) {
      setClickCount(prevCount => prevCount + 1);
    }
  };

  const handleEndGame = () => {
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
          <Pressable onPress={handleStartGame} style={styles.buttonContainer}>
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
            <Pressable onPress={handleEndGame} style={styles.modalButton}>
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
