import React from 'react';
import { Modal, View, Text, StyleSheet,Image, ImageBackground, TextInput, Button,Pressable,Switch } from 'react-native';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from "axios";
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/userState';
import { useRecoilState } from 'recoil';
import ProfileImageSelectModal from '../Modals/ProfileImageSelectModal'

function ProfileSetting() {
	const [nickname, setNickname] = useState('') 
	const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const textInputRef = useRef<TextInput | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = (value: boolean) => setIsEnabled(value);
  const [photo ,setPhoto] = useState('')
  const [userinfo, setUserInfo] = useRecoilState(userInfoState);
  const user = useRecoilValue(userInfoState);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

	const startEditing = () => {
    setIsEditing(true);
    setNewNickname(nickname);
  };

  const saveNickname = () => {
			setNickname(newNickname);
			const updatedInfo = {
				name: newNickname,
			};
			const isLogin = async () => {
        const AccessToken = await AsyncStorage.getItem('userAccessToken');
        if (AccessToken !== null) {
					const userAccessToken = JSON.parse(AccessToken);
					axios.patch(`https://k9a705.p.ssafy.io:8000/member/${userinfo.id}`, updatedInfo, 
						{headers: {'Access-Token': userAccessToken}}
					)
					.then((response) => {
						setUserInfo({ ...userinfo, name: newNickname });
						setIsEditing(false);
            // AsyncStorage.setItem('userInfo', JSON.stringify(userinfo));
          })
					.catch((err) => {
						console.error("실패...", err);
					}); 
				}
			}
			isLogin()
		};

  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
			<ImageBackground
        source={require('popplar/assets/stars.png')}
        style={styles.backgroundImage}
      >
				<View style={styles.profileContainer}>
          {isEditing ? (
            <View style={styles.editingContainer}>
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
                  <Text style={styles.text}>저장</Text>
                </View>
              </Pressable>
            </View>
          ) : (
            <>
              <Text style={styles.name}>{userinfo.name}</Text>
              <Pressable onPress={startEditing}>
                <View style={styles.edit}>
                  <Text style={styles.text}>닉네임 수정</Text>
                </View>
              </Pressable>
            </>
          )}
          <View style={styles.profileImageContainer}>
            <Image
              source={{uri:userinfo.profileImage}}
              style={styles.profileImage}
            />
          </View>
          <Pressable 
            onPress={openModal}>
            <View style={styles.edit}>
              <Text style={styles.text}>프로필 사진 수정</Text>
            </View>
          </Pressable>
        <View>
        </View>
        <ProfileImageSelectModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <Text style={styles.delete}>계정 삭제</Text>
        </View>
			</ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
  },
	backgroundImage: {
    flex: 1, 
    width: '100%', 
    height: '100%', 
  },
  name: {
    fontSize: 24,
		color:'white'
  },
  text: {
    fontSize: 12,
		color:'white',
		paddingBottom:5
  },
	textcontainer: {
		borderRadius: 30,
		backgroundColor:'#8B90F7', 
		width:100,
		justifyContent: 'center',
    alignItems: 'center'
	},
	profileContainer: {
		top:'8%',
		justifyContent: 'center',
    alignItems: 'center',
  },
	profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 100, 
		borderColor:'#8B90F7',
		borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
		marginTop:20
  },
  profileImage: {
    width: 145,
    height: 145,
    borderRadius: 75, 
  },
	buttonImage: {
		// width: 200,
		// height: 50,
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
	t:{
		color:'white',
    fontWeight:'bold',
    fontSize:16
	},
  setting : {
    left:160,
    top:-30
  },
  edit: {
    margin:10,
    borderColor:'blue',
    borderStyle:'solid',
    backgroundColor:'#8B90F7',
    paddingBottom:3,
    paddingTop:3,
    paddingLeft:8,
    paddingRight:8,
    borderRadius:10
  },
  info: {
    marginBottom:10,
    flexDirection:'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  delete: {
    color:'red',
    margin:30,
    fontWeight:'bold'
  },
});

export default ProfileSetting;
