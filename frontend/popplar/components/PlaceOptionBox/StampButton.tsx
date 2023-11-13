import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button, Pressable, Image, Alert, ActivityIndicator  } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/userState';
import Icon from 'react-native-vector-icons/Ionicons';

interface stampbuttonProps {
  spaceId: number
}

export default function StampButton({spaceId}:stampbuttonProps) {
	const [userinfo, setUserInfo] = useRecoilState(userInfoState);
	const [stamp, setStamp] = useState<Array<{ category: string, hotPlaceId: number, visitedCount: number }>>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        console.log(userAccessToken)
        axios.get(`https://k9a705.p.ssafy.io:8000/member/achievement/${userinfo.id}`,
          {headers: {'Access-Token': userAccessToken}}
        )
        .then((response) => {
          setStamp(response.data.stampResDtoList);
          setLoading(false); 
					// console.log('111:',response.data)
          // console.log('1:',stamp)
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
					console.log(updatedInfo)
          console.log(userAccessToken)
          console.log(userinfo.id)
					axios.post(`https://k9a705.p.ssafy.io:8000/member/achievement/${userinfo.id}`, updatedInfo, 
						{headers: {'Access-Token': userAccessToken}}
					)
					.then((response) => {
						// console.log(response.data)
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
			{loading ? (
				<ActivityIndicator size="large" color="#ffffff" />
			) : (
				<>
					<Pressable style={styles.stampbutton} onPress={() => addStamp(spaceId)}>
						<Text style={styles.stamptext}>방문 스탬프 찍기</Text>
					</Pressable>
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
    width:200,
    alignItems:'center',
		backgroundColor:'grey',
		borderRadius:10,
		paddingTop:3,
		paddingBottom:5
  },
  stamptext: {
    color:"white"
  }

});