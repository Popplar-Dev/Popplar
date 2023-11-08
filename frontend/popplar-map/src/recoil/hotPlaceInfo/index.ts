import { atom } from "recoil";
import { Place } from "../../types/place";

export const HotPlaceInfo= atom<Place>({
  key: 'HotPlaceInfo',
  default: {
    address_name: "",
    category_group_code: "",
    category_group_name: "",
    category_name: "",
    distance: "",
    id: "",
    phone: "",
    place_name: "",
    place_url: "",
    road_address_name: "",
    x: "",
    y: "",
  },
});