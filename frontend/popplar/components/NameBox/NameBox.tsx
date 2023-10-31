import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

type Props = {
  h?: number
  text: string
}

export default function NameBox({h, text}: Props) {
  const w = text.length * 14 + 40
  console.log(w)

  let dynamicStyles = {
    container: {
      width: w, 
      height: h, 
    },
    textinfo: {
      // Your text styles here
    },
  }

return (
    <View style={dynamicStyles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <Text style={styles.buttonText}>
          {text}
        </Text>
      </LinearGradient>
    </View>
  );
};


const styles = StyleSheet.create({                           
	image: {
		// height:'100%'
	},
	text: {
		color:'white',
		fontWeight:'bold',
		fontSize:30,
		margin:20
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
    // paddingLeft: 15,
    // paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});