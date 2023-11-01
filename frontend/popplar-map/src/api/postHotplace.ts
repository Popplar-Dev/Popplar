import axios from 'axios';
import { Place } from '../types/place'

const BASE_URL = 'http://k9a705.p.ssafy.io:8200'

// 핫플레이스 등록
export async function postHotplace(data: Place) {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/hot-place`,
    data: { data }
    // headers: addAccessTokenToHeaders(),
   }).then((res) => res)
}

// 핫플레이스 좋아요
export async function likeHotplace(id: string) {
  return await axios({
    method: 'post',
    url: `${BASE_URL}/hot-place/${id}/like`,
    // headers: addAccessTokenToHeaders(),
   }).then((res) => res)
}

// 핫플레이스 좋아요 취소
export async function delLikeHotplace(id: string) {
  return await axios({
    method: 'delete',
    url: `${BASE_URL}/hot-place/${id}/like`,
    // headers: addAccessTokenToHeaders(),
   }).then((res) => res)
}