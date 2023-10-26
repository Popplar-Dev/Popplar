import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import WebView from 'react-native-webview';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MapScreen: React.FC = () => {
  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLogitude] = useState<any>(null);

  const geoLocation = () => {
    Geolocation.getCurrentPosition(
        position => {
            const latitude = JSON.stringify(position.coords.latitude);
            const longitude = JSON.stringify(position.coords.longitude);

            setLatitude(latitude);
            setLogitude(longitude);
        },
        error => { console.log(error.code, error.message); },
        {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
    )
  }

  useEffect(() => {
    geoLocation();
  })

  return (
    <View style={styles.container}>
      <Text>Map</Text>
      {/* <Button title="Get GeoLocation" onPress={() => geoLocation()}/> */}
      <Text style={{ color: "white" }}> latitude: {latitude} </Text>
      <Text style={{ color: "white" }}> longitude: {longitude} </Text>
      <WebView 
      style={styles.webview}
      source={{uri: 'https://jiwoopaeng.github.io/popmmm/'}}
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
