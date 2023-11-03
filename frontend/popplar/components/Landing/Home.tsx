import React, {useState} from "react";
import { View, Text, StyleSheet, Button, Pressable, Image, Alert  } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/userState';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home() {

	const navigation = useNavigation();
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);

	const isLogin = async () => {
		const result = await AsyncStorage.getItem('userInfo');
		const AccessToken = await AsyncStorage.getItem('userAccessToken');
		if (AccessToken !== null && result !== null ) {
			const userinfo = JSON.parse(result);
			const userAccessToken = JSON.parse(AccessToken);
			axios.get(`https://k9a705.p.ssafy.io:8000/member/${userinfo.id}`, 
          {
            headers: {
              'Access-Token': userAccessToken,
            },
          }
        )
          .then((response) => {
						console.log(userinfo)
						console.log(response.data)
						const user = {
							exp: response.data.exp,
							id: response.data.id,
							name: response.data.name,
							profileImage: response.data.profileImage,
							socialType: response.data.socialType,
						}
						setUserInfo(user)
          })
          .catch((err) => {
            console.log("에러 메시지 :", err)
          });
			navigation.navigate("BottomTab" as never)
		} else {
			Alert.alert(
				'로그인 먼저 해주세요'
			)
		}
		return null;
	}

	const newLogin = async () => {
		// navigation.navigate("LoginPage" as never)
		const result = await AsyncStorage.getItem('userInfo');
		const AccessToken = await AsyncStorage.getItem('userAccessToken');
		if (AccessToken !== null && result !== null) {
			const userAccessToken = JSON.parse(AccessToken);
			const userinfo = JSON.parse(result);
			axios.get(`https://k9a705.p.ssafy.io:8000/member/${userinfo.id}`, 
          {
            headers: {
              'Access-Token': userAccessToken,
            },
          }
        )
          .then((response) => {
						// console.log()
						console.log(response.data)
						setUserInfo({ ...userInfo, name: response.data.name })
          })
          .catch((err) => {
            console.log("에러 메시지 :", err)
          });
			navigation.navigate("BottomTab" as never)
		} else {
			navigation.navigate("LoginPage" as never)
		}
			return null;
	}
		
	

    return(
      <View style={Styles.container}> 
				<View style={Styles.main}>
					<Text style={Styles.title}>
						POPPLAR
					</Text>	
				</View>    
				<View style={Styles.buttons}>
					<Text style={Styles.text}>카카오톡으로 회원가입</Text>
					<Pressable
						onPress={newLogin}
						style={Styles.kakaologin}>
						<Image source={require('popplar/assets/kakao_login.png')}/>
					</Pressable>
				</View> 

				<View style={Styles.buttons}>
					<Text style={Styles.text}>이미 로그인 하셨나요?</Text>
					<Pressable onPress={isLogin} style={Styles.start}>
						<View style={Styles.buttoncontent}>
							<Icon style={Styles.icons} name='rocket' size={25} color='#ffffff'/>	
							<Text style={Styles.buttontext}>POPPLAR 시작하기</Text>
						</View>
					</Pressable>
				</View>

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
		fontSize:15,
		fontWeight:'bold'
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
		borderRadius:5,
		width:300,
		// justifyContent:'',
		alignItems:'center',
		height:45,
		margin:20,
		// flexDirection:'row'
	},
	buttons: {
		margin:20,
		alignItems:'center',
	},
	buttoncontent: {
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		padding:10,
		paddingHorizontal:30
	},
	buttontext: {
		alignItems:'center',
		justifyContent:'center',
		color:'white',
		fontWeight:'bold',
	},
	icons: {
		marginRight:10
	}   
});