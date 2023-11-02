import React from 'react';
import { View, Text, StyleSheet,Image, ImageBackground, TextInput, Button, ActivityIndicator ,ScrollView, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";
// import { getuserinfo } from '../utills/https'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SettingScreen from './Settings/SettingScreen';
import PlanetModal from '../components/Modals/PlanetModal'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useRecoilValue } from 'recoil';
import { userInfoState } from './recoil/userState';

function MyPageScreen() {
	const [token, setToken] = useState('')
  const userinfo = useRecoilValue(userInfoState);
  const [modalVisible, setModalVisible] = useState(false);
  const [stamp, setStamp] = useState<Array<{ categoryName: string, visitedSet: number }>>([]);
  const [selectedPlanet, setSelectedPlanet] = useState({
    name: '',
    image: require('../assets/planet/1.png'),
    visit: ''
  });
  const [loading, setLoading] = useState(true);
  const images = [
    { name: "CAFE", uri: require("../assets/planet/1.png") },
    { name: "RESTAURANT", uri: require("../assets/planet/2.png") },
    { name: "STORE", uri: require("../assets/planet/3.png") },
    { name: "4", uri: require("../assets/planet/4.png") },
    { name: "5", uri: require("../assets/planet/5.png") },
    { name: "6", uri: require("../assets/planet/6.png") },
  ];

	useEffect(() => {
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.get(`https://k9a705.p.ssafy.io:8000/member/achievement/${userinfo.id}`,
          {
            headers: {
              'Access-Token': userAccessToken,
            },
          }
        )
        .then((response) => {
          setStamp(response.data.memberCategoryResDtoList);
          setLoading(false); 
        })
        .catch((err) => {
          console.log("에러 메시지 ::", err);
          setLoading(false); 
        })
      }
    }
    isLogin()
  }, []);

  const navigation = useNavigation();
  const handleSettingPress = () => {
    navigation.navigate('Settings' as never);
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}>
			<ImageBackground
        source={require('../assets/stars.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.goBackButtonOuter}>
              <Pressable onPress={goBack} android_ripple={{color: '#464646'}}>
                <Icon name="chevron-back" color="#8B90F7" size={25} />
              </Pressable>
            </View>
            <View>
              <Text style={styles.title}>Profile</Text>
            </View>
          </View>
        </View>
          <Icon
            style={styles.setting}
            name='settings-outline'
            size={30}
            color='#ffffff'
            onPress={handleSettingPress} 
          />
				<View style={styles.profileContainer}>
          <>
            <Text style={styles.name}>{userinfo.name}</Text>
          </>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/profile.png')}
              style={styles.profileImage}
            />
          </View>
          <View style={{marginBottom:10}}>
						<Text style={styles.t}>
              {userinfo.exp} xp
            </Text>
					</View>
          {/* <Pressable onPress={loadToDos} android_ripple={{color: '#464646'}}>
            <Text>ㅇㅇㅇ</Text>
          </Pressable> */}
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
            ) : (
            <View style={styles.stampcontainer}>
              <Image
                source={require('../assets/업적버튼.png')}
                style={styles.buttonImage}
              />
              <View style={styles.planetcontainer}>
                {stamp.map((item, index) => (
                  <View style={styles.planet} key={index}>
                    <Pressable
                      onPress={() => {
                        setSelectedPlanet({
                          name: item.categoryName,
                          image: images[index].uri,
                          visit: `${item.visitedSet}`
                        });
                        setModalVisible(true);
                      }}
                      style={styles.planetItem} 
                    >
                      <Image
                        source={images[index].uri}
                        style={styles.planetimage}
                      />
                      <Text style={styles.t}>{item.categoryName}</Text>
                      <Text style={styles.t}>{item.visitedSet}/10</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          )}
          </View>
          <PlanetModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            planetName={selectedPlanet.name}
            planetImage={selectedPlanet.image}
            visit={selectedPlanet.visit}
          />
			</ImageBackground>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
  },
  scrollContent: {
    flexGrow: 1,
  },
	backgroundImage: {
    flex: 1, 
    width: '100%', 
    height: '100%', 
  },
  name: {
    fontSize: 25,
		color:'white',
    fontWeight:'bold'
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
		top:'6%',
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
    marginBottom: 10,
		marginTop:20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75, 
  },
	buttonImage: {
    marginTop:20
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
	},
  setting : {
    position: 'absolute',
    top: 20, 
    right: 10, 
  },
  stampcontainer: {
    alignItems:'center',
    borderWidth:1,
    borderColor: '#8B90F7',
    borderRadius:20,
    width:'96%'
  },
  planetcontainer: {
    flexDirection:'row',
    alignItems:'center',
    // marginTop:10,
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10,
  },
  planet: {
    // flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    margin:10
  },
  planetItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  planetimage: {
    marginBottom: 5,
    marginTop:5
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
    height: 50,
  },
  leftContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  goBackButtonOuter: {
    marginEnd: 12,
    width: 32, 
    height: 32,
    borderRadius: 16,
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden',
  },
  ellipsisButtonOuter: {
    width: 32, 
    height: 32,
    borderRadius: 16,
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonInner: {
    borderRadius: 16, 

  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default MyPageScreen;
