import { useState, useEffect, useRef } from 'react'; 
import {View, TouchableWithoutFeedback, FlatList, StyleSheet, Keyboard, KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { Client, Message, IMessage, IFrame, wsErrorCallbackType } from '@stomp/stompjs';

import ChatHeader from './ChatHeader';
import ReceivedChatMessage from './ReceivedChatMesasge';
import SentChatMessage from './SentChatMessage';
import ChatInput from './ChatInput';

const stompConfig = {
  connectHeaders: {
  }, 
  brokerURL: 'ws://10.0.2.2:8080/gs-guide-websocket/websocket', 
  debug: (str: string) => {console.log("STOMP: " + str)}, 
  reconnectDelay: 2000, 
  forceBinaryWSFrames: true,
  appendMissingNULLonIncoming: true
}

type ChatMessage = {
  messageType: 'me' | 'others';
  memberId: number;  
  nickname: string; 
  profilePic?: string;  
  content: string; 
  date?: string;
  time?: string; 
}

export default function ChatRoom() {
  const navigation = useNavigation();
  const [ memberId, setMemberId ] = useState(0); 
  const [client, setClient] = useState<Client|null>(null); 
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]); 

  useEffect(() => {

    setMemberId(1);

    const stompClient = new Client(stompConfig); 

    stompClient.onConnect = (frame: IFrame) => {
      console.log(
        'STOMP WebSocket connected'
      );

      setIsConnected(true); 

      stompClient.subscribe('/topic/greetings', (message: IMessage) => {
        if (message.body) {
          console.log('Received message: ', message.body); 
          console.log('Message headers:', message.headers);

          // You can also acknowledge the message if needed
          // message.ack();
        } else {
          console.log('got empty message')
        }
      })
    }

    stompClient.onStompError = (frame: IFrame) => {
      console.log('Broker reported error:' + frame.headers['message']); 
      console.log('Additional details: ' + frame.body);
    }

    stompClient.onWebSocketError = (error: wsErrorCallbackType) => {
      console.log(error)
    }

    stompClient.onDisconnect = () => {
      console.log('STOMP WebSocket disconnected'); 
      setIsConnected(false);
    }

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (stompClient) {
        stompClient.deactivate(); 
      }
    }
  }, [])

  const sendMessage = (messageBody: string) => {
    if (client && client.connected ) {
      const destination = "/app/hello"; 

      const message = JSON.stringify({'chattingRoomId': 1, 'memberId': 446164955855, 'chattingContent': messageBody})
      
      client.publish({
        destination: destination,
        body: message,  
      }); 
    }
  } 

  type flatListItem = {item: ChatMessage}
  const renderChatMessageItem = ({item}: flatListItem) => {
    
    if (item.messageType === 'me') {
      return (
        <SentChatMessage msgStart={true} />
      )
    } else {
      return (

        <ReceivedChatMessage msgStart={true} />
  
    )
      
    }
    

  }


  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
      <KeyboardAvoidingView style={styles.rootContainer}>
        <ChatHeader />
        <View style={styles.chatBubblesContainer}>

          <FlatList data={messages} renderItem={renderChatMessageItem} keyExtractor={(item: ChatMessage)=> `${item.date}-${item.time}`}/>

          {/* <ReceivedChatMessage msgStart={true} />
          <ReceivedChatMessage />
          <SentChatMessage msgStart={true} /> */}
          
        </View>

        <ChatInput onSend={sendMessage} setMessages={setMessages}/>

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
  }
});
