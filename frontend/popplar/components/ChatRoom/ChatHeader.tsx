import {View, Text, Pressable, Alert, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Menu, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import { useRecoilState } from 'recoil';
import { chatroomState } from '../recoil/chatroomState';

import { NavigationProp } from '@react-navigation/native';
import { TabNavigatorParamList } from '../types/tabNavigatorParams';
import {getToken} from '../services/getAccessToken';
import axios from 'axios';

type headerProps = {
  roomId: number;
  roomName: string;
  isMenuOpen: boolean;
  setIsMenuOpen: Function;
};

export default function ChatHeader({
  roomId,
  roomName,
  isMenuOpen,
  setIsMenuOpen,
}: headerProps) {
  const navigation = useNavigation<NavigationProp<TabNavigatorParamList>>();
  const [chatroomId, setChatroomId] = useRecoilState<number|null>(chatroomState);

  const goBack = () => {
    navigation.goBack();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  const exitChatroom = async () => {
    const userAccessToken = await getToken();
    if (!userAccessToken) return;

    try {
      const url = `https://k9a705.p.ssafy.io:8000/live-chat/chatting-room/${roomId}`;
      const res = await axios.delete(url, {
        headers: {'Access-Token': userAccessToken},
      });

      setChatroomId(null);
      navigation.navigate("Map");

    } catch (e) {
      console.error(e);
    }
  };

  const handleExitPress = async () => {
    Alert.alert(
      '정말 채팅방에서 퇴장하시겠습니까?',
      '',
      [
        {
          text: '퇴장',
          onPress: async () => exitChatroom(),
          style: 'default',
        },
        {
          text: '취소',
          onPress: () => {setIsMenuOpen(false)},
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          setIsMenuOpen(false);
        },
      },
    );
  };

  return (
    <View style={styles.provider}>
      <PaperProvider>
        <View style={styles.headerContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.goBackButtonOuter}>
              <Pressable onPress={goBack} android_ripple={{color: '#464646'}}>
                <Icon name="chevron-back" color="#8B90F7" size={25} />
              </Pressable>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{roomName}</Text>
            </View>
          </View>

          <Menu
            visible={isMenuOpen}
            onDismiss={() => setIsMenuOpen(false)}
            anchor={
              <View style={styles.ellipsisButtonOuter}>
                <Pressable
                  onPress={toggleMenu}
                  android_ripple={{color: '#464646'}}>
                  <Icon name="ellipsis-vertical" color="#8B90F7" size={25} />
                </Pressable>
              </View>
            }
            anchorPosition="bottom"
            contentStyle={styles.menuContainer}>
            <View style={styles.exitButtonOuterContainer}>
              <Pressable
                style={styles.exitButtonInnerContainer}
                android_ripple={{color: '#464646'}}
                onPress={handleExitPress}>
                <Icon name="exit-outline" size={23} color="#8B90F7"></Icon>
                <Text style={styles.exitButtonText}>채팅방 퇴장하기</Text>
              </Pressable>
            </View>
          </Menu>
        </View>
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  provider: {
    height: 50,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
    // borderWidth: 1,
    // borderColor: 'white',
    height: 50,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'white',
  },
  goBackButtonOuter: {
    marginEnd: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: 'white',
  },
  titleContainer: {
    // borderWidth: 1,
    // borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  ellipsisButtonOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: 'white',
  },
  buttonInner: {
    borderRadius: 16,
  },
  title: {
    padding: 0,
    color: '#8B90F7',
    fontSize: 20,
    lineHeight: 26,
    textAlignVertical: 'center',
    verticalAlign: 'top',
    marginVertical: 0,
    includeFontPadding: false,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  menuContainer: {
    backgroundColor: '#0c072c42',
    right: 20,
    // paddingHorizontal: 10,
  },
  exitButtonOuterContainer: {
    // borderColor: 'white',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  exitButtonInnerContainer: {
    flexDirection: 'row',
    // borderColor: 'white',
    // borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#0c072c42',
  },
  exitButtonText: {
    marginStart: 10,
    color: '#8B90F7',
    fontSize: 14,
  },
});
