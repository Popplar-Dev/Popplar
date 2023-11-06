import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Modal, TouchableWithoutFeedback } from 'react-native'; // SafeAreaView를 import합니다.
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from "@react-native-community/blur";

interface GameListModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function GameListModal({ visible, onClose}:GameListModalProps) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

	function gospeedtouchgame() {
    navigation.navigate('SpeedTouch' as never)
  }

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
        // blurAmount={1} 
      >
        <View style={styles.modalContent}>
          <View style={styles.modalhead}>
            <Text style={styles.text}>Game List</Text>
          </View>
            <Pressable style={styles.gamelist} onPress={gospeedtouchgame}>
              <Text style={styles.text}>반응 속도 테스트 게임</Text>
            </Pressable>
            <Pressable style={styles.gamelist}>
              <Text style={styles.text}>??? 게임</Text>
            </Pressable>
            {/* <Pressable onPress={onClose}>
              <Text style={styles.modalText}>x</Text>
            </Pressable> */}
        </View>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
	text: {
		color:'white',
		fontSize:15,
    paddingBottom:3
	},
  modalhead: {
    marginBottom:10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContent: {
    width: '90%',
		// height:'50%',
  },
  modalContent: {
    backgroundColor: 'rgba(161, 161, 161, 0.2)',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  gamelist: {
    backgroundColor:'#8B90F7',
    // borderWidth:2,
    // borderColor:'#8B90F7',
    borderRadius:5,
    padding:10,
    margin:10
  }
});
