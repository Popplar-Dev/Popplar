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

// 내 정보 조회
export async function getMyInfo(id: string) {
  const token = await getToken();
  return await axios({
    method: 'get',
    url: `${BASE_URL}/member/${id}`,
    headers: { 'Access-Token': token }
   }).then((res) => res)
}

// 내 정보 수정
export async function updateMyHotPlaceId(hotPlaceId, memberId) {
  const token = await getToken();
  return await axios({
    method: 'patch',
    url: `${BASE_URL}/member/${memberId}`,
    data: {
      myHotPlaceId: hotPlaceId
    },
    headers: { 'Access-Token': token }
   }).then((res) => res)
}

// 스탬프 여부 확인
export async function getStamp(hotPlaceId) {
  const token = await getToken();
  return await axios({
    method: 'get',
    url: `${BASE_URL}/member/achievement/hot-place/${hotPlaceId}`,
    headers: { 'Access-Token': token }
   }).then((res) => res)
}