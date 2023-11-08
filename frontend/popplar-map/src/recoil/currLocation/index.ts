import { atom } from "recoil";

export type Location = {
  Lat: string,
  Lng: string
}

export const CurrLocation= atom<Location>({
  key: "CurrLocation",
  default: {Lat: "37.50134", Lng: "127.0397"},
});