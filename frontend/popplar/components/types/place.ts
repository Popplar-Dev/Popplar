export type Place = {
  addressName: string,
  id: string,
  phone: string,
  placeName: string,
  roadAddressName: string,
  x: string,
  y: string,
  category: string
}

export type hotPlaceResDto = {
  id: string,
  placeName: string,
  addressName: string,
  roadAddressName: string,
  phone: string,
  x: string,
  y: string,
  category: string,
  placeType: string,
  likeCount: number,
  visitorCount: number,
  _links: any
}

export type SpaceInfo = {
  id: string
  place_name: string
  address_name: string
  road_address_name: string
  category_group_name: string
  likeCount: number
  phone: string
  placeType: string
  visitorCount: number
  y: string
  x: string
  // place_url: string
}
