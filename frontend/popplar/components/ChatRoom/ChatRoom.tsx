import {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Client,
  IMessage,
  IFrame,
  wsErrorCallbackType,
} from '@stomp/stompjs';

import ChatHeader from './ChatHeader';
import ReceivedChatMessage from './ReceivedChatMesasge';
import SentChatMessage from './SentChatMessage';
import ChatDate from './ChatComponents/ChatDate';
import ChatInput from './ChatInput';


import {ChatMessageType} from '../../types/chatType';

export default function ChatRoom() {
  const navigation = useNavigation();
  const [memberId, setMemberId] = useState(4);
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      'message-id': '3333',
      chattingRoomId: 1,
      messageType: 'others',
      memberId: 4,
      memberName: 'nickname',  
      chattingContent: '하이',
      date: '2023년 11월 3일 목요일',
      time: '오전 11:20',
    }

  ]);
  const [userAccessToken, setUserAccessToken] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    async function connectChatSocket() {
      const accessToken = await AsyncStorage.getItem('userAccessToken');
      if (accessToken !== null) {
        setUserAccessToken(JSON.parse(accessToken));
      } else {
        return;
      }
      const stompConfig = {
        connectHeaders: {
          'Access-Token': userAccessToken,
        },
        brokerURL: 'ws://k9a705.p.ssafy.io:8203/gs-guide-websocket/websocket',
        debug: (str: string) => {
          console.log('STOMP: ' + str);
        },
        reconnectDelay: 2000,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
      };
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

            const formattedDate = today.toLocaleDateString(
              'ko-KR',
              dateOptions,
            );
            const formattedTime = today.toLocaleTimeString(
              'ko-KR',
              timeOptions,
            );

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
    }

    connectChatSocket();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const sendMessage = (messageBody: string) => {
    if (client && client.connected) {
      const destination = '/app/hello';

      const message = JSON.stringify({
        chattingRoomId: 1,
        memberId: memberId,
        chattingContent: messageBody,
      });

      client
        .publish({
          destination: destination,
          body: message,
        })
    }
  };

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  };

  type flatListItem = {item: ChatMessageType; index: number};
  const renderChatMessageItem = ({item, index}: flatListItem) => {

    const currentMsg = messages[index]
    const prevMsg = messages[index - 1]
    const nextMsg = messages[index + 1]

    let msgStart = false;
    if (
      index === 0 ||
      prevMsg.memberId !== currentMsg.memberId ||
      prevMsg.time !== currentMsg.time
    ) {
      msgStart = true;
    }

    let showTime = false;
    if (
      index === messages.length - 1 ||
      currentMsg.memberId !== nextMsg.memberId ||
      currentMsg.time !== nextMsg.time
    ) {
      showTime = true;
    } 

    let showDate = false; 
    if (
      index === 0 || prevMsg.date !== currentMsg.date
    ) {
      showDate = true; 
    }

    let messageComponent;

    if (item.messageType === 'me') {
      messageComponent = (
        <SentChatMessage
          msgStart={msgStart}
          chatData={item}
          showTime={showTime}
        />
      );
    } else {
      messageComponent = (
        <ReceivedChatMessage
          msgStart={msgStart}
          chatData={item}
          showTime={showTime}
        />
      );
    }

    return (
      <>
        <View onStartShouldSetResponder={() => true}>{
          <>
          {showDate && item.date && <ChatDate>{`${item.date}`}</ChatDate>}
          {messageComponent}
        </>}</View>
      </>
    );
  };

  const pressScreen = () => {
    setIsMenuOpen(false);
    Keyboard.dismiss(); 

  }

  return (
    <TouchableWithoutFeedback
      onPress={pressScreen}>
      <KeyboardAvoidingView style={styles.rootContainer}>
        <ChatHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <View style={styles.chatBubblesContainer}>
          <FlatList
            data={messages}
            renderItem={renderChatMessageItem}
            keyExtractor={(item: ChatMessageType) => item['message-id']}
            initialScrollIndex={messages.length > 0 ? messages.length - 1 : 0}
            ref={flatListRef}
          />
        </View>
        <ChatInput onSend={sendMessage} onScrollToEnd={scrollToEnd} />
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
