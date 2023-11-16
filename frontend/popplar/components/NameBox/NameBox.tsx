import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

type Props = {
  h?: number;
  text: string;
  tier?: number; // tier 추가
}

export default function NameBox({ h, text, tier }: Props) {
  const w = text.length * 14 + 70;

  // tier에 따라 다른 이미지를 불러오기
  const getTierImage = () => {
    switch (tier) {
      case 1:
        return require('popplar/assets/tier/그림1.png');
      case 2:
        return require('popplar/assets/tier/그림2.png');
      case 3:
        return require('popplar/assets/tier/그림3.png');
      case 4:
        return require('popplar/assets/tier/그림4.png');
      case 5:
        return require('popplar/assets/tier/그림5.png');
      default:
        return require('popplar/assets/mark/flag-iso-color.png');
    }
  };

  let dynamicStyles = {
    container: {
      width: w,
      height: h,
    },
    image: {
      marginLeft: 14,
      marginTop: 5,
    },
  };

  return (
    <View style={dynamicStyles.container}>
      <View style={styles.linearGradient}>
        <Image
          source={getTierImage()} // getTierImage 함수를 통해 이미지 동적으로 설정
          style={dynamicStyles.image}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 20,
  },
  textinfo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 20,
    marginHorizontal: 50,
  },
  linearGradient: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#4C43CD",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 8,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
