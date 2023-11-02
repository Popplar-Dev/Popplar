import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, FlatList, SafeAreaView } from 'react-native'; // SafeAreaView를 import합니다.
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import QnaCreateModal from '../Modals/QnaCreateModal';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userInfoState } from '../recoil/userState';
import { useRecoilState } from 'recoil';

export default function QnaList() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [qnaData, setQnaData] = useState('');
  const [userinfo, setUserInfo] = useRecoilState(userInfoState);

  const handleItemPress = (qna) => {
    navigation.navigate('QnaDetail', { qnaId: qna, userid: userinfo.id, username: userinfo.name });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const handleCreateQuestion = (newQuestion) => {
    
    const requestData = {
      hotPlaceId: 21414107,
      memberId: userinfo.id, 
      content: newQuestion, 
    };
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.post(`https://k9a705.p.ssafy.io:8000/member/qna/question`, requestData,
          {
            headers: {
              'Access-Token': userAccessToken,
            },
          }
        )
          .then((response) => {
            setModalVisible(false);
            axios.get(`https://k9a705.p.ssafy.io:8000/member/qna/hotplace/21414107`, 
              {
                headers: {
                  'Access-Token': userAccessToken,
                },
              }
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
        axios.get(`https://k9a705.p.ssafy.io:8000/member/qna/hotplace/21414107`, 
          {
            headers: {
              'Access-Token': userAccessToken,
            },
          }
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.hotplace}>MultiCampus</Text>
      <Pressable style={styles.createqna} onPress={() => openModal()}>
        <Text style={styles.text}>질문하기</Text>
      </Pressable>
      <FlatList
        style={styles.qnacontainer}
        data={qnaData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable style={styles.qnabox} key={index} onPress={() => handleItemPress(item.questionResDto.id)}>
            <View style={styles.questionbox}>
              <View style={styles.questionboxtop}>
                <Text style={styles.text}>{item.questionResDto.memberName}</Text>
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
    margin: 10,
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
    borderColor: 'blue',
    borderStyle: 'solid',
    backgroundColor: '#8B90F7',
    paddingBottom: 8,
    paddingTop: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems:'flex-end'
  },
});
