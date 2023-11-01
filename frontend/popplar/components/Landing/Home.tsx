import React, {useState} from "react";
import { View, Text, StyleSheet, Button, Pressable, Image } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function Home() {

	const navigation = useNavigation();

    return(
      <View style={Styles.container}> 
				<View style={Styles.main}>
					<Text style={Styles.title}>
						POPPLAR
					</Text>	
				</View>     
				<Pressable
					onPress={() => navigation.navigate("LoginPage" as never)}
					style={Styles.kakaologin}
				>
					<Image
            source={require('popplar/assets/kakao_login.png')}
            />
				</Pressable>
			</View>
    )

}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
		justifyContent:'center',
		alignItems:'center'
  }, 
	Text: {
		color:'black'
	},
	main:{
		marginBottom:100
	},
	title: {
		color:'white',
		fontWeight:'bold',
		fontSize:60
	},
	kakaologin: {
		// backgroundColor:'yellow'
	}   
});