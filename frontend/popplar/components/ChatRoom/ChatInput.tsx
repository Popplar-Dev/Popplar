import { useState } from 'react';
import {View, Pressable, TextInput, Keyboard, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type ChatInputProps = {
  onSend: Function;
}

export default function ChatInput({onSend}: ChatInputProps) {

  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    onSend(inputText); 
    setInputText(""); 
    Keyboard.dismiss();
  }

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputBox}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          cursorColor="#8B90F7"
          placeholder="메시지 입력"
          placeholderTextColor="#8B90F7"
          multiline={true}
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
        />
      </View>
      <View style={styles.sendButtonContainerOuter}>
        <Pressable
          onPress={handleSend}
          style={styles.sendButtonContainerInner}
          android_ripple={{color: '#464646'}}>
          <Icon name="send" size={25} color="#8B90F7" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 60,
    backgroundColor: '#1b114129',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    flex: 7,
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: '#0c072c42',
  },
  input: {
    color: '#8B90F7',
    fontSize: 16,
  },
  sendButtonContainerOuter: {
    flex: 1,
    overflow: 'hidden',
  },
  sendButtonContainerInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
