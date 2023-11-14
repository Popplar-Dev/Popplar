import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Pressable, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabNavigatorParamList } from '../types/tabNavigatorParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BlurView } from "@react-native-community/blur";

import { getHotplaceUsers } from '../services/postLocation'

import { getMembersInfo } from '../services/getMember'
import { messageType } from '../types/message';
import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
  visible: boolean;
  onClose: () => void;
  memberId: number;
  placeName: string;
  goToMessageDraft: Function;
}

type user = {
  hotPlaceId: number
  id: string
  memberId: number
  x: number
  y: number
}

type member = {
  id: number
  name: string
  socialType: string
  profileImage: string
  exp: number
  jwt: string | null,
  myHotPlaceId: number
}

type markers = {
  id: number
  position: {
    left: number
    top: number
  }
}

export default function UserModal({ visible, onClose, memberId, placeName, goToMessageDraft }: Props) {
  // const [userCount, setUserCount] = useState<number>(0)
  const navigation = useNavigation();
  const [memberInfo, setMemberInfo] = useState<member>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMembersInfo(memberId)
    .then((res) => {
      //console.log('response', res.data)
      setMemberInfo(res.data)
    })
  }, [memberId]);
    
      // const markers = generateRandomMarkers(res.data.length)
      // console.log('markers', markers[0])
      // setMarkerPositions(markers)
  //   }
  //   )
  // }, [])

  // // 핫플레이스에 임의의 마커 표시
  // useEffect(() => {
  //   const markers = generateRandomMarkers(1)
  //   console.log('markers', markers[0] )
  //   setMarkerPositions(markers)
  // }, [userCount])

  const handleReply = () => {
    // goToMessageDraft(memberId, memberInfo.name); 
    // console.log(memberId, memberInfo)
    navigation.navigate("Draft", {memberId: memberId, memberName: memberInfo.name});
  }

return (
  <>
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
        <BlurView
        style={styles.blurContent} 
        blurType="dark" 
        >

        <View style={styles.modalContent}>

          <View style={styles.spaceContent}>
            <Text style={styles.spaceText}>현재</Text> 
            <Text style={styles.spaceBigText}>{placeName}</Text>
            <Text style={styles.spaceText}>에 있는 사용자</Text>
          </View>

          <View style={styles.memberContent}>
            <Image
            style={styles.image}
            source={{ uri: memberInfo.profileImage }}
            />

            <View style={styles.nameContent}>
              <Text style={styles.textname}>{memberInfo.name}</Text>
              <Text style={styles.textbig}>{memberInfo.socialType}</Text>
              <View style={styles.replyButtonContainerOuter}>
                <Pressable
                  onPress={handleReply}
                  style={styles.replyButtonContainerInner}
                  android_ripple={{color: '#464646'}}>
                  <Icon name="chatbubbles-outline" size={23} color="white" />
                </Pressable>
              </View>

            </View>
          </View>
        </View>

       </BlurView>  
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  </>
  );
};


const styles = StyleSheet.create({  
  spaceContent: {
    // backgroundColor: 'rgba(161, 161, 161, 0.20);',
    padding: 15,
    paddingBottom: 18,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  spaceBigText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#8B90F7',
    marginLeft: 2,
    marginRight: 2,
  },
  spaceText: {
    color: 'white',
  },
  memberContent: {
    height: 140,
    width: 295,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // borderWidth: 1, 
    // borderColor: 'red', 
  },
  image: {
    width: 120,
    height: 120,
  },  
  nameContent: {
    height: 120,
    marginLeft: 17,
    // borderWidth: 1, 
    // borderColor: 'red', 
  },
  textname: {
    color:'white',
		fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    marginTop: 12,
  },                
	modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContent: {
    width: '90%',
		height:'40%',
  },
  modalContent: {
    backgroundColor: 'rgba(161, 161, 161, 0.20);',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textbig: {
    color:'white',
		fontSize:18,
    marginBottom:20,
  },
  replyButtonContainerOuter: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    borderRadius: 20,
  },
  replyButtonContainerInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});