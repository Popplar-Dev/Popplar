import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Menu, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

type headerProps = {
  roomName: string;
  isMenuOpen: boolean;
  setIsMenuOpen: Function;
};

export default function ChatHeader({roomName, isMenuOpen, setIsMenuOpen}: headerProps) {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  return (<View style={styles.provider}>
          <PaperProvider>
            <View style={styles.headerContainer}>
              <View style={styles.leftContainer}>
                <View style={styles.goBackButtonOuter}>
                  <Pressable onPress={goBack} android_ripple={{color: '#464646'}}>
                    <Icon name="chevron-back" color="#8B90F7" size={25} />
                  </Pressable>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{roomName}</Text>
                </View>
              </View>

              <Menu
                visible={isMenuOpen}
                onDismiss={() => setIsMenuOpen(false)}
                anchor={
                  <View style={styles.ellipsisButtonOuter}>
                    <Pressable
                      onPress={toggleMenu}
                      android_ripple={{color: '#464646'}}>
                      <Icon name="ellipsis-vertical" color="#8B90F7" size={25} />
                    </Pressable>
                  </View>
                }
                anchorPosition="bottom"
                contentStyle={styles.menuContainer}>
                <Text>채팅방 퇴장하기</Text>
              </Menu>
            </View>
          </PaperProvider>

  </View>
  );
}

const styles = StyleSheet.create({
  provider: {
    height: 50,
    // borderWidth: 1,
    // borderColor: 'white',

  }, 
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
  titleContainer: {
    // borderWidth: 1, 
    // borderColor: 'white',
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlignVertical: 'center'
  },
  ellipsisButtonOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: 'white',
  },
  buttonInner: {
    borderRadius: 16,
  },
  title: {
    padding: 0,
    color: 'white',
    fontSize: 20,
    lineHeight: 26,
    textAlignVertical: 'center',
    verticalAlign: 'top',
    marginVertical: 0,
    includeFontPadding: false,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  menuContainer: {
    backgroundColor: '#b8bbf7',
    right: 20,
    paddingHorizontal: 10,
  },
});
