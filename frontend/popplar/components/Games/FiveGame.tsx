import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

const FiveGame = ({ route }) => {
  const spaceId = route.params.spaceId;
  const [gameInfo, setGameInfo] = useState(route.params.gameInfo);
  const [gameStarted, setGameStarted] = useState(false);
  const [imagesClicked, setImagesClicked] = useState(0);
  const [result, setResult] = useState(0);
  const [disable, setDisable] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [images, setImages] = useState([
    require('../../assets/planet/1.png'),
    require('../../assets/planet/2.png'),
    require('../../assets/planet/3.png'),
    require('../../assets/planet/4.png'),
    require('../../assets/planet/5.png'),
  ]);

  const [imagePosition, setImagePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setImages(shuffleArray(images)); // Shuffle the images for the start
  }, []);

  const shuffleArray = (array: any[]) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const setNewImagePosition = (type) => {
    let x = -100000;
    let y = -100000;
    if (type) {
        x = Math.floor(Math.random() * (300 - 50) + 50); 
        y = Math.floor(Math.random() * (500 - 100) + 100);
    }
    setImagePosition({ x, y });
  };

  const handleImageClick = () => {
    if (gameStarted) {
      setDisable(true)
      setNewImagePosition(false);
      setTimeout(() => {
        setImagesClicked(imagesClicked + 1);
        setNewImagePosition(true);
        setDisable(false)
      }, 1000);

      if (imagesClicked === 4) {
        gameEnd()
      }
    }
  };

  const gameEnd = async () => {
    const endTime = new Date();
    const reactionTime = ((endTime.getTime() - startTime!.getTime()) / 1000 - 5) / 5;
    setResult(parseFloat(reactionTime.toFixed(3)));
    setNewImagePosition(false);
    
    const AccessToken = await AsyncStorage.getItem('userAccessToken');
    if (AccessToken !== null) {
      const userAccessToken = JSON.parse(AccessToken);
      const insertscore = {
        type:"REFLEXES",
        hotPlaceId: spaceId,
        points: (30 / reactionTime).toFixed(3)
      }
      axios.post(`https://k9a705.p.ssafy.io:8000/game/insert-result`,
        insertscore,
        {headers: {'Access-Token': userAccessToken}}
      )
      .then((response) => {
        axios.get(`https://k9a705.p.ssafy.io:8000/game/info/${spaceId}`,
        {headers: {'Access-Token': userAccessToken}}
        )
        .then((response) => {
          // setMybestscore(response.data.maxReflexesPoints/(-100))
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
      })
      .catch((err) => {
        console.log("에러 메시지 :", err);
      })
    }
  }

  const resetGame = () => {
    setGameStarted(true);
    setImagesClicked(0);
    setStartTime(new Date());
    setNewImagePosition(false);
      setTimeout(() => {
        setNewImagePosition(true);
      }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gamecontainer}>
      {gameStarted ? (
        imagesClicked < 5 ? (
          <Pressable
            onPress={handleImageClick}
            style={[
              styles.imageContainer,
              { left: imagePosition.x, top: imagePosition.y },
            ]}
            disabled={disable}
          >
            <Image source={images[imagesClicked]} style={styles.image}/>
          </Pressable>
        ) : null
      ) : (
          <View style={styles.start}> 
            <View style={styles.planetImagebefore}>
              <Text style={styles.text}>
                게임이 시작되면 나타나는 행성을 최대한 빠르게 잡아보세요!
              </Text>
              <Pressable onPress={resetGame} style={styles.button}>
                <Text style={styles.buttonText}>게임 시작</Text>
              </Pressable>
            </View>
          </View>
      )}

      {imagesClicked >= 5 && (
        <View>
            <Text style={styles.text}>
              평균 반응 속도: {result}초
            </Text>
          <Pressable onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>게임 재시작</Text>
          </Pressable>
        </View>
      )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    gamecontainer: {
      width: '80%',
      height: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      position: 'relative',
    },
    text: {
      color: 'white',
      fontSize: 20,
    },
    button: {
      backgroundColor: '#717BF0',
      padding: 20,
      borderRadius: 10,
      margin: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    imageContainer: {
      position: 'absolute',
    },
    image: {
      // Define your image styles here
      width: 50,
      height: 50,
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
    start:{
      position:'absolute',
      top:'50%'
    }
  });

export default FiveGame;
