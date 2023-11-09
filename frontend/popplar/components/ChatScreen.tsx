import { useState, useEffect } from 'react'; 
import { View, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { useRecoilState } from 'recoil';
import { chatroomState } from './recoil/chatroomState';

import { TabNavigatorParamList } from './types/tabNavigatorParams';
import ChatRoom from './ChatRoom/ChatRoom';
import NoChatroom from './ChatRoom/NoChatroom';

const ChatScreen = ({navigation} : { navigation: NavigationProp<TabNavigatorParamList> }) => {

  const [ inChatRoom, setInChatRoom ] = useState(true);
  const [ chatroomId, setChatroomId ] = useRecoilState<number|null>(chatroomState); 
  
  useEffect(() => {
    if ( chatroomId ) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }

  }, [inChatRoom])

  return (
    <View style={styles.rootContainer} >
      {chatroomId ? <ChatRoom roomId={chatroomId}/> : <NoChatroom />} 
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1, 
  }, 
});