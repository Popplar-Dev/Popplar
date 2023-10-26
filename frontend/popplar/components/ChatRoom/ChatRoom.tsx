import {View, Text, Pressable, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import ReceivedChatMessage from './ReceivedChatMesasge';
import SentChatMessage from './SentChatMessage';
import ChatInput from './ChatInput';

function ChatRoom() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.goBackButtonOuter}>
          <Pressable onPress={goBack} android_ripple={{color: '#464646'}}>
            <Icon name="chevron-back" color="#8B90F7" size={25} />
          </Pressable>
        </View>
        <View>
          <Text style={styles.title}>Chat</Text>
        </View>
      </View>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    // borderWidth: 1,
    // borderColor: 'white',
    height: 50,
  },
  goBackButtonOuter: {
    marginEnd: 12,
    borderRadius: 15,
    overflow: 'hidden',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  chatBubblesContainer: {
    flex: 1,
    // borderWidth:1, 
    // borderColor: 'white', 
    paddingVertical: 12,
    paddingHorizontal: 12,  
  }
});
