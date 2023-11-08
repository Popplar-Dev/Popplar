import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback,Image, ScrollView  } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import { useState, useEffect } from 'react';
import axios from "axios";

interface ImageSelect {
  visible: boolean;
  onClose: () => void;
}

export default function ProfileImageSelectModal({ visible, onClose }:ImageSelect) {
	const profileimages = [
    { name: "boy1", uri: require("popplar/assets/avatars/04.png") },
    { name: "boy2", uri: require("popplar/assets/avatars/07.png") },
    { name: "boy3", uri: require("popplar/assets/avatars/20.png") },
    { name: "boy4", uri: require("popplar/assets/avatars/13.png") },
    { name: "boy5", uri: require("popplar/assets/avatars/21.png") },
    { name: "girl1", uri: require("popplar/assets/avatars/02.png") },
    { name: "girl2", uri: require("popplar/assets/avatars/03.png") },
    { name: "girl3", uri: require("popplar/assets/avatars/10.png") },
    { name: "girl4", uri: require("popplar/assets/avatars/12.png") },
  ];
	const [selectedImage, setSelectedImage] = useState(null);

	// const selectImage = (image) => {
  //   setSelectedImage(image);
  //   // closeModal();
  // };
  
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
									<Pressable key={index}>
										<Image source={image.uri} style={styles.modalImage} />
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

