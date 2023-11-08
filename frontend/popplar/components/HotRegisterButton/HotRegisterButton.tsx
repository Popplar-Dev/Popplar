import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { postHotplace } from '../services/postHotplace'
import { getIdHotplace } from '../services/getHotplace'
import { SpaceInfo } from '../types/place'

type Props = {
  props: SpaceInfo
  setSpaceInfo: () => void
}

export default function HotRegisterButton({ props, setSpaceInfo }: Props) {

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
    console.log(data)
    postHotplace(data)
    .then((res) => {
      const data = res.data
      const space: SpaceInfo = {
        id: data.id,
        place_name: data.placeName,
        address_name: data.addressName,
        road_address_name: data.roadAddressName,
        category_group_name: data.categoty,
        likeCount: data.likeCount,
        phone: data.phone,
        placeType: data.placeType,
        visitorCount: data.visitorCount,
        y: data.y,
        x: data.x
      }
      setSpaceInfo(space)
    })
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