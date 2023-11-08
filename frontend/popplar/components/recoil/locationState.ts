import { atom } from 'recoil';

export const locationState = atom({
  key: 'locationState',
  default: {granted: "", y: "", x: ""},
});