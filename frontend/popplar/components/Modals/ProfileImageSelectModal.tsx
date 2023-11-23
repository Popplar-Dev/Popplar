import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback,Image, ScrollView  } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { useState, useEffect } from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userInfoState } from '../../recoil/userState';
import { useRecoilState } from 'recoil';


interface ImageSelect {
  visible: boolean;
  onClose: () => void;
}

export default function ProfileImageSelectModal({ visible, onClose }:ImageSelect) {
  const S3_URL = "https://popplar-profile-image-bucket.s3.ap-northeast-2.amazonaws.com/"
	const profileimages = [
    { avatar: S3_URL+'avatar1.png' },
    { avatar: S3_URL+'avatar2.png' },
    { avatar: S3_URL+'avatar3.png' },
    { avatar: S3_URL+'avatar4.png' },
    { avatar: S3_URL+'avatar5.png' },
    { avatar: S3_URL+'avatar6.png' },
    { avatar: S3_URL+'avatar7.png' },
    { avatar: S3_URL+'avatar8.png' },
    { avatar: S3_URL+'avatar9.png' },
    
  ];
	const [selectedImage, setSelectedImage] = useState(null);
  const [userinfo, setUserInfo] = useRecoilState(userInfoState);

	// const selectImage = (image) => {
  //   setSelectedImage(image);
  //   // closeModal();
  // };

  const saveProfileimage = (avatar:string) => {
			const updatedimage = {
				profileImage: avatar,
			};
			const isLogin = async () => {
        const AccessToken = await AsyncStorage.getItem('userAccessToken');
        if (AccessToken !== null) {
					const userAccessToken = JSON.parse(AccessToken);
					axios.patch(`https://k9a705.p.ssafy.io:8000/member/${userinfo.id}`, updatedimage, 
						{headers: {'Access-Token': userAccessToken}}
					)
					.then((response) => {
						setUserInfo({ ...userinfo, profileImage: avatar});
            onClose()
          })
					.catch((err) => {
						console.error("실패...", err);
					}); 
				}
			}
			isLogin()
		};

  
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
              <Text style={styles.text}>아바타 선택</Text>
							<View style={styles.imagecontainer}>
								{profileimages.map((image, index) => (
									<Pressable key={index} onPress={() => saveProfileimage(image.avatar)}>
										<Image source={{uri: image.avatar}} style={styles.modalImage} />
									</Pressable>
								))}
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
    justifyContent: 'center',
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
	text: {
		color:'white'
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
  focusText: {
    color:'#8B90F7'
  },
  modalTextsmall: {
    fontSize: 15,
    color: 'white'
	},
	// modalContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'center',
  // },
  modalImage: {
    width: 100,
    height: 100,
    margin: 10,
  },
  closeButton: {
    color: 'blue',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
	imagecontainer: {
		flexDirection:'row',
    alignItems:'center',
    // marginTop:10,
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    // paddingHorizontal: 10,
	}
});

