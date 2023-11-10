import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback,Image, ScrollView  } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/userState';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PlanetModalProps {
  visible: boolean;
  onClose: () => void;
  planetName: string;
  visit: string
  planetImage: any; 
}

function PlanetModal({ visible, onClose, planetName, planetImage, visit }:PlanetModalProps) {
  const userinfo = useRecoilValue(userInfoState);
  const [stamp, setStamp] = useState<Array<{ categoryName: string, hotPlaceId: number, visitedCount: number, hotPlaceName:string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.get(`https://k9a705.p.ssafy.io:8000/member/achievement/${userinfo.id}`,
        {headers: {'Access-Token': userAccessToken}}
        )
          .then((response) => {
            console.log(response.data)
            setStamp(response.data.stampResDtoList);
            setLoading(false); 
          })
          .catch((err) => {
            console.log("에러 메시지 ::", err);
            setLoading(false); 
          });
        }
      }
    isLogin()  
  }, []);
  
  return (
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
            // blurAmount={10} 
          >
            <View style={styles.modalContent}>
              <Pressable
                onPress={onClose}
                style={styles.closeButton}
              >
              </Pressable>
              <View style={styles.modalInfo}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>HotPlace 방문 현황</Text>
                </View>
                <Image
                  source={planetImage}
                  style={styles.planetImage}
                />
                <Text style={styles.modalText}>설레는 마음으로 여행을 떠난 당신!
                </Text>
                <Text style={styles.modalText}>{visit} 곳의 <Text style={styles.focusText}>{planetName}</Text>에 첫 발을 디뎠습니다</Text>
              </View>
                <View style={styles.stampinfo}>
                  <ScrollView horizontal={true}>
                      {stamp.map((item, index) => (
                        <View style={styles.stampinfolist} key={index}>
                          {item.categoryName === planetName ? (
                            <View style={styles.stampinfodetail}>
                              <View style={styles.stampinfodetailtext}>
                                <Text style={styles.modalTextsmall}>{item.hotPlaceName}</Text>
                              </View>
                              <View style={styles.stampinfodetailtext}>
                                <Text style={styles.modalTextsmall}>방문 횟수: {item.visitedCount}</Text>
                              </View>
                            </View>
                          ) : null}
                        </View>
                      ))}
                  </ScrollView>
                </View>
            </View>
          </BlurView>
				</View>
			</TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  blurContent: {
    width: '100%',
		height:'50%',
  },
  modalContent: {
    backgroundColor: 'rgba(161, 161, 161, 0.3)',
    padding: 20,
    borderRadius: 30,
    width: '100%',
		height:'50%',
    alignItems:'center'
  },
	modalInfo: {
		alignItems:'center',
	},
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
		color:'white'
  },
  planetImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'black',
    paddingLeft: 5,
    paddingRight: 5,
		position:'absolute',
    alignSelf: 'flex-end',
		top:10,
		right:10
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  focusText: {
    color:'#8B90F7'
  },
  title:{
    marginBottom:20,
  },
  titleText: {
    fontSize:22,
    color:'white',
    fontWeight:'bold'
  },
  modalTextsmall: {
    fontSize: 15,
    color: 'white'
  },
  stampinfo: {
    alignItems:'center',
    flexDirection:'row',
    // borderWidth:2,
    marginTop:10,
    // width:'90%',

  },
  stampinfolist: {
    marginLeft:10,
  },
  stampinfodetail:{
    // borderWidth:2,
    borderRadius:10,
    paddingBottom:10,
    paddingTop:4,
    paddingHorizontal:10,
    backgroundColor:'#8B90F7'
  },
  stampinfodetailtext: {
    marginVertical:3
  }
});

export default PlanetModal;
