import { atom } from "recoil";
import { LatLng } from "../../types/LatLng";

export const HotLatLngState= atom<LatLng>({
  key: 'HotLatLngState',
  default: {
    x: "",
    y: "",
    flagged: false
  },
});
