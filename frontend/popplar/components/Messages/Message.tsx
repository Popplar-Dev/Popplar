import {View, Text, Image, StyleSheet} from 'react-native';
import { messageType } from '../types/message';

type messageProp = {
  checked?: boolean;
  msgType: 'received' | 'sent';
  message: messageType; 
};

export default function Message({checked = false, msgType, message }: messageProp) {
  const imgUrl =
    'https://i.pinimg.com/736x/4c/7b/63/4c7b63eac0e1645c5c3b9e3bcf706074.jpg';

  return (
    <View
      style={
        (checked && msgType==="received") ? [styles.container, styles.checkedColor] : [styles.container]
      }>
      <View style={styles.profilePicContainer}>
        <Image
          source={{
            uri: imgUrl,
          }}
          style={styles.profilePic}
          alt="profilepic"
          resizeMode="cover"
        />
      </View>
      {/* <ChatProfile imgUrl="https://i.pinimg.com/736x/4c/7b/63/4c7b63eac0e1645c5c3b9e3bcf706074.jpg" /> */}
      <View style={styles.messageContentContainer}>
        <Text
          style={
            (checked && msgType==="received")
              ? [styles.nickname, styles.checkedTextColor]
              : styles.nickname
          }>
          재은
        </Text>
        <Text
          style={
            (checked && msgType==="received") ? [styles.content, styles.checkedTextColor] : styles.content
          }
          numberOfLines={1}
          ellipsizeMode="tail">
          간단한 내용. 이렇게 이렇게 멧지를 써볼까 함 여기서 만나는 거 어떻게
          생각하는지 답장을 줘도 좋고
        </Text>
        <Text
          style={
            (checked && msgType==="received") ? [styles.date, styles.checkedTextColor] : styles.date
          }>
          11월 6일 1시 30분
        </Text>
      </View>

      <View style={styles.checkmarkContainer}>
        {msgType==='received' && !checked && <View style={styles.checkmark}></View>}
      </View>
    </View>
  );
}
// '#2f2f2fbc', '#1e1e1e80'
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#2f2f2fbc',
    width: '100%',
    height: 80,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderColor: 'white',
    // borderWidth: 1,
  },
  checkedColor: {
    backgroundColor:  '#1e1e1e80',
  },
  checkedTextColor: {
    color: '#b8b8b8',
  },
  profilePicContainer: {
    width: 60,
    height: 60,
    borderRadius: 24,
    // borderWidth: 1,
    // borderColor: 'white',
    overflow: 'hidden',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  messageContentContainer: {
    width: '80%',
    // borderColor: 'white',
    // borderWidth: 1,
    paddingHorizontal: 12,
  },
  nickname: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
  },
  content: {
    color: 'white',
    fontSize: 12,
    marginBottom: 3,
  },
  date: {
    color: '#d6d6d6',
    fontSize: 10,
  },
  checkmarkContainer: {
    flex: 1,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: '#613EEA',
    borderRadius: 25,
    marginTop: 6,
  },
});
