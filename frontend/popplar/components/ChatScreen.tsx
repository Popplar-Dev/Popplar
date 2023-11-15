import {View, StyleSheet} from 'react-native';

import {useRecoilState} from 'recoil';
import {chatroomState} from './recoil/chatroomState';

import ChatRoom from './ChatRoom/ChatRoom';
import NoChatroom from './ChatRoom/NoChatroom';

const ChatScreen = () => {
  const [chatroomId, setChatroomId] = useRecoilState<number | null>(
    chatroomState,
  );

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
