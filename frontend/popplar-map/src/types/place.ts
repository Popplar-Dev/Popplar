export type Place = {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string | null
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
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
  tier: number
  myLike: boolean
}

