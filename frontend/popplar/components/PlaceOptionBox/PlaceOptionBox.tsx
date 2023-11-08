import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { TabNavigatorParamList } from '../types/tabNavigatorParams';
import GameListModal from '../Modals/GameListModal';

import {useRecoilState} from 'recoil';
import {chatroomState} from '../recoil/chatroomState';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Props = {
  type: 'chat' | 'game';
  spaceId: number;
};

export default function PlaceOptionBox({type, spaceId}: Props) {
  const {width} = Dimensions.get('window');
  const halfScreenWidth = width / 2.3;
  const navigation = useNavigation<NavigationProp<TabNavigatorParamList>>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [chatroom, setChatroom] = useRecoilState<number | null>(chatroomState);

  const openModal = () => {
    setModalVisible(true);
  };

  const gochat = async () => {
    if (chatroom && chatroom !== spaceId) {
      if (chatroom !== spaceId) {
        Alert.alert('이미 입장하신 채팅방이 있습니다.');
      } else {
        navigation.navigate('Chat');
      }
    } else {
      try {
        const accessToken = await AsyncStorage.getItem('userAccessToken');
        if (!accessToken) {
          Alert.alert('인증에 실패하셨습니다. ');
          return;
        }

        const userAccessToken = JSON.parse(accessToken);

        const url = `https://k9a705.p.ssafy.io:8000/live-chat/chatting-room/${spaceId}`;
        const res = await axios.post(url, {
          headers: {
            'Access-Token': userAccessToken,
          },
        });

        if (res.status === 200) {
          setChatroom(spaceId);
          navigation.navigate('Chat');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  let dynamicStyles = {
    placeOptionBox: {
      width: halfScreenWidth,
      // borderWidth: 1,
      // borderColor: 'red',
    },
  };

  return (
    <View style={dynamicStyles.placeOptionBox}>
      <View style={styles.placeOptionTitle}>
        <Icon
          name={type == 'game' ? 'gamepad' : 'comments'}
          size={22}
          color={'white'}
          style={styles.qnaIcon}
        />
        <Text style={styles.placeOptionName}>
          {type == 'game' ? 'GAME' : 'CHAT'}
        </Text>
      </View>
      <View style={styles.placeOptionContent}>
        <Text style={styles.placeFirstContent}>Let's start!</Text>
        <Text style={styles.placeContent}>
          Popplar의 사람들과
          {type == 'game' ? '게임을 통해 경쟁하세요' : '채팅을 시작하세요'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (type === 'game') {
              openModal();
            } else {
              gochat();
            }
          }}
          style={styles.placeOptionButton}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            {type === 'game' ? '게임 시작하기' : '채팅방 입장'}
          </Text>
        </TouchableOpacity>
      </View>
      <GameListModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        spaceid={spaceId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeOptionTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 13,
  },
  placeOptionName: {
    color: 'white',
    fontSize: 18,
    marginTop: 8,
    fontWeight: 'bold',
  },
  placeOptionContent: {
    marginTop: 10,
    backgroundColor: '#8B90F733',
    borderRadius: 14,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  placeFirstContent: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeContent: {
    color: 'white',
    opacity: 0.5,
    textAlign: 'center',
    marginBottom: 13,
    lineHeight: 22,
  },
  placeOptionButton: {
    height: 30,
    paddingTop: 4,
    backgroundColor: '#8B90F7',
    borderRadius: 14,
  },
  qnaIcon: {
    margin: 9,
  },
});
