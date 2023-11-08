import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState}from 'react';


const BASE_URL = 'https://k9a705.p.ssafy.io:8000'
const [token, setToken] = useState()

useEffect(() => {
	// console.log(userinfo)
	const isLogin = async () => {
		const AccessToken = await AsyncStorage.getItem('userAccessToken');
			if (AccessToken !== null) {
				const userAccessToken = JSON.parse(AccessToken);
				setToken(userAccessToken)
			}
		}
	isLogin()
})



