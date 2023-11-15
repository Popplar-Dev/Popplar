import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { ReceivedMessageStackParamList } from '../types/NavigatorParams';
import Icon from 'react-native-vector-icons/Ionicons';
import {getToken} from '../services/getAccessToken';
import axios from 'axios';

export default function MessageDraft() {
  const route = useRoute<RouteProp<ReceivedMessageStackParamList, "Draft">>(); 
  const navigation = useNavigation<NavigationProp<ReceivedMessageStackParamList, 'Draft'>>(); 
  const {memberId, memberName} = route.params;
  const [inputText, setInputText] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleChangeInput = (value: string) => {
    if (value.length > 300) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    setInputText(value);
  };

  const handleReply = async () => {
    const userAccessToken = await getToken();
    if (!userAccessToken) return;
    if (inputText.trim() === '') return;
    try {
      const url = `https://k9a705.p.ssafy.io:8000/member/message/${memberId}`;

      const data = {content: inputText};

      const res = await axios.post(url, data, {
        headers: {'Access-Token': userAccessToken},
      });

      Alert.alert('쪽지가 전송되었습니다.', '');

      navigation.navigate('MessageHome');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <View style={styles.header}>
            <Text style={styles.headerText}>To: {memberName}</Text>
            <View style={styles.replyButtonContainerOuter}>
              <Pressable
                onPress={handleReply}
                style={styles.replyButtonContainerInner}
                android_ripple={{color: '#464646'}}>
                <Icon name="paper-plane-outline" size={23} color="white" />
              </Pressable>
            </View>
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            cursorColor="#8B90F7"
            placeholder="상대에게 보낼 메시지를 입력하세요"
            placeholderTextColor="#8B90F7"
            multiline={true}
            numberOfLines={5}
            value={inputText}
            onChangeText={handleChangeInput}
            style={styles.input}
          />
          <View style={styles.warningContainer}>
            {showWarning && (
              <Text style={styles.warningText}>
                쪽지는 300자 이내로 작성해주세요
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'white',
    alignItems: 'center',
  },
  messageBox: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(139, 144, 247, 0.3)',
    marginVertical: 10,
    marginTop: 30,
    width: '85%',
    height: 200,
    justifyContent: 'center',
  },
  header: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginHorizontal: 5,
  },
  headerText: {
    color: '#bcc0fa',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#0c072c42',
    color: '#8B90F7',
    fontSize: 16,
    justifyContent: 'flex-start',
    borderRadius: 15,
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
  warningContainer: {
    height: 20,
  },
  warningText: {
    fontSize: 12,
    color: '#8B90F7',
    marginHorizontal: 5,
  },
});
