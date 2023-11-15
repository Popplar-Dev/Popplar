import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {messageType} from '../types/message';

type messageProp = {
  read?: boolean;
  isDeleting?: boolean;
  isChecked?: boolean;
  msgType: 'received' | 'sent';
  message: messageType;
};

export default function Message({
  read = false,
  isDeleting = false,
  isChecked = false,
  msgType,
  message,
}: messageProp) {
  const imgUrl =
    msgType === 'received'
      ? message.sentMemberProfileImage
      : message.receivedMemberProfile;
    
      const createdDate = new Date(message.createdAt)
      const dateOptions: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
      };
    
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
      };
    
      const formattedDate = createdDate.toLocaleDateString(
        'ko-KR',
        dateOptions,
      );
      const formattedTime = createdDate.toLocaleTimeString(
        'ko-KR',
        timeOptions,
      );

      const dateTime = `${formattedDate} ${formattedTime}`

  return (
    <View
      style={
        read && msgType === 'received'
          ? [styles.container, styles.checkedColor]
          : [styles.container]
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
            read && msgType === 'received'
              ? [styles.nickname, styles.checkedTextColor]
              : styles.nickname
          }>
          {msgType === 'received'
            ? message.sentMemberName
            : message.receivedMemberName}
        </Text>
        <Text
          style={
            read && msgType === 'received'
              ? [styles.content, styles.checkedTextColor]
              : styles.content
          }
          numberOfLines={1}
          ellipsizeMode="tail">
          {message.content}
        </Text>
        <Text
          style={
            read && msgType === 'received'
              ? [styles.date, styles.checkedTextColor]
              : styles.date
          }>
          { dateTime }
        </Text>
      </View>

      <View style={styles.checkmarkContainer}>
        <View style={styles.unreadContainer}>
          {msgType === 'received' && !read && (
            <View style={styles.unread}></View>
          )}
        </View>
        <View style={styles.checkmark}>
          {isDeleting &&
            (isChecked ? (
              <Icon name="checkbox-outline" size={23} color="white" />
            ) : (
              <Icon name="square-outline" size={23} color="white" />
            ))}
        </View>
      </View>
    </View>
  );
}
// '#2f2f2fbc', '#1e1e1e80'
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2f2f2fbc',
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
    backgroundColor: '#1e1e1e80',
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
    width: '75%',
    // borderColor: 'white',
    // borderWidth: 1,
    paddingHorizontal: 12,
  },
  nickname: {
    color: 'white',
    fontWeight: '700',
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
  unreadContainer: {
    height: 10,
    marginTop: 6,
    alignItems: 'flex-end',
  },
  unread: {
    width: 10,
    height: 10,
    backgroundColor: '#613EEA',
    borderRadius: 25,
  },
  checkmark: {
    paddingTop: 5,
    alignItems: 'flex-start',
    // borderColor: 'white',
    // borderWidth: 1,
  },
});
