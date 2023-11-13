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

type blockedUser = {
  id: number; 
  name: string; 
  socialType: string; 
  profileImage: string;
  exp: number;
  jwt: null;
  myHotPlaceId: number; 
}

export const userBlockListState = atom<blockedUser[]>({
  key: 'userBlockListState', 
  default: []
})
