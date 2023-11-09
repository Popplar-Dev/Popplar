import axios from 'axios';
import { Place } from '../types/place'
import { getToken } from './getAccessToken'
import { BASE_URL } from './baseUrl'

// 전체 핫플레이스 조회
export async function getAllHotplace() {
  const token = await getToken();
  return await axios({
    method: 'get',
    url: `${BASE_URL}/hot-place`,
    headers: { 'Access-Token': token }
   }).then((res) => res)
}

// id로 핫플레이스 조회
export async function getIdHotplace(id: string) {
  const token = await getToken();
  return await axios({
    method: 'get',
    url: `${BASE_URL}/hot-place/${id}`,
    headers: { 'Access-Token': token }
   }).then((res) => res)
  //  .catch((err) => console.log(err))
}

// 특정 핫플레이스 모든 방문객 조회
export async function getHotplaceVisitors(id: string) {
  const token = await getToken();
  return await axios({
    method: 'get',
    url: `${BASE_URL}/visitor/${id}`,
    headers: { 'Access-Token': token }
   }).then((res) => res)
}