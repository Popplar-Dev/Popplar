import {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import { useRecoilValue } from 'recoil';
import { userIdState } from '../recoil/userState';

import {Client, IMessage, IFrame, wsErrorCallbackType} from '@stomp/stompjs';

import ChatHeader from './ChatHeader';
import ReceivedChatMessage from './ReceivedChatMesasge';
import SentChatMessage from './SentChatMessage';
import ChatDate from './ChatComponents/ChatDate';
import ChatInput from './ChatInput';

import {ChatMessageType} from '../../types/chatType';
import { getToken } from '../services/getAccessToken';

import axios from 'axios';

export default function ChatRoom({roomId}: {roomId: number}) {
  const navigation = useNavigation();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const memberId = useRecoilValue(userIdState);
  const clientRef = useRef<Client|null>(null);
  const flatListRef = useRef<FlatList | null>(null);

  // console.log('mount 몇 번?')

  useEffect(()=> {
    async function getRoomName() {
      const userAccessToken = await getToken();
      try {
        const url = `https://k9a705.p.ssafy.io:8000/hot-place/${roomId}`
        const res = await axios.get(url, {
          headers: { 'Access-Token': userAccessToken}
        })

        setRoomName(res.data.placeName)

      } catch (e) {
        console.error(e); 
      }

    }

    getRoomName(); 
  }, [])

  useFocusEffect(
    useCallback(() => {
      async function connectChatSocket() {
        const userAccessToken = await getToken();
        if (userAccessToken === null) {
          return; 
        }
      
        if (clientRef.current && clientRef.current.connected) {
          console.log('WebSocket already connected');
          return;
        }

        // console.log(clientRef.current); 
        if (clientRef.current) {
          console.log('client active? 1', clientRef.current.active)
          console.log('client connected? 1', clientRef.current.connected)
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

          stompClient.subscribe(`/room/${roomId}`, (message: IMessage) => {
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
        };

        stompClient.onWebSocketClose = () => {
          console.log('STOMP WebSocket closed')
        }

        stompClient.activate();
        clientRef.current = stompClient;
        // console.log(stompClient)

        if (stompClient) {
          console.log('client active? 2', stompClient.active)
          console.log('client connected? 2', stompClient.connected)

        }
      }

      connectChatSocket();

      return () => {
        console.log('component unmount?')
        console.log(clientRef.current)
        if (clientRef.current) {
          console.log('deactivating');
          clientRef.current.deactivate();
        }
      };
    }, []),
  );

  const sendMessage = (messageBody: string) => {
    if (clientRef.current && clientRef.current.connected) {
      const destination = `/live-chat/chat/${roomId}`;

      const message = JSON.stringify({
        chattingRoomId: roomId,
        memberId: memberId,
        chattingContent: messageBody,
      });

      console.log(message);

      clientRef.current.publish({
        destination: destination,
        body: message,
      });
    }
  };

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  };

  type flatListItem = {item: ChatMessageType; index: number};
  const renderChatMessageItem = ({item, index}: flatListItem) => {
    const currentMsg = messages[index];
    const prevMsg = messages[index - 1];
    const nextMsg = messages[index + 1];

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
    if (index === 0 || prevMsg.date !== currentMsg.date) {
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
        <View onStartShouldSetResponder={() => true}>
          {
            <>
              {showDate && item.date && <ChatDate>{`${item.date}`}</ChatDate>}
              {messageComponent}
            </>
          }
        </View>
      </>
    );
  };

  const pressScreen = () => {
    setIsMenuOpen(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={pressScreen}>
      <KeyboardAvoidingView style={styles.rootContainer}>
        <ChatHeader roomId={roomId} roomName={roomName} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
