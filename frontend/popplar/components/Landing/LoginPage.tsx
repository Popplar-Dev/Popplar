import React, {useState} from "react";
import { View, StyleSheet, Button } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/userState';
import LocationPermission from './LocationPermission'

const REST_API_KEY = '0da056655f3ed1ec3ebd8325d19ac9f6';
const REDIRECT_URI = 'https://k9a705.p.ssafy.io:8000/member/login';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function Login() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  function KakaoLoginWebView (data: string) {
    const exp = "code=";
    var condition = data.indexOf(exp);    
    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      requestToken(authorize_code);
    };
  }

  const storeData = async (returnValue:any) => {
    try {
      await AsyncStorage.setItem('userAccessToken', JSON.stringify(returnValue));
    } catch (error) {
    }
  }
  const storeUserInfo = async (returnValue:any) => {
    try {
      setUserInfo(returnValue)
      await AsyncStorage.setItem('userInfo', JSON.stringify(returnValue));
    } catch (error) {
    }
  }

  const requestToken = async (authorize_code: string) => {
    var AccessToken = "none";
    axios ({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: authorize_code,
      },
    }).then((response) => {
      AccessToken = response.data.access_token;
      console.log(response.data);
      const requestData = {
        accessToken : AccessToken,
        loginType : "KAKAO"
      };
      axios.post(`https://k9a705.p.ssafy.io:8000/auth/login`, requestData)
        .then((response) => {
          console.log(response.data)
          const jwt = response.data.jwt
          const userInfo = {
            exp: response.data.exp,
            id: response.data.id,
            name: response.data.name,
            profileImage: response.data.profileImage,
            socialType: response.data.socialType,
          }
          storeUserInfo(userInfo)
          storeData(jwt);
          if (response.data.name === '새 유저') {
          navigation.navigate('FirstLanding' as never);
        } else {
          navigation.navigate('LocationPermission' as never);
        }
        })
        .catch((err) => {
          console.log("에러 메시지 :", err);
        });
        
      //requestUserInfo(AccessToken);
    }).catch(function (error) {
      console.log('error', error);
    })
  };


  return (
    <View style={Styles.container}> 
       {/* <Button title="kakaolohin" onPress={}></Button> */}
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => { KakaoLoginWebView(event.nativeEvent["url"]); }}
        // onShouldStartLoadWithRequest={handleOnShouldStartLoadWithRequest}
      />
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },    
});



