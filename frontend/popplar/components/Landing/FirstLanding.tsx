import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function FirstLanding() {
  const goToNextPage = () => {
    navigation.navigate('SecondLanding' as never);
  };

	const navigation = useNavigation();

  return (
    <View style={styles.container}>
			<Image
        source={require('popplar/assets/landing/landing1.png')}
        style={styles.image}
      />
			<Text style={styles.text}>POPPLAR 란?</Text>
			<Text style={styles.textinfo}>본인의 위치를 기반으로 학교, 회사, 놀이공원 등 플레이스를 방문한 사용자들끼리 서로 소통하고 정보를 공유해보세요!</Text>
      <Button title="다음 랜딩 페이지로" onPress={goToNextPage} />
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
		top:'-8%'
  },
	image: {
		// height:'100%'
	},
	text: {
		color:'white',
		fontWeight:'bold',
		fontSize:30,
		margin:20
	},
	textinfo: {
		color:'white',
		fontWeight:'bold',
		fontSize:15,
		marginBottom:20,
		marginHorizontal:50
	}

});

export default FirstLanding;
