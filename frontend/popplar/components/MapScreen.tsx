import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MapScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Map</Text>
      <WebView 
      style={styles.webview}
      source={{uri: 'https://naver.com'}}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  }
})
