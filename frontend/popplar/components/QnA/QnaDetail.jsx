import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, FlatList, ActivityIndicator } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userInfoState } from '../recoil/userState';
import { useRecoilState } from 'recoil';

export default function QnaDetail({ route }) {
  const {qnaId, userid, username, profileimage} = route.params;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [questionDetail, setQuestionDetail] = useState('');
  const [answerDetail, setAnswerDetail] = useState('');
  const [selectcomplete, setSelectcomplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userinfo, setUserInfo] = useRecoilState(userInfoState);

  const handleSelectAnswer = (answerid) => {
      const isLogin = async () => {
        const AccessToken = await AsyncStorage.getItem('userAccessToken');
        if (AccessToken !== null) {
          const userAccessToken = JSON.parse(AccessToken);
          axios.patch(`https://k9a705.p.ssafy.io:8000/member/qna/adopt/${qnaId}/${answerid}`,{},
          { headers: { 'Access-Token': userAccessToken }}
          )
          .then((response) => {
            setSelectedAnswer(answerid);
            // setSelectcomplete(true)
            axios.get(`https://k9a705.p.ssafy.io:8000/member/qna/question/${qnaId}`,
              { headers: { 'Access-Token': userAccessToken}}
            )
            .then((response) => {
              setQuestionDetail(response.data.questionResDto);
            })
            .catch((err) => {
              console.log("에러 메시지 ::", err);
            });
          })
          .catch((err) => {
            console.log("에러 메시지 ::", err);
          });
        }
      }
      isLogin()
  };

  const handleSubmitAnswer = () => {
    const newAnswerText = newAnswer;
    const postUrl = `https://k9a705.p.ssafy.io:8000/member/qna/answer/${qnaId}`;

    const requestBody = {
      memberId: userinfo.id,
      content: newAnswerText, 
    };
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.post(postUrl, requestBody,
          { headers: { 'Access-Token': userAccessToken}}
        )
        .then((response) => {
          const newAnswerItem = {
            memberProfileImage: userinfo.profileImage,
            memberName: userinfo.name, 
            content: newAnswerText,
          };
          setAnswerDetail([...answerDetail, newAnswerItem]);
        })
        .catch((err) => {
          console.log("에러 메시지 ::", err);
        });
        setNewAnswer('');
      }}
    isLogin()  
  };

  useEffect(() => {
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.get(`https://k9a705.p.ssafy.io:8000/member/qna/question/${qnaId}`,
          { headers: { 'Access-Token': userAccessToken}}
        )
          .then((response) => {
            setQuestionDetail(response.data.questionResDto);
            setAnswerDetail(response.data.answerResDtoList);
            if (response.data.questionResDto.adoptedAnswerId === null) {
              setSelectcomplete(true)
            } 
            setLoading(false);
          })
          .catch((err) => {
            console.log("에러 메시지 ::", err);
            setLoading(false);
          });
      }}
    isLogin()
  }, []);


  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <View style={styles.qnacontainer}>
          <View style={styles.questionboxtop}>
            <View>
              {/* <Text style={styles.smalltext}>작성자</Text> */}
              <View style={styles.questionboxprofile}>
                <Image
                  source={{uri:profileimage}}
                  style={styles.profileImage}
                />
                <Text style={styles.text}>
                  {questionDetail.memberName}
                </Text>
              </View>
            </View>
            {/* <Text style={styles.text}>{questionDetail.createdAt.slice(0, 10)}</Text> */}
          </View>
          <View style={styles.questionboxbottom}>
            <Text style={styles.smalltext}>질문</Text>
            <Text style={styles.text}>{questionDetail.content}</Text>
          </View>
          <View style={styles.answerbox}>
            <Text style={styles.smalltext}>답변</Text>
            {answerDetail.length === 0 ? (
              <View style={styles.noanswer}>
                <Text style={styles.text}>아직 답변이 없습니다ㅜ</Text>
              </View>
            ) : (
              <FlatList
                data={answerDetail}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.qnabox} key={index}>
                    <View style={styles.answerdetail}>
                      <View style={styles.questionboxprofile}> 
                        <Image
                          source={{uri:item.memberProfileImage}}
                          style={styles.profileImage}
                        />
                        <Text style={styles.smalltext}>{item.memberName}</Text>
                      </View>
                      <Text style={styles.text}>{item.content}</Text>
                    </View>
                    { !selectcomplete ? (
                      <View
                        style={item.id === questionDetail.adoptedAnswerId ? styles.selectButton : styles.cantselectButton}
                      >
                        <Text style={styles.selectButtonText}>
                          {item.id === questionDetail.adoptedAnswerId ? '채택됨' : ''}
                        </Text>
                      </View>
                    ) : (
                      <Pressable
                        style={item.id === questionDetail.adoptedAnswerId ? styles.selectButton : styles.nonselectButton}
                        onPress={() => handleSelectAnswer(item.id)}
                      >
                        <Text style={styles.selectButtonText}>
                          {item.id === questionDetail.adoptedAnswerId ? '채택됨' : '채택하기'}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                )}
              />
            )}
          </View>
          <View style={styles.newAnswerBox}>
            <TextInput
              style={styles.newAnswerInput}
              placeholder="답변 작성..."
              value={newAnswer}
              onChangeText={(text) => setNewAnswer(text)}
            />
            <Pressable
              style={styles.submitButton}
              onPress={handleSubmitAnswer}
            >
              <Text style={styles.submitButtonText}>답변 제출</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  qnacontainer: {
    borderWidth:1,
    borderColor:'#8B90F7',
    padding: 20,
    width: '90%',
    height: '85%',
    borderRadius: 20,
    top:'3%',
    
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  smalltext: {
    fontSize: 12,
    color:'grey'
  },
  questionboxtop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:20
  },
  questionboxbottom: {
    marginTop: 10,
    marginBottom: 30
  },
  answerbox: {
    marginVertical: 10,
    flex: 1,
  },
  answerdetail: {
    width:'70%',
  },
  qnabox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    // borderLeftWidth:1,
    // paddingLeft:10,
    borderColor:'#8B90F7',
    alignItems:'center'
  },
  selectButton: {
    backgroundColor: '#8B90F7',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    
  },
  cantselectButton:{
    backgroundColor: 'transperant',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  nonselectButton:{
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  selectButtonText: {
    color: 'white',
  },
  newAnswerBox: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newAnswerInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    height: 40,
    color:'black'
  },
  submitButton: {
    backgroundColor: '#8B90F7',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButtonText: {
    color: 'white',
  },
  noanswer: {
    justifyContent:'center',
    alignItems:'center'
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
});
