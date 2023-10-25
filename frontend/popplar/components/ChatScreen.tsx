import { useState, useEffect } from 'react'; 
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NavigationProp } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/Ionicons'; 

type NavigatorParamList = {
  AllPlaces: undefined,
  Chat: undefined,
  Map: undefined,  
  Notifications: undefined,
  MyPage: undefined, 
}

const ChatScreen = ({navigation} : { navigation: NavigationProp<NavigatorParamList> }) => {

  const tabBarHeight = useBottomTabBarHeight();

  const [ inChatRoom, setInChatRoom ] = useState(false);
  
  useEffect(() => {
    if ( inChatRoom ) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }

  }, [inChatRoom])

  const goBack = () => {
    navigation.goBack(); 
  }

  return (
    <View style={styles.rootContainer} >
      <View style={styles.headerContainer}>
        <View style={styles.goBackButtonOuter}>
          <Pressable onPress={goBack} android_ripple={{ color: '#464646'}}>
            <Icon name="chevron-back" color="white" size={25} />
          </Pressable>
        </View>
        <View>
          <Text style={styles.title} >Chat</Text>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1, 
    borderColor: 'white', 
    borderWidth: 1, 
  }, 
  headerContainer: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1, 
    borderColor: 'white',
    height: 50 
  }, 
  goBackButtonOuter: {
    marginEnd: 12, 
    borderRadius: 15, 
    overflow: "hidden"
  }, 
  title: {
    color: 'white', 
    fontSize: 20, 
  }

});