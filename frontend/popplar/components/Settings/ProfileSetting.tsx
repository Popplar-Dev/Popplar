import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function ProfileSetting() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('popplar/assets/stars.png')} 
        style={styles.backgroundImage}
      >
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
  backgroundImage: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },

});

export default ProfileSetting;
