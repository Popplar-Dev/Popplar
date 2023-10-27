import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, TextInput } from 'react-native';

export default function QnaDetail({ route }) {
  const { qnaData } = route.params;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');

  const handleSelectAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    const newAnswerText = newAnswer;

    qnaData.answers.push(newAnswerText);
    setNewAnswer('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.qnacontainer}>
        <View style={styles.questionboxtop}>
          <Text style={styles.text}>{qnaData.username}</Text>
          <Text style={styles.text}>{qnaData.date}</Text>
        </View>
        <View style={styles.questionboxbottom}>
          <Text style={styles.text}>Q. {qnaData.question}</Text>
        </View>
        <View style={styles.answerbox}>
          {qnaData.answers.map((ans, index) => (
            <View style={styles.qnabox} key={index}>
              <Text style={styles.text}>A{index + 1}. {ans}</Text>
              <Pressable
                style={selectedAnswer === index ? styles.selectButton : styles.nonselectButton}
                onPress={() => handleSelectAnswer(index)}
              >
                <Text style={styles.selectButtonText}>
                  {selectedAnswer === index ? '채택됨' : '채택하기'}
                </Text>
              </Pressable>
            </View>
          ))}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  qnacontainer: {
    backgroundColor: 'rgba(139, 144, 247, 0.3)',
    padding: 20,
    width: '90%',
    height: '85%',
    borderRadius: 20,
    top:'3%'
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  questionboxtop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  questionboxbottom: {
    marginTop: 10,
    marginBottom:20
  },
  answerbox: {
    marginVertical: 10,
  },
  qnabox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical:5
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
});
