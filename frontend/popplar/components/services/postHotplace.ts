import axios from 'axios';
import { Place } from '../types/place'
import {BASE_URL} from './baseUrl'
import { getToken } from './getAccessToken'

// 핫플레이스 등록
export async function postHotplace(data: Place) {
  const token = await getToken();
  return await axios({
    method: 'post',
    url: `${BASE_URL}/hot-place`,
    data: { data },
    headers: { 'Access-Token': token }
   }).then((res) => res)
}

// 핫플레이스 좋아요
export async function likeHotplace(id: string) {
  const token = await getToken();
  return await axios({
    method: 'post',
    url: `${BASE_URL}/hot-place/${id}/like`,
    headers: { 'Access-Token': token }
   }).then((res) => res)
}

// 핫플레이스 좋아요 취소
export async function delLikeHotplace(id: string) {
  const token = await getToken();
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/hot-place/${id}/like`,
    headers: { 'Access-Token': token }
   }).then((res) => res)
}