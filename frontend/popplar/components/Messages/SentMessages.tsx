import {View, Text, StyleSheet} from 'react-native';
import Message from './Message';

export default function SentMessages() {
  return (
    <View style={styles.container}>
      {/* <Message msgType="sent" />
      <Message msgType="sent" /> 
      <Message msgType="sent"/>
      <Message msgType="sent"/>
      <Message msgType="sent" />
      <Message msgType="sent" />   */}
    </View>
  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1, 
  }
})

