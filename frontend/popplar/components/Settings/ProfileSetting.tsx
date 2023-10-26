import React from 'react';
import { View, Text, StyleSheet,Image, ImageBackground, TextInput, Button,Pressable,Switch } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
// import { getuserinfo } from '../utills/https'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function MyPageScreen() {
	const [nickname, setNickname] = useState('') 
	const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [userinfo, setUserInfo] = useState({ id: '', name: '', exp: '',socialType:'' });
  const textInputRef = useRef<TextInput | null>(null);

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = (value: boolean) => setIsEnabled(value);

	useEffect(() => {
    axios.get(
        `http://10.0.2.2:8080/member/356931964684`,
      )
			.then((response) => {
				console.log(response.data)
				setUserInfo(response.data)
				setNickname(response.data.name)
			})
			.catch((err) => {
        console.log("에러 메시지 ::", err)
      });
  }, []);

	const startEditing = () => {
    setIsEditing(true);
    setNewNickname(nickname);
  };

  const saveNickname = () => {
    setNickname(newNickname);

		const updatedInfo = {
			name: newNickname,
			profileImage: "url",
      socialType: userinfo.socialType
		};

    axios.patch(`http://10.0.2.2:8080/member/356931964684`, updatedInfo)
      .then((response) => {
        console.log("멤버 정보 업데이트 성공!!:", response.data);
				 setUserInfo({ ...userinfo, name: newNickname });
				setIsEditing(false);
      })
      .catch((err) => {
        console.error("실패...", err);
      });
  };

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
              source={require('popplar/assets/profile.png')}
              style={styles.profileImage}
            />
          </View>
        <View>
          <View style={styles.info}>
            <Text style={styles.t}>
                경험치 : {userinfo.exp} xp
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.t}>연동 정보 : </Text>
            <Text style={styles.t}>{userinfo.socialType}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.t}>내 위치  {isEnabled ? '끄기' : '켜기'}</Text>
            <Switch
              trackColor={{false: '#767577', true: '#8B90F7'}}
              thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        
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
    width: 100,
    height: 100,
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
    margin:30
  }
});

export default MyPageScreen;
