import {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  FlatList,
  Pressable,
  Vibration,
  BackHandler,
  StyleSheet,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Icon from 'react-native-vector-icons/Ionicons';

import {messageType} from '../types/message';

import Message from './Message';
import {check} from 'react-native-permissions';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

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
      cancelDeletion();
      getReceivedMessages();
    }, []),
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isDeleting) {
          cancelDeletion();
          return true;
        }
        return false;
      },
    );

    if (isDeleting) {
      navigation.setOptions({
        headerRight: () => {
          return (
            <Pressable onPress={deleteItems}>
              <View style={styles.deleteButtonContainer}>
                <Icon name="trash-outline" size={23} color="#8B90F7" />
              </View>
            </Pressable>
          );
        },
      });
    } else {
      navigation.setOptions({
        headerRight: undefined,
      });
    }

    return () => backHandler.remove();
  }, [isDeleting, checkedItems]);

  const handlePressMessage = (item: messageType) => {
    if (isDeleting) {
      setCheckedItems(prevCheckedItems => {
        if (prevCheckedItems.includes(item.messageId)) {
          return prevCheckedItems.filter(i => i !== item.messageId);
        } else {
          return [...prevCheckedItems, item.messageId];
        }
      });
    } else {
      navigation.navigate('Detail', {message: item});
    }
  };

  const handleLongPressMessage = (item: messageType) => {
    Vibration.vibrate(100);
    if (!checkedItems.includes(item.messageId)) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, item.messageId]);
    }
    setIsDeleting(true);
  };

  const deleteItems = async () => {
    // console.log(`delete ${checkedItems}`);
    setCheckedItems([]); 
  };

  const cancelDeletion = () => {
    setCheckedItems([]);
    setIsDeleting(false);
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.messageId.toString()}
        renderItem={({item, index}) => {
          return (
            <Pressable
              onPress={() => handlePressMessage(item)}
              onLongPress={() => handleLongPressMessage(item)}
              android_ripple={{color: '#5e5d5d'}}>
              <Message
                msgType="received"
                read={item.checked}
                isDeleting={isDeleting}
                isChecked={checkedItems.includes(item.messageId)}
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
  deleteButtonContainer: {
    paddingEnd: 10,
  },
});
