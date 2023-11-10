import {useState} from 'react';
import {View, Image, Pressable, Text, StyleSheet} from 'react-native';
import {Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

type ChatProfileProps = {
  imgUrl: string;
  memberId: number;
};

export default function ChatProfile({imgUrl, memberId}: ChatProfileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={isMenuOpen}
        onDismiss={() => setIsMenuOpen(false)}
        anchor={
          <View style={styles.profilePicContainer}>
            <Pressable onPress={()=>{setIsMenuOpen(prev=>!prev)}}>
              <Image
                source={{
                  uri: imgUrl,
                }}
                style={styles.profilePic}
                alt="profilepic"
                resizeMode="cover"
              />
            </Pressable>
          </View>
        }
        anchorPosition="bottom"
        contentStyle={styles.menuContainer}>
        <View style={styles.buttonOuterContainer}>
          <Pressable
            style={styles.buttonInnerContainer}
            android_ripple={{color: '#464646'}}>
            <Icon name="chatbubbles-outline" size={23} color="#8B90F7"></Icon>
            <Text style={styles.buttonText}>쪽지하기</Text>
          </Pressable>
          <Pressable
            style={styles.buttonInnerContainer}
            android_ripple={{color: '#464646'}}>
            <Icon name="ban-outline" size={23} color="#8B90F7"></Icon>
            <Text style={styles.buttonText}>차단하기</Text>
          </Pressable>
        </View>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    // borderWidth: 1,
    // borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  profilePicContainer: {
    width: 40,
    height: 40,
    borderRadius: 15,
    // borderWidth: 1,
    // borderColor: 'white',
    overflow: 'hidden',
    
  },
  profilePic: {
    width: '100%',
    height: '100%',
    
  },
  menuContainer: {
    backgroundColor: '#0c072c',
    left: 40,
    // paddingHorizontal: 10,
  },
  buttonOuterContainer: {
    // borderColor: 'white',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    flexDirection: 'row',
    // borderColor: 'white',
    // borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: '#0c072c',
  },
  buttonText: {
    marginStart: 10,
    color: '#8B90F7',
    fontSize: 14,
  },
});
