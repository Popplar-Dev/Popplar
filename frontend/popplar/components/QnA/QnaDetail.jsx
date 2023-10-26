import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Switch } from 'react-native';

export default function QnaDetail({ route }) {
  // route.params에서 전달된 질문 데이터를 받아옵니다.
  const { qnaData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{qnaData.username}</Text>
      <Text style={styles.text}>{qnaData.date}</Text>
      <Text style={styles.text}>Q. {qnaData.question}</Text>
      {qnaData.answers.map((ans, index) => (
      <View style={styles.qnabox} key={index}>
        <Text style={styles.text}>A{index+1}. {ans}</Text>
      </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
});
