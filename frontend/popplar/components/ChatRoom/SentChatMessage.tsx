import {View, StyleSheet} from 'react-native';
import ChatBubble from './ChatComponents/ChatBubble';
import ChatTime from './ChatComponents/ChatTime';
import {ChatMessageType} from '../../types/chatType';

type SentChatMessageProps = {
  msgStart?: boolean;
  showTime?: boolean, 
  chatData: ChatMessageType;
};

export default function SentChatMessage({
  msgStart = false,
  showTime = false, 
  chatData,
}: SentChatMessageProps) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.chatBubbleContainer}>
        {showTime && chatData.time && <ChatTime>{chatData.time}</ChatTime>}
        <ChatBubble msgStart={msgStart} myMsg={true} color="#2c1a74">
          {chatData.chattingContent}
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
