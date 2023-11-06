import {useState, useCallback} from 'react';
import {
  Text,
  View,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {messageType} from '../types/message';

import Message from './Message';

type RootStackParamList = {
  Home: undefined;
  Detail: {message: messageType};
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function ReceivedMessages({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  const [messages, setMessages] = useState<messageType[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function getReceivedMessages() {
        const accessToken = await AsyncStorage.getItem('userAccessToken');
        if (!accessToken) return;
        const userAccessToken = JSON.parse(accessToken);
        try {
          const url = `https://k9a705.p.ssafy.io:8000/member/message/find-all/356931964684`;

          const res = await axios.get(url, {
            headers: {
              'Access-Token': userAccessToken,
            },
          });

          if (res.status === 200) {
            setMessages(res.data);
          }
        } catch (e) {
          console.error(e);
        }
      }
      getReceivedMessages();
    }, []),
  );

  const handlePressMessage = (item: messageType) => {
    navigation.navigate('Detail', {message: item});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.messageId.toString()}
        renderItem={({item, index}) => {
          return (
            <Pressable onPress={() => handlePressMessage(item)}>
              <Message
                msgType="received"
                checked={item.checked}
                message={item}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
