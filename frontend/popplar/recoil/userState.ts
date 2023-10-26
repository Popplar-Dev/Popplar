import { atom } from 'recoil';

export const nicknameState = atom<string>({
  key: 'nicknameState',
  default: '',
});
