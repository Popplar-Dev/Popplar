import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { postHotplace } from '../../services/postHotplace'
import { getIdHotplace } from '../../services/getHotplace'
import { SpaceInfo } from '../../types/place'

import { likeHotplace } from '../../services/postHotplace'

type Props = {
  props: SpaceInfo
  setSpaceInfo: (space: SpaceInfo) => void
  setSpaceLike: (status: boolean) => void
  setSpaceLikeCount: (count: number) => void
  webRef: any
}

export default function HotRegisterButton({ props, setSpaceInfo, setSpaceLike, setSpaceLikeCount, webRef }: Props) {

  const handlePostHotplace = () => {
    const data = {
      "addressName": props.address_name,
      "id": props.id,
      "phone": props.phone,
      "placeName": props.place_name,
      "roadAddressName": props.road_address_name,
      "x": props.x,
      "y": props.y,
      "category": props.category_group_name
    }
    postHotplace(data)
    .then((res) => likeHotplace(props.id).then(() => {
      const data = res.data
      const { id, placeName, addressName, roadAddressName, category, likeCount, phone, placeType, visitorCount, x, y, tier, myLike } = data
      const space: SpaceInfo = {
        id,
        place_name: placeName,
        address_name: addressName,
        road_address_name: roadAddressName,
        category_group_name: category,
        likeCount,
        phone,
        placeType,
        visitorCount,
        y,
        x,
        tier,
        myLike,
      }
      setSpaceInfo(space)
      setSpaceLike(true)
      setSpaceLikeCount(1)
      const locationData: { type: string, data: { } } = {type: 'postHotplace', data: data}

      webRef.current.injectJavaScript(`
      window.postMessage(${JSON.stringify(locationData)}, '*')
      `);
      })
    )
  }

  return (
    <TouchableOpacity onPress={handlePostHotplace}>
      <View style={styles.button}>
      <Icon name="burn" size={19} color={'white'} style={styles.Icon}/>
        <Text style={styles.text}>핫플 등록</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',

    borderRadius: 20,
    borderStyle: 'solid',
    backgroundColor: '#8B90F733',
    marginRight: 23,
  },
  Icon: {
    marginRight: 7,
  },
  text: {
    color: 'white'
  }
})