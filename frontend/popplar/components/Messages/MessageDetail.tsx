import {useEffect} from 'react';
import {Text, View, Image, Pressable, StyleSheet} from 'react-native';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ReceivedMessageStackParamList } from '../types/NavigatorParams';
import axios from 'axios';
import { getToken } from '../services/getAccessToken';
import Icon from 'react-native-vector-icons/Ionicons';


type DetailScreenRouteProp = NativeStackScreenProps<
ReceivedMessageStackParamList,
  'Detail'
>;

export default function MessageDetail({
  navigation,
  route,
}: DetailScreenRouteProp) {
  const {message, tab} = route.params;
  // console.log(route);
  const imgUrl =
    'https://i.pinimg.com/736x/4c/7b/63/4c7b63eac0e1645c5c3b9e3bcf706074.jpg';

  useEffect(() => {
    async function getMessageDetail() {
      const userAccessToken = await getToken();
      if (!userAccessToken) return;
      try {
        //const url = `https://k9a705.p.ssafy.io:8000/member/message/${message.sentMemberId}/${message.messageId}`
        const url = `https://k9a705.p.ssafy.io:8000/member/message/${message.messageId}`;
        await axios.get(url, {
          headers: {'Access-Token': userAccessToken},
        });
      } catch (e) {
        console.error(e);
      }
    }
    getMessageDetail();
  }, []);

  const handleReply = () => {
    navigation.navigate('Draft', {
      memberId: message.sentMemberId,
      memberName: message.sentMemberName,
    });
    return;
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <View style={styles.header}>
          <View style={styles.userProfileContainer}>
            <View style={styles.profilePicContainer}>
              <Image
                source={{
                  uri: tab === 'received' ? message.sentMemberProfileImage:message.sentMemberProfileImage,
                }}
                style={styles.profilePic}
                alt="profilepic"
                resizeMode="cover"
              />
            </View>
            <Text style={styles.username}>
              {tab === 'received'
                ? message.sentMemberName
                : message.receivedMemberName}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            {tab === 'received' && (
              <View style={styles.replyButtonContainerOuter}>
                <Pressable
                  onPress={handleReply}
                  style={styles.replyButtonContainerInner}
                  android_ripple={{color: '#464646'}}>
                  <Icon name="chatbubbles-outline" size={23} color="white" />
                </Pressable>
              </View>
            )}
          </View>
        </View>
        <View style={styles.messageContentContainer}>
          <Text style={styles.content}>{message.content}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 12,
    // borderColor: 'white',
    // borderWidth: 1,
    paddingHorizontal: 12,
  },
  messageContainer: {
    borderRadius: 20,
    borderStyle: 'solid',
    padding: 20,
    backgroundColor: 'rgba(139, 144, 247, 0.3)',
    marginVertical: 10,
    marginTop: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: '95%',
    minHeight: 160,
  },
  profilePicContainer: {
    width: 40,
    height: 40,
    borderRadius: 24,
    // borderWidth: 1,
    // borderColor: 'white',
    overflow: 'hidden',
    marginEnd: 12,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginBottom: 12,
    // borderWidth: 1,
    // borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  replyButtonContainerOuter: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    borderRadius: 20,
  },
  replyButtonContainerInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  messageContentContainer: {
    paddingTop: 5,
  },
  content: {
    color: 'white',
  },
});
