import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

export default function NameBox() {

return (
    <View style={dynamicStyles.container}>
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