import {View, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';


import ChatHeader from './ChatHeader';
import ReceivedChatMessage from './ReceivedChatMesasge';
import SentChatMessage from './SentChatMessage';
import ChatInput from './ChatInput';

function ChatRoom() {
  const navigation = useNavigation();

  return (
    <View style={styles.rootContainer}>
      <ChatHeader />
      <View style={styles.chatBubblesContainer}>

        <ReceivedChatMessage msgStart={true} />
        <ReceivedChatMessage />
        <SentChatMessage msgStart={true} />
        
      </View>

      <ChatInput />

    </View>
  );
}

export default ChatRoom;

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
