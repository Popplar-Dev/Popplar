import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback,Image } from 'react-native';

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
					<View style={styles.modalContent}>
						<Pressable
							onPress={onClose}
							style={styles.closeButton}
						>
							<Text style={styles.closeButtonText}>X</Text>
						</Pressable>
						<View style={styles.modalInfo}>
							<Text style={styles.modalText}>{planetName} 방문 현황</Text>
							<Image
								source={planetImage}
								style={styles.planetImage}
							/>
							<Text style={styles.modalText}>설레는 마음으로 여행을 떠난 당신!
              </Text>
              <Text style={styles.modalText}>{visit} 곳의 {planetName}에 첫 발을 디뎠습니다</Text>
						</View>
					</View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'rgba(161, 161, 161, 0.8)',
    padding: 20,
    borderRadius: 20,
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
		color:'black'
  },
  planetImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
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
});

export default PlanetModal;
