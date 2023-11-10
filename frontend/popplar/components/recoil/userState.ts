import {atom, selector} from 'recoil';

export const userInfoState = atom({
  key: 'userInfoState',
  default: {name: '', exp: 0, id: 0, socialType: '', profileImage: ''},
});

export const userIdState = selector({
  key: 'userIdState',
  get: ({get}) => {
    const userInfo = get(userInfoState);

    return userInfo.id;
  },
});
