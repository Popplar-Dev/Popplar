import {useState, useEffect} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  Client,
  Message,
  IMessage,
  IFrame,
  wsErrorCallbackType,
} from '@stomp/stompjs';

import ChatHeader from './ChatHeader';
import ReceivedChatMessage from './ReceivedChatMesasge';
import SentChatMessage from './SentChatMessage';
import ChatInput from './ChatInput';

import {ChatMessageType} from '../../types/chatType';

const stompConfig = {
  connectHeaders: {},
  brokerURL: 'ws://10.0.2.2:8080/gs-guide-websocket/websocket',
  debug: (str: string) => {
    console.log('STOMP: ' + str);
  },
  reconnectDelay: 2000,
  forceBinaryWSFrames: true,
  appendMissingNULLonIncoming: true,
};

export default function ChatRoom() {
  const navigation = useNavigation();
  const [memberId, setMemberId] = useState(446164955855);
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    const stompClient = new Client(stompConfig);

    stompClient.onConnect = (frame: IFrame) => {
      console.log('STOMP WebSocket connected');

      setIsConnected(true);

      stompClient.subscribe('/topic/greetings', (message: IMessage) => {
        if (message.body) {
          console.log('Received message: ', message.body);
          console.log('Message headers:', message.headers);

          const messageId = message.headers['message-id'];
          const messageBody = JSON.parse(message.body);
          const today = new Date();

          const dateOptions: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };

          const timeOptions: Intl.DateTimeFormatOptions = {
            dayPeriod: 'long',
            hour: '2-digit',
            minute: '2-digit',
          };

          const formattedDate = today.toLocaleDateString('ko-KR', dateOptions);
          const formattedTime = today.toLocaleTimeString('ko-KR', timeOptions);

          console.log(memberId, messageBody.memberId);

          const newMessage: ChatMessageType = {
            'message-id': messageId,
            chattingRoomId: messageBody.chattingRoomId,
            messageType:
              memberId === parseInt(messageBody.memberId) ? 'me' : 'others',
            memberId: messageBody.memberId,
            memberName: messageBody.memberName,
            chattingContent: messageBody.chattingContent,
            date: formattedDate,
            time: formattedTime,
          };

          setMessages((prev: ChatMessageType[]) => [...prev, newMessage]);
          // You can also acknowledge the message if needed
          // message.ack();
        } else {
          console.log('got empty message');
        }
      });
    };

    stompClient.onStompError = (frame: IFrame) => {
      console.log('Broker reported error:' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    stompClient.onWebSocketError = (error: wsErrorCallbackType) => {
      console.log(error);
    };

    stompClient.onDisconnect = () => {
      console.log('STOMP WebSocket disconnected');
      setIsConnected(false);
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  const sendMessage = (messageBody: string) => {
    if (client && client.connected) {
      const destination = '/app/hello';

      const message = JSON.stringify({
        chattingRoomId: 1,
        memberId: 446164955855,
        chattingContent: messageBody,
      });

      client.publish({
        destination: destination,
        body: message,
      });
    }
  };

  type flatListItem = {item: ChatMessageType; index: number};
  const renderChatMessageItem = ({item, index}: flatListItem) => {

    let msgStart = false; 
    if (index === 0 || messages[index-1].memberId !== messages[index].memberId || messages[index-1].time !== messages[index].time) {
      msgStart = true;
    }

    let showTime = false;
    if (index === messages.length-1 || messages[index].memberId !== messages[index+1].memberId || messages[index].time !== messages[index+1].time) {
      showTime = true; 
    }
    
    if (item.messageType === 'me') {
      return <SentChatMessage msgStart={msgStart} chatData={item} showTime={showTime}/>;
    } else {
      return <ReceivedChatMessage msgStart={msgStart} chatData={item} showTime={showTime}/>;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <KeyboardAvoidingView style={styles.rootContainer}>
        <ChatHeader />
        <View style={styles.chatBubblesContainer}>
          <FlatList
            data={messages}
            renderItem={renderChatMessageItem}
            keyExtractor={(item: ChatMessageType) => item['message-id']}
          />
        </View>
        <ChatInput onSend={sendMessage} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // borderColor: 'white',
    // borderWidth: 1,
    justifyContent: 'space-between',
  },
  chatBubblesContainer: {
    flex: 1,
    // borderWidth:1,
    // borderColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
