import { View, Text, StyleSheet } from 'react-native'; 

type messageProp = {
  read?: boolean; 
}

export default function Message({read=false}: messageProp) {

  return (
    <View style={read ? [styles.container] : [styles.container, styles.messageReadContainer]}>
      <Text style={styles.text}>글씨</Text>


    </View>
  )
}
// '#2f2f2fbc', '#1e1e1e80'
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e80',
    width: '100%',
    height: 100,
    // borderColor: 'white', 
    // borderWidth: 1, 

  }, 
  messageReadContainer: {
    backgroundColor: '#2f2f2fbc',

  },
  text: {
    color: 'white'
  }
})