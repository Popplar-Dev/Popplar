import { useEffect } from 'react'; 
import { Text, View, StyleSheet } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios';

import { messageType } from '../types/message';

type RootStackParamList = {
  Home: undefined;
  Detail: { message: messageType };
};

type DetailScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function MessageDetail({ route }: DetailScreenRouteProp) { 
  
  const { message } = route.params; 
  

  useEffect(()=>{
    async function getMessageDetail() {
      const accessToken = await AsyncStorage.getItem('userAccessToken');
      if (!accessToken) return;
      const userAccessToken = JSON.parse(accessToken); 
      try {
        //const url = `https://k9a705.p.ssafy.io:8000/member/message/${message.sentMemberId}/${message.messageId}`
        const url = `https://k9a705.p.ssafy.io:8000/member/message/356931964684/7`
        await axios.get(url, {
          headers: {'Access-Token': userAccessToken}
        })
      } catch (e) {
        console.error(e); 
      }
    }
    getMessageDetail(); 
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text>{message.sentMemberName}</Text>
        <Text>{message.content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginHorizontal: 12, 
    borderColor: 'white', 
    borderWidth: 1, 
    paddingHorizontal: 12, 
  }, 
  messageContainer: {
    borderColor: '#ececec',
    borderWidth: 1,
    width: '85%',
    height: 500
  }


});