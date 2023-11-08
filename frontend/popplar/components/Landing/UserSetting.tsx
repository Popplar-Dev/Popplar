import React, {useEffect, useState, useRef}from 'react';
import { View, Text, StyleSheet, Image, Button, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/userState';

import LocationPermission from './LocationPermission'

export default function UserSetting() {

	const [nickname, setNickname] = useState('') 
	const [newNickname, setNewNickname] = useState('새 유저');
	const [userinfo, setUserInfo] = useRecoilState(userInfoState);
	const [isEditing, setIsEditing] = useState(false);
	const textInputRef = useRef<TextInput | null>(null);
	const navigation = useNavigation();

	const startEditing = () => {
    setIsEditing(true);
		console.log(userinfo)
    setNewNickname(nickname);
  };

  const saveNickname = () => {
			setNickname(newNickname);
			const updatedInfo = {
				name: newNickname,
				profileImage: "url",
			};
			// console.log(userinfo)
			const isLogin = async () => {
        const AccessToken = await AsyncStorage.getItem('userAccessToken');
        if (AccessToken !== null) {
					const userAccessToken = JSON.parse(AccessToken);
					axios.patch(`https://k9a705.p.ssafy.io:8000/member/${userinfo.id}`, updatedInfo, 
						{headers: {'Access-Token': userAccessToken}}
					)
					.then((response) => {
						const userInfo = {
							exp: response.data.exp,
							id: response.data.id,
							name: response.data.name,
							profileImage: response.data.profileImage,
							socialType: response.data.socialType,
						}
						setUserInfo(userInfo);
						AsyncStorage.setItem('userInfo', JSON.stringify(userinfo));
						setIsEditing(false);
						if (updatedInfo.name==='새 유저') {
							Alert.alert(
								'닉네임을 설정해주세요!'
							)
						} else {
							navigation.navigate("LocationPermission" as never);
						}
					})
					.catch((err) => {
						console.error("실패...", err);
					});
					// console.log(AsyncStorage.getItem('userInfo'))
				}
			}
			isLogin()
		};

  return (
    <View style={styles.container}>
			<View>
				{isEditing ? (
            <View style={styles.editingContainer}>
							<View style={styles.editinfo}>
								<Text style={styles.text}>닉네임을 설정해주세요!</Text>
							</View>
              <TextInput
                ref={textInputRef}
                style={styles.input}
                value={newNickname}
                onChangeText={(text) => setNewNickname(text)}
                onSubmitEditing={saveNickname}
								autoFocus={true}
              />
              <Pressable onPress={saveNickname}>
                <View style={styles.edit}>
                  <Text style={styles.text}>저장하고 시작하기</Text>
                </View>
              </Pressable>
            </View>
          ) : (
            <>
						<View style={styles.editingContainer}>
							<View style={styles.editinfo}>
								<Text style={styles.text}>닉네임을 설정해주세요!</Text>
							</View>
              <Text style={styles.name}>{userinfo.name}</Text>
              <Pressable onPress={startEditing}>
                <View style={styles.edit}>
                  <Text style={styles.text}>설정하기</Text>
                </View>
              </Pressable>
						</View>
            </>
          )}
			</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
		justifyContent:'center',
		alignItems:'center'
  },
	text: {
		color:'white',
		fontSize:15,
		fontWeight:'bold'
	},
	editingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
	editinfo: {
		marginBottom:20
	},
	input: {
    fontSize: 24,
    color: 'white',
    borderBottomWidth: 1,
    borderColor: 'white',
		width:200,
  },
	edit:{
		margin:100,
		backgroundColor:'#8B90F7',
		paddingHorizontal:10,
		paddingTop:5,
		paddingBottom:8,
		borderRadius:10,
		width:200,
		alignItems:'center'
	},
	name:{
		color:'white',
		fontSize:30,
		fontWeight:'bold'
	}
});


