import {View, Text, StyleSheet} from 'react-native';

type ChatTimeProps = {
  children: string
}

export default function ChatTime({ children }: ChatTimeProps) {
  return (
    <View style={styles.chatTimeContainer}>
      <Text style={styles.chatTime}>{ children }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chatTimeContainer: {
    // borderColor: 'white',
    // borderWidth: 1,
    justifyContent: 'flex-end', 
    marginBottom: 8, 
  }, 
  chatTime: {
    fontSize: 12,
    color: '#7f7f7f' 
  }

});
