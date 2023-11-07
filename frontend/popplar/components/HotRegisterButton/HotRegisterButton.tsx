import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function HotRegisterButton() {
  const navigation = useNavigation();

  useEffect(() => {
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.get(`https://k9a705.p.ssafy.io:8000/member/qna/hotplace/${Id}`, 
          {headers: {'Access-Token': userAccessToken}}
        )
          .then((response) => {
            setQnaData(response.data[0])
          })
          .catch((err) => {
            console.log("에러 메시지 :", err)
          });
        }
      }
    isLogin()
  }, []);


  return (
    <TouchableOpacity>
      <View style={styles.button}>
      <Icon name="burn" size={19} color={'white'} style={styles.Icon}/>
        <Text style={styles.text}>핫플 등록</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',

    borderRadius: 20,
    borderStyle: 'solid',
    backgroundColor: '#8B90F733',
    marginRight: 23,
  },
  Icon: {
    marginRight: 7,
  },
  text: {
    color: 'white'
  }
})