import { useState, useEffect } from 'react'; 
import {View, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { Client, Message, IMessage, IFrame } from '@stomp/stompjs';

import ChatHeader from './ChatHeader';
import ReceivedChatMessage from './ReceivedChatMesasge';
import SentChatMessage from './SentChatMessage';
import ChatInput from './ChatInput';

const stompConfig = {
  connectHeaders: {}, 
  brokerURL: 'ws://localhost:8080/gs-guide-websocket', 
  debug: (str: string) => {console.log("STOMP: " + str)}, 
  reconnectDelay: 2000, 
}

export default function ChatRoom() {
  const navigation = useNavigation();
  const [client, setClient] = useState<Client|null>(null); 
  const [isConnected, setIsConnected] = useState(false); 

  useEffect(() => {

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

    stompClient.onDisconnect = () => {
      console.log('STOMP WebSocket disconnected'); 
      setIsConnected(false);
    }

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (client) {
        client.deactivate(); 
      }
    }
  }, [])

  const sendMessage = (messageBody: string) => {
    if (client && client.connected ) {
      const destination = "/app/chatting"; 
      
      client.publish({
        destination: destination,
        body: messageBody,  
      }); 
    }
  } 


  return (
    <View style={styles.rootContainer}>
      <ChatHeader />
      <View style={styles.chatBubblesContainer}>

        <ReceivedChatMessage msgStart={true} />
        <ReceivedChatMessage />
        <SentChatMessage msgStart={true} />
        
      </View>

      <ChatInput onSend={sendMessage} />

    </View>
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
