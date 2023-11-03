import {View, Text, StyleSheet} from 'react-native';
import Message from './Message';

export default function ReceivedMessages() {
  return (
    <View style={styles.container}>
      <Message />
      <Message read={true} /> 
      <Message />
      <Message />
      <Message read={true} />
      <Message read={true} />  
      <Text>Received Messages</Text>
    </View>
  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1, 
  }
})
