import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button, Pressable, Image, Alert, ActivityIndicator  } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/userState';
import Icon from 'react-native-vector-icons/Ionicons';

interface stampbuttonProps {
  spaceId:number
  type: 'true' | 'false';
  onStampUpdate: (newStamp: string) => void;
}

export default function StampButton({spaceId, type, onStampUpdate }:stampbuttonProps) {
	const [userinfo, setUserInfo] = useRecoilState(userInfoState);
	const [stamp, setStamp] = useState<Array<{ category: string, hotPlaceId: number, visitedCount: number }>>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.get(`https://k9a705.p.ssafy.io:8000/member/achievement/${userinfo.id}`,
          {headers: {'Access-Token': userAccessToken}}
        )
        .then((response) => {
          setStamp(response.data.stampResDtoList);
          setLoading(false); 
        })
        .catch((err) => {
          console.log("에러 메시지 ::", err);
          setLoading(false); 
        })
      }
    }
    isLogin()
  }, []);

	function addStamp(spaceId:number) {
			const updatedInfo = {
				"hotPlaceId" : spaceId
			};
			const isLogin = async () => {
        const AccessToken = await AsyncStorage.getItem('userAccessToken');
        if (AccessToken !== null) {
					const userAccessToken = JSON.parse(AccessToken);
					axios.post(`https://k9a705.p.ssafy.io:8000/member/achievement/${userinfo.id}`, updatedInfo, 
						{headers: {'Access-Token': userAccessToken}}
					)
					.then((response) => {
            onStampUpdate('true');
            Alert.alert(
              `오늘의 스탬프를 찍었습니다!`
            )
          })
					.catch((err) => {
						// console.error("실패...", err);
            Alert.alert(
              '오늘의 스탬프를 이미 찍었습니다. 내일 다시 시도해주세요!'
            )
					}); 
				}
			}
			isLogin()
	}

    return(
			<>
      {type === 'false' && (
        <>
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <>
              <Pressable style={styles.stampbuttonactivate} onPress={() => addStamp(spaceId)}>
                <View style={styles.stampbuttoncontainer}>
                  <Icon name="footsteps" size={11} color={'white'} style={styles.footstepsIcon}/>
                  <Text style={styles.stamptext}>방문 스탬프 찍기</Text>
                </View>
              </Pressable>
            </>
          )}
        </>
      )}
      {type === 'true' && (
        <>
          <View style={styles.stampbutton}>
            <Text style={styles.stamptext}>오늘의 스탬프를 이미 찍으셨습니다!</Text>
          </View>
        </>
      )}
			</>
      
    )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
		justifyContent:'center',
		alignItems:'center'
  }, 
	stampcontainer: {
    alignItems:'center',
    marginTop:10,
    marginBottom:20,
  },
  stampbutton: {
    width:250,
    alignItems:'center',
		backgroundColor:'grey',
		borderRadius:10,
		paddingTop:3,
		paddingBottom:5
  },
  stampbuttonactivate: {
    width:250,
    alignItems:'center',
		backgroundColor:'#F5789E',
		borderRadius:10,
		paddingTop:3,
		paddingBottom:5,
  },
  stampbuttoncontainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  stamptext: {
    color:"white"
  },
  footstepsIcon: {
    marginRight:10,
    fontSize:20
  }
});