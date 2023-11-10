import axios from 'axios';
import { Place, Position } from '../types/place'
import { BASE_URL } from './baseUrl'
import { getToken } from './getAccessToken'

// 핫플레이스 입장 시, 내 위치 입력
export async function postMyHotLocation(data: Position) {
  const token = await getToken();
  return await axios({
    method: 'post',
    url: `${BASE_URL}/hot-place/position`,
    data,
    headers: { 'Access-Token': token }
   }).then((res) => res)
}

// 핫플레이스 id로 사용자 위치 조회
export async function getHoplaceUsers(id: string) {
  const token = await getToken();
  return await axios({
    method: 'post',
    url: `${BASE_URL}/hot-place/${id}/position`,
    headers: { 'Access-Token': token }
   }).then((res) => res)
}