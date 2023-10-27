import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import ChatMenu from './ChatComponents/ChatMenu';

export default function ChatHeader() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const showMenu = () => {
    return
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.goBackButtonOuter}>
          <Pressable onPress={goBack} android_ripple={{color: '#464646'}}>
            <Icon name="chevron-back" color="#8B90F7" size={25} />
          </Pressable>
        </View>
        <View>
          <Text style={styles.title}>Chat</Text>
        </View>
      </View>
      <View style={styles.ellipsisButtonOuter}>
        <Pressable onPress={goBack} android_ripple={{color: '#464646'}}>
          <Icon name="ellipsis-vertical" color="#8B90F7" size={25} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
    // borderWidth: 1,
    // borderColor: 'white',
    height: 50,
  },
  leftContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'white',
    

  },
  goBackButtonOuter: {
    marginEnd: 12,
    width: 32, 
    height: 32,
    borderRadius: 16,
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: 'white',
  },
  ellipsisButtonOuter: {
    width: 32, 
    height: 32,
    borderRadius: 16,
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonInner: {
    borderRadius: 16, 

  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    // borderWidth: 1,
    // borderColor: 'white',
  },
});
