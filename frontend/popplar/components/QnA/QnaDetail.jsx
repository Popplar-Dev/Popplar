import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, TextInput, FlatList, ActivityIndicator } from 'react-native';
import axios from "axios";

export default function QnaDetail({ route }) {
  const qnaId = route.params;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [questionDetail, setQuestionDetail] = useState('');
  const [answerDetail, setAnswerDetail] = useState('');
  const [loading, setLoading] = useState(true);

  const handleSelectAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    const newAnswerText = newAnswer;
    const postUrl = `http://10.0.2.2:8080/qna/2/${qnaId.qnaId}`;

    const requestBody = {
      memberId: 356931964684,
      content: newAnswerText, 
    };

    axios.post(postUrl, requestBody)
      .then((response) => {
        const newAnswerItem = {
          memberName: "본인 닉네임", 
          content: newAnswerText,
        };
        setAnswerDetail([...answerDetail, newAnswerItem]);
      })
      .catch((err) => {
        console.log("에러 메시지 ::", err);
      });

    setNewAnswer('');
  };

  useEffect(() => {
    axios.get(`http://10.0.2.2:8080/qna/2/${qnaId.qnaId}`)
      .then((response) => {
        setQuestionDetail(response.data.questionResDto);
        setAnswerDetail(response.data.answerResDtoList);
        setLoading(false);
      })
      .catch((err) => {
        console.log("에러 메시지 ::", err);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <View style={styles.qnacontainer}>
          <View style={styles.questionboxtop}>
            <View>
              <Text style={styles.smalltext}>작성자</Text>
              <Text style={styles.text}>
                {questionDetail.memberName}
              </Text>
            </View>
            <Text style={styles.text}>{questionDetail.createdAt.slice(0, 10)}</Text>
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
                      <Text style={styles.smalltext}>{item.memberName}</Text>
                      <Text style={styles.text}>{item.content}</Text>
                    </View>
                    <Pressable
                      style={selectedAnswer === index ? styles.selectButton : styles.nonselectButton}
                      onPress={() => handleSelectAnswer(index)}
                    >
                      <Text style={styles.selectButtonText}>
                        {selectedAnswer === index ? '채택됨' : '채택하기'}
                      </Text>
                    </Pressable>
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
    height: 40
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
  }
});
