// EntranceBox.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    type: 'possible' | 'impossible';
    spaceId: number;
    onEnterPress: (spaceId: number) => void
};

export default function EntranceBox({type, spaceId, onEnterPress}: Props) {
    const handleEnterPress = () => {
        onEnterPress(spaceId);
    };

    return (
        <View style={styles.container}>
        {type === 'possible' && (
            <TouchableOpacity onPress={handleEnterPress} style={styles.button}>
                <Text style={styles.buttonText}>입장하기</Text>
            </TouchableOpacity>
        )}

        {type === 'impossible' && (
            <Text style={styles.buttonText}>거리가 멀어 입장이 불가능합니다.</Text>
        )}
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EntranceBox;
