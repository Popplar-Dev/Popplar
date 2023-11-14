import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback,Image, Button, FlatList, ActivityIndicator } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/userState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

interface PlanetModalProps {
  visible: boolean;
  onClose: () => void;
  planetName: string;
  visit: any
  planetImage: any; 
}

function PlanetModal({ visible, onClose, planetName, planetImage, visit }:PlanetModalProps) {
  const userinfo = useRecoilValue(userInfoState);
  const [stamp, setStamp] = useState<Array<{ categoryName: string, hotPlaceId: number, visitedCount: number, hotPlaceName:string }>>([]);
  const [specificstamp, setSpecificstamp] = useState<Array<{ categoryName: string, hotPlaceId: number, visitedCount: number, hotPlaceName:string }>>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(1);

  const renderItem = ({ item, index }: { item: { hotPlaceName: string, visitedCount: number }, index: number }) => {
    if (index === visibleItems - 1) {
      return (
        <View style={styles.stampinfolist}>
          <View style={styles.stampinfodetailtext}>
            <Text style={styles.modalTextsmall}>{item.hotPlaceName}</Text>
            <Text style={styles.modalTextsmall}>방문 횟수: {item.visitedCount}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  const nextItem = () => {
    setVisibleItems((prevVisibleItems) => (prevVisibleItems < specificstamp.length ? prevVisibleItems + 1 : 1));
  };
  const backItem = () => {
    setVisibleItems((prevVisibleItems) => (prevVisibleItems > 1 ? prevVisibleItems - 1 : specificstamp.length))
  };

  useEffect(() => {
    const isLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('userAccessToken');
      if (AccessToken !== null) {
        const userAccessToken = JSON.parse(AccessToken);
        axios.get(`https://k9a705.p.ssafy.io:8000/member/achievement/${userinfo.id}`,
        {headers: {'Access-Token': userAccessToken}}
        )
          .then((response) => {
            setStamp(response.data.stampResDtoList);
            const filteredStamp = response.data.stampResDtoList.filter(item => item.categoryName === planetName);
            setSpecificstamp(filteredStamp)
            setLoading(false); 
          })
          .catch((err) => {
            console.log("에러 메시지 ::", err);
            setLoading(false); 
          });
        }
      }
    isLogin()  
    return () => {
      setVisibleItems(1);
    };
  }, [planetName]);
  
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
              {/* <View style={styles.stampinfo}> */}
                {!loading ? (
                  <>
                  <View style={styles.stampinfo}>
                    <Pressable style={styles.nextButtonContainer}>
                      <Text onPress={backItem}><Icon name="chevron-back-outline" color="#8B90F7" size={25} /></Text>
                    </Pressable>
                    <FlatList
                      // horizontal
                      data={stamp.filter(item => item.categoryName === planetName)}
                      renderItem={({ item, index }) => renderItem({ item, index })}
                      keyExtractor={(item, index) => index.toString()}
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                    />
                    <Pressable style={styles.nextButtonContainer}>
                      <Text onPress={nextItem}><Icon name="chevron-forward-outline" color="#8B90F7" size={25} /></Text>
                    </Pressable>
                  </View>
                  <View>
                    <Text style={styles.Textsmall}><Text style={styles.focusText}>{visibleItems}</Text>/{specificstamp.length}</Text>
                  </View>
                  </>
                ) : (
                  <ActivityIndicator size="large" color="#ffffff" />
                )}
              </View>
            {/* </View> */}
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
    color: 'black',
    fontWeight:'bold'
  },
  Textsmall: {
    fontSize: 15,
    color:'white',
    fontWeight:'bold'
  },
  stampinfobox: {
  },
  stampinfo: {
    alignItems:'center',
    flexDirection:'row',
    marginTop:20,
    padding:5,
    justifyContent:'center',
    marginVertical:10
  },
  stampinfolist: {
    // marginLeft:10,
  },
  stampinfodetailtext: {
    marginVertical:3,
    borderRadius:10,
    paddingBottom:10,
    paddingTop:4,
    paddingHorizontal:10,
    backgroundColor:'#8B90F7',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:5
  },
  nextButtonContainer: {

  }
});

export default PlanetModal;
