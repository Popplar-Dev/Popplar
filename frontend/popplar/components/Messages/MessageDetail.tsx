import {useEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {messageType} from '../types/message';

type RootStackParamList = {
  Home: undefined;
  Detail: {message: messageType; tab: 'received' | 'sent'};
};

type DetailScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'Detail'
>;

export default function MessageDetail({route}: DetailScreenRouteProp) {
  const {message, tab} = route.params;
  // console.log(route);
  const imgUrl =
  'https://i.pinimg.com/736x/4c/7b/63/4c7b63eac0e1645c5c3b9e3bcf706074.jpg';

  useEffect(() => {
    async function getMessageDetail() {
      const accessToken = await AsyncStorage.getItem('userAccessToken');
      if (!accessToken) return;
      const userAccessToken = JSON.parse(accessToken);
      try {
        //const url = `https://k9a705.p.ssafy.io:8000/member/message/${message.sentMemberId}/${message.messageId}`
        const url = `https://k9a705.p.ssafy.io:8000/member/message/356931964684/7`;
        await axios.get(url, {
          headers: {'Access-Token': userAccessToken},
        });
      } catch (e) {
        console.error(e);
      }
    }
    getMessageDetail();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <View style={styles.usernameContainer}>
          <View style={styles.profilePicContainer}>
            <Image
              source={{
                uri: imgUrl,
              }}
              style={styles.profilePic}
              alt="profilepic"
              resizeMode="cover"
            />
          </View>
          <Text style={styles.username}>
            {tab === 'received'
              ? message.sentMemberName
              : message.receivedMemberName}
            이름
          </Text>
        </View>
        <View style={styles.messageContentContainer}>
          <Text style={styles.content}>{message.content}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 12,
    // borderColor: 'white',
    // borderWidth: 1,
    paddingHorizontal: 12,
  },
  messageContainer: {
    marginTop: 30,
    borderColor: '#8B90F7',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: '95%',
    padding: 25,
    minHeight: 200,
  },
  profilePicContainer: {
    width: 40,
    height: 40,
    borderRadius: 24,
    // borderWidth: 1,
    // borderColor: 'white',
    overflow: 'hidden',
    marginEnd: 12
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  usernameContainer: {
    paddingBottom: 12,
    borderBottomColor: '#8B90F7',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center', 
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  messageContentContainer: {
    paddingTop: 12,
  },
  content: {
    color: 'white',
  },
});
