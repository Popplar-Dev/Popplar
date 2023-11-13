import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button, Animated, Easing } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { getHotplaceUsers } from '../services/postLocation'
import { generateRandomMarkers } from './randomPosition'

type Props = {

}

export default function UserMarker() {

  const translateY = useRef(new Animated.Value(-5)).current;

  const fallAndRebound = () => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: -5,
        friction: 3,
        tension: 2,
        useNativeDriver: true,
      }),
    ]).start(() => {
      fallAndRebound(); // 애니메이션 반복
    });
  };

  useEffect(() => {
    fallAndRebound();
  }, []); // componentDidMount와 같은 역할

  return (
    <View>
      <Animated.View
        style={{
          transform: [{ translateY }],
        }}
      >
        {/* <View style={styles.circle}></View> */}
        <Icon name="sort-down" size={25} color={'red'} style={styles.Icon} />
      </Animated.View>
      <Icon name="map-marker-alt" size={28} color={'red'} />
    </View> 
  );
};

const styles = StyleSheet.create({                           
	circle: {
    width: 40,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 100,
  },
  Icon: {
    marginLeft: 1,
    // width: 50,
    // height: 50,
  }
});