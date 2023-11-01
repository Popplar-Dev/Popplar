import React, {useState} from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function Home() {

	const navigation = useNavigation();

    return(
      <View style={Styles.container}>      
				<Text style={Styles.Text}>로그인 화면</Text>
				<Pressable
					onPress={() => navigation.navigate("LoginPage" as never)}
					style={Styles.kakaologin}
				>
					<Text style={Styles.Text}>카카오 화면으로</Text>
				</Pressable>
			</View>
    )

}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  }, 
	Text: {

	},
	kakaologin: {

	}   
});