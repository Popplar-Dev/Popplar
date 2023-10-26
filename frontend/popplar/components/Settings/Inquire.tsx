import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function Inquire() {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('popplar/assets/stars.png')}
        style={styles.backgroundImage}
      >
				<View>
					<Text style={styles.text}>문의하기</Text>
				</View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
  },
  text: {
    color:'white',
    fontSize:15
  },
	backgroundImage: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
});

export default Inquire;
