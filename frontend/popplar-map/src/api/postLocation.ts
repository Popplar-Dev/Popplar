import axios from 'axios';
import { Place, Position } from '../types/place'
import { BASE_URL } from './baseUrl'
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

// 핫플레이스 입장 시, 내 위치 입력
export async function postMyHotLocation(data: Position) {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/hot-place/position`,
    data,
    headers: { 'Access-Token': accessToken }
   }).then((res) => res)
}

// 핫플레이스 id로 사용자 위치 조회
export async function getHotplaceUsers(id: number) {
  return await axios({
    method: 'get',
    url: `${BASE_URL}/hot-place/${id}/position`,
    headers: { 'Access-Token': accessToken }
   }).then((res) => res)
}