import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Switch } from 'react-native';
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
    <View style={[styles.container, { backgroundColor: gameColor }]}>
      {gameStarted ? (
        <TouchableOpacity onPress={measureReactionTime} style={styles.button}>
          <Text style={styles.buttonText}>클릭!</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={startGame} style={styles.button}>
          <Text style={styles.buttonText}>게임 시작</Text>
        </TouchableOpacity>
      )}
      {reactionTime !== null && (
        <View>
          <Text style={styles.text}>반응 속도: {reactionTime.toFixed(2)} 초</Text>
          <TouchableOpacity onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>게임 재시작</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SpeedTouch;
