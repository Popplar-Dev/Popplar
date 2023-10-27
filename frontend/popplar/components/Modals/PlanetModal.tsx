import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback,Image } from 'react-native';
import { BlurView } from "@react-native-community/blur";

interface PlanetModalProps {
  visible: boolean;
  onClose: () => void;
  planetName: string;
  visit: string
  planetImage: any; 
}

function PlanetModal({ visible, onClose, planetName, planetImage, visit }:PlanetModalProps) {
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
    // backgroundColor: 'rgba(255, 255, 255, 0.)',
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
  }
});

export default PlanetModal;
