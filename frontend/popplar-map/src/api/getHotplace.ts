import axios from 'axios';
import { Place } from '../types/place'

const BASE_URL = 'http://k9a705.p.ssafy.io:8200'

// 전체 핫플레이스 조회
export async function getAllHotplace() {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/review-note/hot-place`,
    // headers: addAccessTokenToHeaders(),
   }).then((res) => res)
}

// id로 핫플레이스 조회
export async function getIdHotplace(id: string) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/hot-place/${id}`,
    // headers: addAccessTokenToHeaders(),
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