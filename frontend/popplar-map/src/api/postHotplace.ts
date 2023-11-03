import axios from 'axios';
import { Place } from '../types/place'
import {BASE_URL} from './baseUrl'
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

// 핫플레이스 등록
export async function postHotplace(data: Place) {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/hot-place`,
    data: { data },
    headers: { "access-token" : accessToken }
   }).then((res) => res)
}

// 핫플레이스 좋아요
export async function likeHotplace(id: string) {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/hot-place/${id}/like`,
    headers: { "access-token" : accessToken }
   }).then((res) => res)
}

// 핫플레이스 좋아요 취소
export async function delLikeHotplace(id: string) {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/hot-place/${id}/like`,
    headers: { "access-token" : accessToken }
   }).then((res) => res)
}