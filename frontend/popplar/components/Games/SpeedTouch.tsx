import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Switch } from 'react-native';
import { useState, useEffect } from 'react';

function SpeedTouch() {
	const [gameStarted, setGameStarted] = useState(false);
  const [gameColor, setGameColor] = useState('gray');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  useEffect(() => {
    if (gameStarted) {

      const timeout = setTimeout(() => {
        setGameColor('green');
        startReactionTimeMeasurement();
      }, Math.floor(Math.random() * 3000) + 2000);

      return () => clearTimeout(timeout);
    }
  }, [gameStarted]);

  const startGame = () => {
    setGameColor('gray');
    setGameStarted(true);
  };

  const startReactionTimeMeasurement = () => {
    setStartTime(new Date());
  };

  const measureReactionTime = () => {
    if (startTime) {
      const endTime = new Date();
      const reactionTime = (endTime.getTime() - startTime.getTime()) / 1000;
      setReactionTime(reactionTime);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameColor('gray');
    setStartTime(null);
    setReactionTime(null);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.gamecontainer, { backgroundColor: gameColor }]}>
        {gameStarted ? (
          <Pressable onPress={measureReactionTime} style={styles.button}>
            <Text style={styles.buttonText}>클릭!</Text>
          </Pressable>
        ) : (
          <Pressable onPress={startGame} style={styles.button}>
            <Text style={styles.buttonText}>게임 시작</Text>
          </Pressable>
        )}
        {reactionTime !== null && (
          <View>
            <Text style={styles.text}>반응 속도: {reactionTime.toFixed(3)} 초</Text>
            <Pressable onPress={resetGame} style={styles.button}>
              <Text style={styles.buttonText}>게임 재시작</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gamecontainer:{
    width:'80%',
    height:'50%',
    justifyContent:'flex-end'
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
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SpeedTouch;
