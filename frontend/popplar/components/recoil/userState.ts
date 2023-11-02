import { atom } from 'recoil';

export const userInfoState = atom({
  key: 'userInfoState',
  default: { name: '', exp: 0, id: 0, socialType: '', profileImage: '' },
});