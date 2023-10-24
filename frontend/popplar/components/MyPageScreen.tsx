import React from 'react';
import { View, Text, StyleSheet,Image, ImageBackground, TextInput, Button  } from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";
// import { getuserinfo } from '../utills/https'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SettingScreen from './Settings/SettingScreen';


function MyPageScreen() {
	const [nickname, setNickname] = useState('') 
	const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [userinfo, setUserInfo] = useState({ id: '', name: '', exp: '' });

	useEffect(() => {
    axios.get(
        `http://10.0.2.2:8080/member/4`,
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
			id: userinfo.id,
			name: newNickname,
			profileImage: "url"
		};

    axios.patch(`http://10.0.2.2:8080/member`, updatedInfo)
      .then((response) => {
        console.log("멤버 정보 업데이트 성공!!:", response.data);
				 setUserInfo({ ...userinfo, name: newNickname });
				setIsEditing(false);
      })
      .catch((err) => {
        console.error("실패...", err);
      });
  };

  const navigation = useNavigation();

  const handleSettingPress = () => {
    navigation.navigate('Settings' as never);
  };


  return (
    <View style={styles.container}>
			<ImageBackground
        source={require('../assets/stars.png')}
        style={styles.backgroundImage}
      >
				<View style={styles.profileContainer}>
        <Icon
          style={styles.setting}
          name='settings-outline'
          size={30}
          color='#ffffff'
          onPress={handleSettingPress} 
        />
          {isEditing ? (
            <View style={styles.editingContainer}>
              <TextInput
                style={styles.input}
                value={newNickname}
                onChangeText={(text) => setNewNickname(text)}
              />
              <Button title="Save" onPress={saveNickname} />
            </View>
          ) : (
            <>
              <Text style={styles.name}>{userinfo.name}</Text>
              <Button title="Edit" onPress={startEditing} />
            </>
          )}
					<View>
						<Text style={styles.t}>Name: {userinfo.name}</Text>
						<Text style={styles.t}>ID: {userinfo.id}</Text>
						<Text style={styles.t}>Exp: {userinfo.exp}</Text>
					</View>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/profile.png')}
              style={styles.profileImage}
            />
            
          </View>
          <Image
            source={require('../assets/업적버튼.png')}
            style={styles.buttonImage}
          />
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
    fontSize: 15,
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
		color:'white'
	},
  setting : {
    left:160,
    top:-30
  }
});

export default MyPageScreen;
