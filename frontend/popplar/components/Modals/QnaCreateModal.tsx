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
					<Text style={styles.modalText}>질문 작성하기</Text>
					<TextInput
						style={styles.input}
						placeholder="질문을 입력하세요"
						value={newQuestion}
						onChangeText={setNewQuestion}
					/>
					<Pressable style={styles.submitButton} onPress={handleCreateQuestion}>
						<Text style={styles.submitButtonText}>등록</Text>
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
		 backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'rgba(161, 161, 161, 1)',
    padding: 20,
    borderRadius: 20,
    width: '90%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
		color:'white'
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
