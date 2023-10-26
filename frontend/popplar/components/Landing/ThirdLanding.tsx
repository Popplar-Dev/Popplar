import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ThirdLanding() {
  const goToNextPage = () => {
    navigation.navigate('BottomTab' as never);
  };

	const navigation = useNavigation();

  return (
    <View style={styles.container}>
			<Image
        source={require('popplar/assets/landing/landing3.png')}
        style={styles.image}
      />
			<Text style={styles.text}>다양한 부가 기능</Text>
			<Text style={styles.textinfo}>최대한 많은 스페이스에 방문해보고 업적을 쌓아보세요! 어쩌면 스페이스의 정복자가 될 수도...</Text>
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

export default ThirdLanding;
