import { View, Text, StyleSheet } from 'react-native'; 

export default function NoChatroom() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>아직 내가 참여한 채팅방이 없습니다! </Text>
      <Text style={styles.subText}>지도에서 Hotplace를 선택하여 채팅에 참여해보세요~</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    paddingHorizontal: 10, 
    paddingVeritcal: 20, 
  }, 
  mainText: {
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 18, 
  }, 
  subText: {
    color: 'white', 
    fontSize: 14
  }
})