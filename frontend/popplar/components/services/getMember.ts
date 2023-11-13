import axios from 'axios';
import { Place } from '../types/place'
import { getToken } from './getAccessToken'
import { BASE_URL } from './baseUrl'

// 회원 정보 조회
export async function getMembersInfo(id: number) {
  const token = await getToken();
  return await axios({
    method: 'get',
    url: `${BASE_URL}/member/${id}`,
    headers: { 'Access-Token': token }
   }).then((res) => res)
}