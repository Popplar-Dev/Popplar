import React, {useEffect, useState, useRef}from 'react';
import { View, Text, StyleSheet, Image, Button, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/userState';

export default function UserSetting() {

	const [nickname, setNickname] = useState('') 
	const [newNickname, setNewNickname] = useState('새 유저');
	const [userinfo, setUserInfo] = useRecoilState(userInfoState);
	const [isEditing, setIsEditing] = useState(false);
	const textInputRef = useRef<TextInput | null>(null);
	const navigation = useNavigation();

	const startEditing = () => {
    setIsEditing(true);
    setNewNickname(nickname);
  };

  const saveNickname = () => {
			setNickname(newNickname);
	
			const updatedInfo = {
				name: newNickname,
				profileImage: "url",
				// socialType: userinfo.socialType
			};
	
			axios.patch(`http://10.0.2.2:8201/member/${userinfo.id}`, updatedInfo)
				.then((response) => {
					 setUserInfo({ ...userinfo, name: newNickname });
					setIsEditing(false);
					console.log(response.data)
				})
				.catch((err) => {
					console.error("실패...", err);
				});
				if (updatedInfo.name==='새 유저') {
					Alert.alert(
						'닉네임을 설정해주세요!'
					)
				} else {
					navigation.navigate('BottomTab' as never);
				}
		};

  return (
    <View style={styles.container}>
			<View>
				{isEditing ? (
            <View style={styles.editingContainer}>
              <TextInput
                ref={textInputRef}
                style={styles.input}
                value={newNickname}
                onChangeText={(text) => setNewNickname(text)}
                onSubmitEditing={saveNickname}
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
              <Text style={styles.name}>{userinfo.name}</Text>
              <Pressable onPress={startEditing}>
                <View style={styles.edit}>
                  <Text style={styles.text}>닉네임 설정</Text>
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
		fontSize:20
	},
	editingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
	input: {
    fontSize: 24,
    color: 'white',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
	edit:{
		margin:100
	},
	name:{
		color:'white',
		fontSize:30
	}
});


