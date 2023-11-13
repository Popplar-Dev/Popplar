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
          <View style={styles.entrancecontainer}>
            <View style={styles.textbox}>
              <Text style={styles.buttonText}>핫플레이스와의 거리가 가까워 입장이 가능합니다.</Text>
              <Text style={styles.buttonText}>입장 시 
                <Text style={styles.colortext}> 채팅방 </Text>,
                <Text style={styles.colortext}>게임 </Text>,
                <Text style={styles.colortext}>업적 추가 </Text>
                 기능을 사용할 수 있습니다</Text>
            </View>
            <TouchableOpacity onPress={handleEnterPress} style={styles.button}>
                <Text style={styles.buttonText}>입장하기</Text>
            </TouchableOpacity>
          </View>
          
        )}

        {type === 'impossible' && (
          <View style={styles.entrancecontainer}>
          <Text style={styles.buttonText}>핫플레이스와 거리가 멀어 입장이 불가능합니다.</Text>
        </View>
            
        )}
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    backgroundColor: '#8B90F733',
    borderRadius:20,
    height:'90%',
    marginTop:10
  },
  entrancecontainer: {

  },
  textbox: {
    alignItems:'center',
    marginBottom:40
  },
  message: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8B90F7',
    padding: 10,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  colortext: {
    color:'pink'
  }
});

