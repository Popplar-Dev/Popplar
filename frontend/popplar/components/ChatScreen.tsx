import {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect, NavigationProp, useNavigation} from '@react-navigation/native';

import {useRecoilState} from 'recoil';
import {chatroomState} from './recoil/chatroomState';

import {TabNavigatorParamList} from './types/tabNavigatorParams';
import ChatRoom from './ChatRoom/ChatRoom';
import NoChatroom from './ChatRoom/NoChatroom';

const ChatScreen = () => {
  const navigation = useNavigation<NavigationProp<TabNavigatorParamList>>();
  const [inChatRoom, setInChatRoom] = useState(true);
  const [chatroomId, setChatroomId] = useRecoilState<number | null>(
    chatroomState,
  );
  console.log('chatscreen')

  const checkChatroom = useCallback(() => {
    console.log('chatroomId ', chatroomId)
    console.log('navigation', navigation)
    console.log(navigation.getState())
    if (chatroomId) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [chatroomId]);

  useFocusEffect(checkChatroom);

  return (
    <View style={styles.rootContainer}>
      {chatroomId ? <ChatRoom roomId={chatroomId} /> : <NoChatroom />}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
