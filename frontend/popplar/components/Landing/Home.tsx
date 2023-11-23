import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button, Pressable, Image, Alert  } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/userState';
import { userLoginState } from '../../recoil/userState';
import Icon from 'react-native-vector-icons/Ionicons';
import LocationPermission from './LocationPermission'
import { BackHandler } from 'react-native';

export default function Home() {

	const navigation = useNavigation();
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const [isuserLogin, setisuserLogin] = useRecoilState(userLoginState);

	useEffect(() => {
		const backAction = () => {
			Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
				{ text: '취소', onPress: () => null },
				{ text: '확인', onPress: () => BackHandler.exitApp() },
			]);
			return true;
		};
	
		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
	
		return () => {
			backHandler.remove();
		};
	}, []);

	const Logout = () => {
		AsyncStorage.clear();
		navigation.navigate('Home' as never);
	};

	const isLogin = async () => {
		const result = await AsyncStorage.getItem('userInfo');
		const AccessToken = await AsyncStorage.getItem('userAccessToken');
		if (AccessToken !== null && result !== null ) {
			const userinfo = JSON.parse(result);
			const userAccessToken = JSON.parse(AccessToken);
			axios.get(`https://k9a705.p.ssafy.io:8000/member/${userinfo.id}`, 
          {
            headers: {
              'Access-Token': userAccessToken
            },
          }
        )
          .then((response) => {
						const user = {
							exp: response.data.exp,
							id: response.data.id,
							name: response.data.name,
							profileImage: response.data.profileImage,
							socialType: response.data.socialType,
						}
						setUserInfo(user)
						setisuserLogin({isLogin:true})
          })
          .catch((err) => {
            console.log("에러 메시지 :", err)
						Alert.alert(
							'다시 로그인 해주세요'
						)
						Logout()
          });
			navigation.navigate("LocationPermission" as never)
		} else {
			Alert.alert(
				'로그인 먼저 해주세요'
			)
		}
		return null;
	}

	const newLogin = async () => {
		const result = await AsyncStorage.getItem('userInfo');
		const AccessToken = await AsyncStorage.getItem('userAccessToken');
		if (AccessToken !== null && result !== null) {
			const userAccessToken = JSON.parse(AccessToken);
			const userinfo = JSON.parse(result);
			axios.get(`https://k9a705.p.ssafy.io:8000/member/${userinfo.id}`, 
          {
            headers: {
              'Access-Token': userAccessToken
            },
          }
        )
          .then((response) => {
						const user = {
							exp: response.data.exp,
							id: response.data.id,
							name: response.data.name,
							profileImage: response.data.profileImage,
							socialType: response.data.socialType,
						}
						setUserInfo(user)
						setisuserLogin({isLogin:true})
          })
          .catch((err) => {
            console.log("에러 메시지 :", err)
						Alert.alert(
							'다시 로그인 해주세요'
						)
						Logout()
          });
			navigation.navigate("LocationPermission" as never)
		} else {
			navigation.navigate("LoginPage" as never)
		}
			return null;
	}
		
	

    return(
      <View style={Styles.container}> 
				<View style={Styles.main}>
				<Image
					source={require('popplar/assets/logo_p.png')}
					style={Styles.logo}
				/>
					<Text style={Styles.title}>
						POPPLAR
					</Text>	
				</View>    
				<View style={Styles.buttons}>
					<Text style={Styles.text}>카카오톡으로 회원가입</Text>
					<Pressable
						onPress={newLogin}
						style={Styles.kakaologin}
						accessibilityLabel="카카오 로그인"
						>
						<Image source={require('popplar/assets/kakao_login_medium_wide.png')}/>
					</Pressable>
				</View> 

				<View style={Styles.buttons}>
					<Text style={Styles.text}>이미 로그인 하셨나요?</Text>
					<Pressable onPress={isLogin} style={Styles.start} accessibilityLabel="popplar 시작하기">
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
		alignItems: 'center',
		marginBottom:50
	},
	title: {
		color:'#8B90F7',
		fontWeight:'bold',
		fontSize:70,
		textShadowColor: 'rgba(0, 0, 0, 1)', // 그림자 색상
		textShadowOffset: { width: 10, height: 10 }, 
		textShadowRadius: 10, // 그림자 반경
	},
	kakaologin: {
		margin:20,

		backgroundColor:'#FEE500',
		borderRadius:12,
		width:300,
		// justifyContent:'',
		alignItems:'center',
		height:45,
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
		margin:10,
		alignItems:'center',
	},
	buttoncontent: {
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		padding:10,
		paddingHorizontal:30
	},
	kakaobuttoncontent: {
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
	kakaobuttontext: {
		alignItems:'center',
		justifyContent:'center',
		color:'black',
		fontWeight:'bold',
	},
	icons: {
		marginRight:10
	},
	logo: {
		height: 350,
		width: 350,
		marginBottom:10,

	}   
});