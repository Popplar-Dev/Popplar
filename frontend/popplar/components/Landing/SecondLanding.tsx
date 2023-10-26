import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SecondLanding() {
  const goToNextPage = () => {
    navigation.navigate('ThirdLanding' as never);
  };

	const navigation = useNavigation();

  return (
    <View style={styles.container}>
			<Image
        source={require('popplar/assets/landing/landing2.png')}
        style={styles.image}
				/>
			<Text style={styles.text}>실시간 소통 및 게임</Text>
			<Text style={styles.textinfo}>지루한 대기 시간을 간단한 게임과 채팅으로 즐겁게 바꿔보세요!</Text>
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

export default SecondLanding;
