import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

const FiveGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [imagesClicked, setImagesClicked] = useState(0);
  const [result, setResult] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [images, setImages] = useState([
    require('../../assets/planet/1.png'),
    require('../../assets/planet/2.png'),
    require('../../assets/planet/3.png'),
    require('../../assets/planet/4.png'),
    require('../../assets/planet/5.png'),
    // ...
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
      setImagesClicked(imagesClicked + 1);
      setNewImagePosition(false);
      setTimeout(() => {
        setNewImagePosition(true);
      }, 1000);

      if (imagesClicked === 4) {
        const endTime = new Date();
        const reactionTime = ((endTime.getTime() - startTime!.getTime()) / 1000 - 5) / 5;
        setResult(parseFloat(reactionTime.toFixed(3)));
        setNewImagePosition(false);
      }
    }
  };

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
          <Pressable
            onPress={handleImageClick}
            style={[
              styles.imageContainer,
              { left: imagePosition.x, top: imagePosition.y },
            ]}
          >
            <Image source={images[imagesClicked]} style={styles.image} />
          </Pressable>
        ) : (
          <Pressable onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>게임 시작</Text>
          </Pressable>
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
      backgroundColor: 'blue',
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
  });

export default FiveGame;
