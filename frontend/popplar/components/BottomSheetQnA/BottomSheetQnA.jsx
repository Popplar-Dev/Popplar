import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QnaList from '../QnA/QnaList'

// type BottomSheetQnAProps = {
//   spaceId: string;
// };

export default function BottomSheetQnA(props) {
  const space = props
  const Id = props.spaceId;
  const spacename = props.spacename;
  const navigation = useNavigation();
  console.log(props)
  function goQna(space) {
    // console.log( space.spaceId, space.spacename)
    navigation.navigate('QnaList' , {spaceId: space.spaceId, spacename: space.spacename} )
  }


  return (
    <SafeAreaView style={styles.Container}>
      <Pressable onPress={() => goQna(space)}>
        <Text style={styles.text}>{Id}</Text>
        <Text style={styles.text}>{spacename}</Text>
        <Text style={styles.text}>
          더보기
        </Text>
      </Pressable>      
        <ScrollView>        
            {/* <QnaList/>     */}
        </ScrollView>      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex:1
  },
  text: {
    color:'white'
  }
})