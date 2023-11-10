import { View, Text, StyleSheet, Image, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QnaList from '../QnA/QnaList'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
// type BottomSheetQnAProps = {
//   spaceId: string;
// };

export default function BottomSheetQnA(props) {
  const space = props
  const Id = props.spaceId;
  const spacename = props.spacename;
  const navigation = useNavigation();
  const [qnaData, setQnaData] = useState(null);

  function goQna(space) {
    navigation.navigate('QnaList' , {spaceId: space.spaceId, spacename: space.spacename} )
  }

  useEffect(() => {
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.get(`https://k9a705.p.ssafy.io:8000/member/qna/hotplace/${Id}`, 
          {headers: {'Access-Token': userAccessToken}}
        )
          .then((response) => {
            setQnaData(response.data[0])
          })
          .catch((err) => {
            console.log("에러 메시지 :", err)
          });
        }
      }
    isLogin()
  }, []);


  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Containertop}>
        <Text style={styles.text}><Text style={styles.colortext}>{spacename}</Text> 에 등록된 질문</Text>
      </View>
        {qnaData ? (
          <View style={styles.qnacontainer}>
            {qnaData.length===0 ? (
            <ActivityIndicator size="large" color="#ffffff" />
            ) : (
            <View style={styles.qnaboxcontainer}>
              <Pressable style={styles.qnabox} onPress={() => goQna(space)}>
                <View style={styles.questionbox}>
                  <View style={styles.questionboxtop}>
                    <View style={styles.questionboxprofile}>
                      <Image
                        source={{uri:qnaData.questionResDto.memberProfileImage}}
                        style={styles.profileImage}
                      />
                      <Text style={styles.text}>{qnaData.questionResDto.memberName}</Text>
                    </View>
                    <Text style={styles.text}>{qnaData.questionResDto.createdAt.slice(0,10)}</Text>
                  </View>
                  <View style={styles.questionboxbottom}>
                    <Text style={styles.text}>Q. {qnaData.questionResDto.content}</Text>
                  </View>
                </View>
                <View style={styles.answerbox}>
                  <Icon
                    style={styles.answericon}
                    name='chatbox-outline'
                    size={18}
                    color='#ffffff'
                  />
                  <Text style={styles.text}>{qnaData.answerResDtoList.length}</Text>
                </View>
              </Pressable>
              <Pressable style={styles.more} onPress={() => goQna(space)}>
                <Text style={styles.text}>
                  더보기
                </Text>
              </Pressable>  
            </View>     
            )}  
          </View>
        ) : (
          <View style={styles.noqnacontainer}>
            <View style={styles.noqna}>
              <Text style={styles.text}> 아직 질문이 없습니다</Text>
            </View>
            <Pressable style={styles.more} onPress={() => goQna(space)}>
              <Text style={styles.text}>
                질문하러 가기
              </Text>
            </Pressable>
          </View>
        )}
          
          
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  Containertop: {
    marginTop:10
  },
  text: {
    color:'white',
    fontWeight:'bold'
  },
  colortext: {
    color:'#8B90F7',
    fontWeight:'bold',
    fontSize:20
  },
  more: {
    marginBottom:10
  },
  qnaboxcontainer: {
    alignItems:'center'
  },
  qnabox: {
    borderRadius: 20,
    borderStyle: 'solid',
    padding: 20,
    backgroundColor: 'rgba(139, 144, 247, 0.6)',
    marginVertical: 5,
    width: '100%'
  },
  questionbox: {},
  questionboxtop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  questionboxbottom: {},
  answerbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  answericon: {
    paddingHorizontal: 4,
    paddingTop: 3,
  },
  qnacontainer: {
    width: '90%',
    marginTop: 10,
    // alignItems:'center'
  },
  noqnacontainer: {
    alignItems:'center'
  },
  noqna: {
    margin:20
  },
  questionboxprofile: {
    flexDirection:'row',
    alignItems:'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 75,
    marginRight:5
  }
})