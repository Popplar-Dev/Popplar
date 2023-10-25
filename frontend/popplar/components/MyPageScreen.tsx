import React from 'react';
import { View, Text, StyleSheet,Image, ImageBackground, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";
// import { getuserinfo } from '../utills/https'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SettingScreen from './Settings/SettingScreen';
import PlanetModal from '../components/Modals/PlanetModal'


function MyPageScreen() {
	const [nickname, setNickname] = useState('') 
	const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [userinfo, setUserInfo] = useState({ id: '', name: '', exp: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState({
    name: '',
    image: require('../assets/planet/planet-01.png'), // 기본 이미지
  });


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
  

  const navigation = useNavigation();
  const handleSettingPress = () => {
    navigation.navigate('Settings' as never);
  };


  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}>
			<ImageBackground
        source={require('../assets/stars.png')}
        style={styles.backgroundImage}
      >
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
          <View style={styles.planetcontainer}>

            <View style={styles.planet}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedPlanet({
                    name: '업적 1',
                    image: require('../assets/planet/planet-01.png'),
                  });
                  setModalVisible(true);
                }}
                style={styles.planet}
              >
                <Image
                  source={require('../assets/planet/planet-01.png')}
                  style={styles.planetimage}
                />
                <Text style={styles.t}>0/0</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.planet}>
              <TouchableOpacity
                  onPress={() => {
                    setSelectedPlanet({
                      name: '업적 2',
                      image: require('../assets/planet/planet-11.png'),
                    });
                    setModalVisible(true);
                  }}
                  style={styles.planet}
                >
                  <Image
                    source={require('../assets/planet/planet-11.png')}
                    style={styles.planetimage}
                  />
                  <Text style={styles.t}>0/0</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.planet}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedPlanet({
                    name: '업적 3',
                    image: require('../assets/planet/planet-12.png'),
                  });
                  setModalVisible(true);
                }}
                style={styles.planet}
              >
                <Image
                  source={require('../assets/planet/planet-12.png')}
                  style={styles.planetimage}
                />
                <Text style={styles.t}>0/0</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.planetcontainer}>
            <View style={styles.planet}>
            <TouchableOpacity
                onPress={() => {
                  setSelectedPlanet({
                    name: '업적 4',
                    image: require('../assets/planet/planet-07.png'),
                  });
                  setModalVisible(true);
                }}
                style={styles.planet}
              >
                <Image
                  source={require('../assets/planet/planet-07.png')}
                  style={styles.planetimage}
                />
                <Text style={styles.t}>0/0</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.planet}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedPlanet({
                    name: '업적 1',
                    image: require('../assets/planet/planet-02.png'),
                  });
                  setModalVisible(true);
                }}
                style={styles.planet}
              >
                <Image
                  source={require('../assets/planet/planet-02.png')}
                  style={styles.planetimage}
                />
                <Text style={styles.t}>0/0</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.planet}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedPlanet({
                    name: '업적 1',
                    image: require('../assets/planet/planet-06.png'),
                  });
                  setModalVisible(true);
                }}
                style={styles.planet}
              >
                <Image
                  source={require('../assets/planet/planet-06.png')}
                  style={styles.planetimage}
                />
                <Text style={styles.t}>0/0</Text>
              </TouchableOpacity>
            </View>
          </View>
          <PlanetModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            planetName={selectedPlanet.name}
            planetImage={selectedPlanet.image}
          />
        </View>
			</ImageBackground>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#2C2C2C',
  // },
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
    marginBottom: 5
  }
});

export default MyPageScreen;
