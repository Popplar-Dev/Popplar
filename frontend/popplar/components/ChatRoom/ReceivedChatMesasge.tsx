import {View, StyleSheet} from 'react-native';
import ChatProfile from './ChatComponents/ChatProfile';
import ChatBubble from './ChatComponents/ChatBubble';
import ChatNickname from './ChatComponents/ChatNickname';
import ChatTime from './ChatComponents/ChatTime';
import {ChatMessageType} from '../../types/chatType';

type ReceivedChatMessageProps = {
  msgStart?: boolean;
  showTime?: boolean;
  chatData: ChatMessageType;
};

export default function ReceivedChatMessage({
  msgStart = false,
  showTime,
  chatData,
}: ReceivedChatMessageProps) {
  const imgUrl = chatData? chatData.memberProfileImage: "";

  return (
    <View style={styles.rootContainer}>
      <View style={styles.profileContainer}>
        {msgStart &&
          (chatData.memberProfileImage ? (
            <ChatProfile
              imgUrl={chatData.memberProfileImage}
              memberId={chatData.memberId}
              memberName={chatData.memberName}
            />
          ) : (
            <ChatProfile imgUrl={imgUrl} memberId={chatData.memberId} memberName={chatData.memberName}/>
          ))}
      </View>
      <View style={styles.messageContainer}>
        {msgStart && <ChatNickname>{chatData.conqueror ? `${chatData.memberName} 👑` : chatData.memberName}</ChatNickname>}
        <View style={styles.chatBubbleContainer}>
          <ChatBubble msgStart={msgStart}>
            {chatData.chattingContent}
          </ChatBubble>
          {showTime && chatData.time && <ChatTime>{chatData.time}</ChatTime>}
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
    width: 40,
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
