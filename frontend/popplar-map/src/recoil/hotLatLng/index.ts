import { atom } from "recoil";
import { HotPlace } from "../../types/LatLng";

export const HotLatLngState= atom<HotPlace>({
  key: 'HotLatLngState',
  default: {
    x: "",
    y: "",
    id: 0,
    flagged: false
  },
});
