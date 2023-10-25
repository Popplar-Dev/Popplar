import { useState, useEffect } from 'react'; 
import { View, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NavigationProp } from '@react-navigation/native'; 

import ChatRoom from './ChatRoom/ChatRoom';

type NavigatorParamList = {
  AllPlaces: undefined,
  Chat: undefined,
  Map: undefined,  
  Notifications: undefined,
  MyPage: undefined, 
}

const ChatScreen = ({navigation} : { navigation: NavigationProp<NavigatorParamList> }) => {

  const tabBarHeight = useBottomTabBarHeight();

  const [ inChatRoom, setInChatRoom ] = useState(true);
  
  useEffect(() => {
    if ( inChatRoom ) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }

  }, [inChatRoom])

  return (
    <View style={styles.rootContainer} >
      {inChatRoom && <ChatRoom />} 
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1, 
  }, 
});