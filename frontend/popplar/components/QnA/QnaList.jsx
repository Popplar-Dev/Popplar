import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import QnaCreateModal from '../Modals/QnaCreateModal'

export default function QnaList() {

  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleItemPress = (qna) => {
    navigation.navigate('QnaDetail', { qnaData: qna });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const handleCreateQuestion = (newQuestion) => {
    setQnaData([...qnaData, newQuestion]);
    setModalVisible(false);
  };
  const [qnaData, setQnaData] = useState([
    {
      username: '오성락',
      date: '2023-10-26',
      question: '멀캠 주변 회식 장소 추천 좀요 제발~',
      answerCount: 3,
      answers: ['탄이요','용용선생','술 그만 드세요']
    },
    {
      username: '김민석',
      date: '2023-10-26',
      question: '사탈하는 방법 알려주세요',
      answerCount: 1,
      answers: ['그런건 없어요']
    },
    {
      username: '오성락',
      date: '2023-10-26',
      question: '멀캠 주변 회식 장소 추천 좀요 제발~',
      answerCount: 3,
      answers: ['탄이요','용용선생','술 그만 드세요']
    },
    {
      username: '오성락',
      date: '2023-10-26',
      question: '멀캠 주변 회식 장소 추천 좀요 제발~',
      answerCount: 3,
      answers: ['탄이요','용용선생','술 그만 드세요']
    },
  ]);

  return (
    <View style={styles.container}>
			<Text style={styles.hotplace}>MultiCampus</Text>
      <Pressable style={styles.createqna} onPress={() => openModal()}>
        <Text style={styles.text}>
          질문하기
        </Text>
      </Pressable>
			<View style={styles.qnacontainer}>
      {qnaData.map((qna, index) => (
        <Pressable style={styles.qnabox} key={index} onPress={() => handleItemPress(qna)}>
          <View style={styles.questionbox}>
            <View style={styles.questionboxtop}>
              <Text style={styles.text}>{qna.username}</Text>
              <Text style={styles.text}>{qna.date}</Text>
            </View>
            <View style={styles.questionboxbottom}>
              <Text style={styles.text}>Q. {qna.question}</Text>
            </View>
          </View>
          <View style={styles.answerbox}>
						<Icon
						style={styles.answericon}
						name='chatbox-outline'
						size={18}
						color='#ffffff'
						/>
            <Text style={styles.text}>{qna.answerCount}</Text>
          </View>
        </Pressable>
      ))}
			</View>
      <Text style={styles.text}>QnA 리스트??</Text>
      <QnaCreateModal 
        visible={isModalVisible} 
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateQuestion}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
	hotplace: {
		color:'white',
    fontSize:25,
		fontWeight:'bold',
		marginTop:20,
	},
  text: {
    color:'white',
    fontSize:15,
  },
	backgroundImage: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
	qnacontainer: {
		width:'90%',
		margin:10
	},
	qnabox: {
		borderRadius: 20,
		borderStyle: 'solid',
		padding:20,
		// borderWidth: 2,
		backgroundColor:'rgba(139, 144, 247, 0.3)',
		// width:'100%',
		marginVertical:10
	},
	questionbox: {

	},
	questionboxtop: {
		flexDirection:'row',
		justifyContent: 'space-between',
		marginBottom:10
	},
	questionboxbottom: {

	},
	answerbox: {
		// marginTop:10,
		flexDirection:'row',
		alignItems:'center',
		justifyContent: 'flex-end'
	},
	answericon: {
		paddingHorizontal:4,
    paddingTop:3
	},
  createqna: {
    marginTop:10,
    borderColor:'blue',
    borderStyle:'solid',
    backgroundColor:'#8B90F7',
    paddingBottom:8,
    paddingTop:3,
    paddingLeft:8,
    paddingRight:8,
    borderRadius:10
  }
});

