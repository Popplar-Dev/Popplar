import React, {useState} from "react";
import { View, Text, StyleSheet, Button, Pressable, Image, Alert  } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/userState';

export default function Home() {

	const navigation = useNavigation();
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);

	const getUserInfo = async () => {
		const result = await AsyncStorage.getItem('userInfo');
		if (result !== null) {
			const userinfo = JSON.parse(result);
			console.log(userinfo.name)
			if (userinfo.name==='새 유저') {
				Alert.alert(
					'로그인 먼저 해주세요'
				)
			} else {
				setUserInfo(userinfo)
				navigation.navigate("BottomTab" as never)
			}
		}
		return null;
	}

	const storeUserInfo = async (returnValue:any) => {
    try {
      setUserInfo(returnValue)
      await AsyncStorage.setItem('userInfo', JSON.stringify(returnValue));
    } catch (error) {
    }
  }

    return(
      <View style={Styles.container}> 
				<View style={Styles.main}>
					<Text style={Styles.title}>
						POPPLAR
					</Text>	
				</View>     
				<Pressable
					onPress={() => navigation.navigate("LoginPage" as never)}
					style={Styles.kakaologin}>
					<Image source={require('popplar/assets/kakao_login.png')}/>
				</Pressable>

				<Pressable
					onPress={getUserInfo}
					// onPress={() => navigation.navigate("BottomTab" as never)}
					style={Styles.start}>
					<Text style={Styles.text}>시작하기</Text>
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
	text: {
		color:'white',
		fontSize:15
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
		margin:20
	},
	start: {
		backgroundColor:'#8B90F7',
		borderRadius:10,
		width:300,
		justifyContent:'center',
		alignItems:'center',
		height:45,
		margin:20
	}   
});