import {View, StyleSheet} from 'react-native';
import ChatProfile from './ChatComponents/ChatProfile';
import ChatBubble from './ChatComponents/ChatBubble';
import ChatNickname from './ChatComponents/ChatNickname';
import ChatTime from './ChatComponents/ChatTime';

type ReceivedChatMessageProps = {
  msgStart?: boolean;
  chatData?: string;
};

export default function ReceivedChatMessage({
  msgStart = false,
}: ReceivedChatMessageProps) {
  const imgUrl =
    'https://www.dailypaws.com/thmb/d3vNqnLf6Vqjz8oz5XObGCQxms4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tiny-white-kitten-873941684-2000-0bac130389984aba9751de5e5e50d25f.jpg';

  const chatTime = '오후 1:30';

  return (
    <View style={styles.rootContainer}>
      <View style={styles.profileContainer}>
        {msgStart && <ChatProfile imgUrl={imgUrl} />}
      </View>
      <View style={styles.messageContainer}>
        {msgStart && <ChatNickname>nickname😶</ChatNickname>}
        <View style={styles.chatBubbleContainer}>
          <ChatBubble msgStart={msgStart}>가나다라마바사</ChatBubble>
          {chatTime && <ChatTime>{chatTime}</ChatTime>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    minHeight: 40,
    // borderColor: 'white',
    // borderWidth: 1,
    flexDirection: 'row',
  },
  profileContainer: {
    // borderColor: 'red',
    // borderWidth:1,
    width: 50,
  },
  messageContainer: {
    // borderColor: 'blue',
    // borderWidth: 1,
    flex: 1,
  },
  chatBubbleContainer: {
    flexDirection: 'row',
  },
});
