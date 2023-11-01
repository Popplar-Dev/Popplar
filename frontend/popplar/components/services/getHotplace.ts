import axios from 'axios';
import { Place } from '../types/place'
import { getToken } from './getAccessToken'
import {BASE_URL} from './baseUrl'
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

// 전체 핫플레이스 조회
export async function getAllHotplace() {
  const token = await getToken();
  return await axios({
    method: 'get',
    url: `${BASE_URL}/hot-place`,
    headers: { "access-token" : token }
   }).then((res) => res)
}

// id로 핫플레이스 조회
export async function getIdHotplace(id: string) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/hot-place/${id}`,
    headers: { "access-token" : accessToken }
   }).then((res) => res)
}

// 특정 핫플레이스 모든 방문객 조회
export async function getHotplaceVisitors(id: string) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/visitor/${id}`,
    // headers: addAccessTokenToHeaders(),
   }).then((res) => res)
}