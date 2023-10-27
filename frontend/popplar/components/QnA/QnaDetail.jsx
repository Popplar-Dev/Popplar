import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Switch } from 'react-native';

export default function QnaDetail({ route }) {
  const { qnaData } = route.params;

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
            <Text style={styles.text}>A{index+1}. {ans}</Text>
          </View>
          ))}
        </View>
      </View>
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
  qnacontainer: {
    backgroundColor:'rgba(139, 144, 247, 0.3)',
    padding:20,
    width:'90%',
    height:'80%',
    borderRadius:20
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  questionboxtop: {
		flexDirection:'row',
		justifyContent: 'space-between',
		// marginBottom:10,
    marginVertical:10
	},
  questionboxbottom: {
    marginVertical:10
  },
  answerbox: {
    marginVertical:10
  }
});
