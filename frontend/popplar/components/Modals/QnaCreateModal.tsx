import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput,TouchableWithoutFeedback } from 'react-native';

interface QnaCreateModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (newQuestion: string) => void;
}

export default function QnaCreateModal({ visible, onClose, onSubmit }: QnaCreateModalProps) {
  const [newQuestion, setNewQuestion] = React.useState('');

  const handleCreateQuestion = () => {
    onSubmit(newQuestion);
    setNewQuestion('');
    onClose();
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
				<View style={styles.modalContent}>
          <View style={styles.modalContentheader}>
            <Text style={styles.modalText}>다양한 질문을 해보세요!</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.modalText}>x</Text>
            </Pressable>
          </View>
					<TextInput
						style={styles.input}
						placeholder="ex) 거기 지금 웨이팅 많나요?"
						value={newQuestion}
						onChangeText={setNewQuestion}
					/>
					<Pressable style={styles.submitButton} onPress={handleCreateQuestion}>
						<Text style={styles.submitButtonText}>질문 등록</Text>
					</Pressable>
				</View>
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
		 backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  modalContent: {
    backgroundColor: 'rgba(191, 191, 191, 1)',
    // backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '90%',
  },
  modalContentheader: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
		color:'black'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    height:100
  },
  submitButton: {
    backgroundColor: '#8B90F7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
  },
});
