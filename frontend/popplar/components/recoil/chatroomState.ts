import { atom } from 'recoil';

export const chatroomState = atom<number|null>({
  key: 'chatroomState',
  default: null,
});