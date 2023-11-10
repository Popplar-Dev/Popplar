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
  const imgUrl =
    !chatData.memberProfileImage ||
    chatData.memberProfileImage?.includes(
      'popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com',
    )
      ? 'https://www.dailypaws.com/thmb/d3vNqnLf6Vqjz8oz5XObGCQxms4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tiny-white-kitten-873941684-2000-0bac130389984aba9751de5e5e50d25f.jpg'
      : chatData.memberProfileImage;

  return (
    <View style={styles.rootContainer}>
      <View style={styles.profileContainer}>
        {msgStart &&
          (chatData.memberProfileImage ? (
            <ChatProfile
              imgUrl={chatData.memberProfileImage}
              memberId={chatData.memberId}
            />
          ) : (
            <ChatProfile imgUrl={imgUrl} memberId={chatData.memberId} />
          ))}
      </View>
      <View style={styles.messageContainer}>
        {msgStart && <ChatNickname>{chatData.memberName}</ChatNickname>}
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
