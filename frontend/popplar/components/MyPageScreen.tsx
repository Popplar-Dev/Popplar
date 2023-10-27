import React from 'react';
import { View, Text, StyleSheet,Image, ImageBackground, TextInput, Button, ActivityIndicator ,ScrollView, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";
// import { getuserinfo } from '../utills/https'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SettingScreen from './Settings/SettingScreen';
import PlanetModal from '../components/Modals/PlanetModal'

import { useRecoilState } from 'recoil';
import { nicknameState } from '../recoil/userState';

function MyPageScreen() {
	const [nickname, setNickname] = useState('') 
	const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [userinfo, setUserInfo] = useState({ id: '', name: '', exp: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [stamp, setStamp] = useState([{ category:'', visitedSet:'' }])
  const [selectedPlanet, setSelectedPlanet] = useState({
    name: '',
    image: require('../assets/planet/planet-01.png'),
    visit: ''
  });
  const [loading, setLoading] = useState(true);

	useEffect(() => {
    axios.get(
        `http://10.0.2.2:8080/member/356931964684`, 
      )
			.then((response) => {
				setUserInfo(response.data)
				setNickname(response.data.name)
			})
			.catch((err) => {
        console.log("에러 메시지 ::", err)
      });
  }, []);

	useEffect(() => {
    axios.get(`http://10.0.2.2:8080/member/stamp/356931964684`)
      .then((response) => {
        setStamp(response.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.log("에러 메시지 ::", err);
        setLoading(false); 
      });
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
          <Image
            source={require('../assets/업적버튼.png')}
            style={styles.buttonImage}
          />
          {loading  ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
            <View>
              <View style={styles.planetcontainer}>
                <View style={styles.planet}>
                  <Pressable
                    onPress={() => {
                      setSelectedPlanet({
                        name: `${stamp[0].category}`,
                        image: require('../assets/planet/planet-01.png'),
                        visit:`${stamp[0].visitedSet}`
                        // visit:`0`
                      });
                      setModalVisible(true);
                    }}
                    style={styles.planet}
                  >
                    <Text style={styles.t}>{stamp[0].category}</Text>
                    <Image
                      source={require('../assets/planet/planet-01.png')}
                      style={styles.planetimage}
                    />
                    <Text style={styles.t}>{stamp[0].visitedSet}/10</Text>
                  </Pressable>
                </View>

                <View style={styles.planet}>
                  <Pressable
                      onPress={() => {
                        setSelectedPlanet({
                          name: `${stamp[1].category}`,
                          image: require('../assets/planet/planet-02.png'),
                          visit:`${stamp[1].visitedSet}`
                          // visit:`0`
                        });
                        setModalVisible(true);
                      }}
                      style={styles.planet}
                    >
                      <Text style={styles.t}>{stamp[1].category}</Text>
                      <Image
                        source={require('../assets/planet/planet-02.png')}
                        style={styles.planetimage}
                      />
                      <Text style={styles.t}>{stamp[1].visitedSet}/10</Text>
                    </Pressable>
                </View>

                <View style={styles.planet}>
                  <Pressable
                    onPress={() => {
                      setSelectedPlanet({
                        name: '업적 3',
                        image: require('../assets/planet/planet-12.png'),
                        visit:'0'
                      });
                      setModalVisible(true);
                    }}
                    style={styles.planet}
                  >
                    <Text style={styles.t}>업적3</Text>
                    <Image
                      source={require('../assets/planet/planet-12.png')}
                      style={styles.planetimage}
                    />
                    <Text style={styles.t}>0/0</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.planetcontainer}>
                <View style={styles.planet}>
                <Pressable
                    onPress={() => {
                      setSelectedPlanet({
                        name: '업적 4',
                        image: require('../assets/planet/planet-03.png'),
                        visit:'0'
                      });
                      setModalVisible(true);
                    }}
                    style={styles.planet}
                  >
                    <Text style={styles.t}>업적4</Text>
                    <Image
                      source={require('../assets/planet/planet-03.png')}
                      style={styles.planetimage}
                    />
                    <Text style={styles.t}>0/0</Text>
                  </Pressable>
                </View>

                <View style={styles.planet}>
                  <Pressable
                    onPress={() => {
                      setSelectedPlanet({
                        name: '업적 5',
                        image: require('../assets/planet/planet-05.png'),
                        visit:'0'
                      });
                      setModalVisible(true);
                    }}
                    style={styles.planet}
                  >
                    <Text style={styles.t}>업적5</Text>
                    <Image
                      source={require('../assets/planet/planet-05.png')}
                      style={styles.planetimage}
                    />
                    <Text style={styles.t}>0/0</Text>
                  </Pressable>
                </View>

                <View style={styles.planet}>
                  <Pressable
                    onPress={() => {
                      setSelectedPlanet({
                        name: '업적 6',
                        image: require('../assets/planet/planet-06.png'),
                        visit:'0'
                      });
                      setModalVisible(true);
                    }}
                    style={styles.planet}
                  >
                    <Text style={styles.t}>업적6</Text>
                    <Image
                      source={require('../assets/planet/planet-06.png')}
                      style={styles.planetimage}
                    />
                    <Text style={styles.t}>0/0</Text>
                  </Pressable>
                </View>
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
    marginBottom:10
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
  planetcontainer: {
    flexDirection:'row',
    marginTop:10
  },
  planet: {
    // flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    margin:10
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
