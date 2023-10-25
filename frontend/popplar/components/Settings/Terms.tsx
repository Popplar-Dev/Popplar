import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function Terms() {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('popplar/assets/stars.png')}
        style={styles.backgroundImage}
      >
				<View>
					<Text style={styles.text}>이용약관</Text>
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

export default Terms;
