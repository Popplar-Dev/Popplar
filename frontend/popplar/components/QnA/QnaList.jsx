import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, FlatList, SafeAreaView,Image } from 'react-native'; // SafeAreaView를 import합니다.
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import QnaCreateModal from '../Modals/QnaCreateModal';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userInfoState } from '../../recoil/userState';
import { useRecoilState } from 'recoil';

export default function QnaList({ route }) {
  const isFocused = useIsFocused();
  const {spaceId, spacename} = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [qnaData, setQnaData] = useState('');
  const [userinfo, setUserInfo] = useRecoilState(userInfoState);
  const [showMyQna, setShowMyQna] = useState(false);

  const handleToggleMyQna = () => {
    setShowMyQna(!showMyQna);
  };

  const filteredQnaData = showMyQna
    ? qnaData.filter(item => item.questionResDto.memberId === userinfo.id)
    : qnaData;

  const handleItemPress = (qna) => {
    navigation.navigate('QnaDetail', { qnaId: qna.id, userid: qna.memberId, username: qna.memberName, profileimage: qna.memberProfileImage});
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const handleCreateQuestion = (newQuestion) => {
    
    const requestData = {
      hotPlaceId: spaceId,
      memberId: userinfo.id, 
      content: newQuestion, 
    };
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.post(`https://k9a705.p.ssafy.io:8000/member/qna/question`, requestData,
          {headers: {'Access-Token': userAccessToken}}
        )
          .then((response) => {
            setModalVisible(false);
            axios.get(`https://k9a705.p.ssafy.io:8000/member/qna/hotplace/${spaceId}`, 
              {headers: {'Access-Token': userAccessToken}}
            )
            .then((response) => {
              setQnaData(response.data.reverse())
            })
            .catch((err) => {
              console.log("에러 메시지 :", err)
            });
          })
          .catch((err) => {
            console.log("에러 메시지 :", err);
          });
      }
    }
    isLogin()
  };


  useEffect(() => {
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.get(`https://k9a705.p.ssafy.io:8000/member/qna/hotplace/${spaceId}`, 
          {headers: {'Access-Token': userAccessToken}}
        )
          .then((response) => {
            setQnaData(response.data.reverse())
          })
          .catch((err) => {
            console.log("에러 메시지 :", err)
          });
        }
      }
    isLogin()
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.hotplace}>{spacename}</Text>
        <Pressable style={styles.createqna} onPress={() => openModal()}>
          <Text style={styles.text}>질문하기</Text>
        </Pressable>
        <View style={styles.buttonbox}>
          <Pressable style={styles.filter} onPress={handleToggleMyQna}>
            <Text style={styles.text}>내 Q&A</Text>
            <View style={[styles.checkbox, showMyQna && styles.checked]}>
              {showMyQna && <Icon name="checkmark-outline" size={15} color="#fff" />}
            </View>
          </Pressable>
        </View>
      {qnaData.length===0 ? (
        <View style={styles.nodata}>
          <Text style={styles.text}>아직 질문이 없습니다</Text>
        </View>
      ) : (
        <FlatList
          style={styles.qnacontainer}
          data={filteredQnaData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
          <Pressable style={styles.qnabox} key={index} onPress={() => handleItemPress(item.questionResDto)}>
            <View style={styles.questionbox}>
              <View style={styles.questionboxtop}>
                <View style={styles.questionboxprofile}>
                  <Image
                    source={{uri:item.questionResDto.memberProfileImage}}
                    style={styles.profileImage}
                  />
                  <Text style={styles.text}>{item.questionResDto.memberName}</Text>
                </View>
                <Text style={styles.text}>{item.questionResDto.createdAt.slice(0,10)}</Text>
              </View>
              <View style={styles.questionboxbottom}>
                <Text style={styles.text}>Q. {item.questionResDto.content}</Text>
              </View>
            </View>
            <View style={styles.answerbox}>
              <Icon
                style={styles.answericon}
                name='chatbox-outline'
                size={18}
                color='#ffffff'
              />
              <Text style={styles.text}>{item.answerResDtoList.length}</Text>
            </View>
          </Pressable>
        )}
      />

      )}
      
      <QnaCreateModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateQuestion}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  hotplace: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    // marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  qnacontainer: {
    width: '90%',
    marginTop: 10,
    marginBottom: 90,
  },
  buttonbox: {
    flexDirection:'row',
    width:'85%',
    justifyContent:'flex-end'
  },
  qnabox: {
    borderRadius: 20,
    borderStyle: 'solid',
    padding: 20,
    backgroundColor: 'rgba(139, 144, 247, 0.3)',
    marginVertical: 10,
  },
  questionbox: {},
  questionboxtop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  questionboxbottom: {},
  questionboxprofile: {
    flexDirection:'row',
    alignItems:'center',
  },
  answerbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  answericon: {
    paddingHorizontal: 4,
    paddingTop: 3,
  },
  createqna: {
    marginTop: 10,
    backgroundColor: '#8B90F7',
    paddingBottom: 8,
    paddingTop: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems:'center'
  },
  filter: {
    flexDirection:'row',
    alignItems:'center'
  },
  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#8B90F7',
    marginLeft: 5,
    marginTop:3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    // backgroundColor: 'white',
  },
  nodata: {
    flex:1,
    justifyContent:'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 75,
    marginRight:5
  }
});
