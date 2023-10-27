import {View, StyleSheet} from 'react-native';
import ChatBubble from './ChatComponents/ChatBubble';
import ChatTime from './ChatComponents/ChatTime';

type SentChatMessageProps = {
  msgStart?: boolean;
  chatData?: string;
};

export default function SentChatMessage({
  msgStart = false,
}: SentChatMessageProps) {
  const imgUrl =
    'https://www.dailypaws.com/thmb/d3vNqnLf6Vqjz8oz5XObGCQxms4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tiny-white-kitten-873941684-2000-0bac130389984aba9751de5e5e50d25f.jpg';

  const chatTime = '오후 1:30';

  return (
    <View style={styles.rootContainer}>
      <View style={styles.chatBubbleContainer}>
        {chatTime && <ChatTime>{chatTime}</ChatTime>}
        <ChatBubble msgStart={msgStart} myMsg={true} color="#2c1a74">
          가나다라
        </ChatBubble>
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
    justifyContent: 'flex-end',
  },
  chatBubbleContainer: {
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 1,
  },
});
