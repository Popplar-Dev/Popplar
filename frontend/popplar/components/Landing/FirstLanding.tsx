import React from 'react';
import { View, Text, StyleSheet, Image, Button, Pressable  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';

function FirstLanding() {
  const goToNextPage = () => {
    navigation.navigate('BottomTab' as never);
  };

	const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Swiper 
				style={styles.wrapper} 
				showsButtons={false}
				showsPagination={true}
				dotStyle={styles.dot} activeDotStyle={styles.activeDot}
				>
        <View style={styles.slide}>
          <Image
            source={require('popplar/assets/landing/landing1.png')}
            style={styles.image}
          />
					<View style={styles.textcontainer}>
						<Text style={styles.text}>POPPLAR란?</Text>
						<Text style={styles.textinfo}>본인의 위치를 기반으로 학교, 회사, 놀이공원 등 플레이스를 방문한 사용자들끼리 서로 소통하고 정보를 공유해보세요!</Text>
					</View>
        </View>
        
        <View style={styles.slide}>
					<Image
						source={require('popplar/assets/landing/landing2.png')}
						style={styles.image}
					/>
					<View style={styles.textcontainer}>
						<Text style={styles.text}>실시간 소통 및 게임</Text>
						<Text style={styles.textinfo}>지루한 대기 시간을 간단한 게임과 채팅으로 즐겁게 바꿔보세요!</Text>
					</View>
        </View>
        
        <View style={styles.slide}>
					<Image
						source={require('popplar/assets/landing/landing3.png')}
						style={styles.image}
					/>
					<View style={styles.textcontainer}>
						<Text style={styles.text}>다양한 부가 기능</Text>
						<Text style={styles.textinfo}>최대한 많은 스페이스에 방문해보고 업적을 쌓아보세요! 어쩌면 스페이스의 정복자가 될 수도...</Text>
					</View>
					<Pressable onPress={goToNextPage}>
            <View style={styles.button}>
							<View style={styles.buttoncontent}>
								<Icon style={styles.icons} name='rocket' size={25} color='#ffffff'
								/>
								<Text style={styles.buttontext}>POPPLAR 시작하기</Text>
							</View>
            </View>
          </Pressable>
				</View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  wrapper: {},
  slide: {
    flex: 1,
    alignItems: 'center',
		top:'10%'
  },
  image: {
    // 이미지 스타일
  },
	textcontainer: {
		marginTop:'10%',
		alignItems:'center'
	},
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 20,
  },
  textinfo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 20,
    marginHorizontal: '12%',
  },
  pagination: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'grey',
  },
  activeDot: {
    backgroundColor: '#8B90F7',
		width: 10,
    height: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 20,
  },
	button: {
		backgroundColor:'#8B90F7',
		borderRadius:10,
		width:250,
		alignItems:'center',
		marginTop:50,
	},
	buttoncontent: {
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		padding:10,
		paddingHorizontal:30
	},
	buttontext: {
		alignItems:'center',
		justifyContent:'center',
		color:'white',
		fontWeight:'bold',
		fontSize:18
	},
	icons: {
		marginRight:10
	}
});

export default FirstLanding;
