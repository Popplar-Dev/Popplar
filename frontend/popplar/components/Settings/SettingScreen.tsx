import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingScreen() {

  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('ProfileSetting' as never); 
  };
  const navigateToAlarm = () => {
    navigation.navigate('AlarmSetting' as never); 
  };
  const navigateToTerm = () => {
    navigation.navigate('Terms' as never); 
  };
  const navigateToInquire = () => {
    navigation.navigate('Inquire' as never); 
  };


  const navigateToSpeedTouch = () => {
    navigation.navigate('SpeedTouch' as never); 
  };
  const navigateToQnaList = () => {
    navigation.navigate('QnaList' as never); 
  };

  const Logout = () => {
    AsyncStorage.clear();
    navigation.navigate('Home' as never);
  };



  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('popplar/assets/stars.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.menucontainer}>
          <View>
            <Pressable onPress={navigateToProfile}>
              <View style={styles.menu}>
                <Icon style={styles.icons} name='person-outline' size={25} color='#ffffff'
                />
                <Text style={styles.text}>프로필 수정</Text>
              </View>
            </Pressable>
            <Pressable onPress={navigateToAlarm}>
              <View style={styles.menu}>
                <Icon style={styles.icons} name='notifications-outline' size={25} color='#ffffff'
                />
                <Text style={styles.text}>알림</Text>
              </View>
            </Pressable>
            <Pressable onPress={navigateToInquire}>
              <View style={styles.menu}>
                <Icon style={styles.icons} name='help-circle-outline' size={25} color='#ffffff'
                />
                <Text style={styles.text}>문의하기</Text>
              </View>
            </Pressable>
            <Pressable onPress={navigateToTerm}>
              <View style={styles.menu}>
                <Icon style={styles.icons} name='information-circle-outline' size={25} color='#ffffff'
                />
                <Text style={styles.text}>이용약관 및 개인정보 정책</Text>
              </View>
            </Pressable>

            <Pressable onPress={navigateToSpeedTouch}>
              <View style={styles.menu}>
                <Text style={styles.text}>반응 속도 게임</Text>
              </View>
            </Pressable>
            <Pressable onPress={navigateToQnaList}>
              <View style={styles.menu}>
                <Text style={styles.text}>Q&A</Text>
              </View>
            </Pressable>
          </View>
          <Pressable onPress={Logout}>
            <Text style={styles.logout}>로그아웃</Text>
          </Pressable>
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
  text: {
    color:'white',
    fontSize:15
  },
  menucontainer: {
    justifyContent:'center',
    alignItems:'center',
    top:'15%',
  },
  menu: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom:30,
  },
  icons: {
    marginRight:10
  },
	backgroundImage: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
  logout: {
    color:'red',
    fontSize:15,
    marginTop:30,
    fontWeight:'bold'
  }
});

export default SettingScreen;
