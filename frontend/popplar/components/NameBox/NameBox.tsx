import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

type Props = {
  h?: number
  text: string
}

export default function NameBox({h, text}: Props) {
  const w = text.length * 14 + 70

  let dynamicStyles = {
    container: {
      width: w, 
      height: h,
    },
    image: {
      marginLeft: 14,
      marginTop: 5
    }
  }

return (
    <View style={dynamicStyles.container}>
      <View style={styles.linearGradient}>
        <Image
          source={require('popplar/assets/mark/flag-iso-color.png')}
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
		color:'white',
		fontWeight:'bold',
		fontSize:30,
		margin: 20
	},
	textinfo: {
		color:'white',
		fontWeight:'bold',
		fontSize:15,
		marginBottom:20,
		marginHorizontal:50
	},
  linearGradient: {
    flex: 1,
    flexDirection: 'row',
    // paddingLeft: 15,
    // paddingRight: 15,
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