// import { Modal, View, Text, StyleSheet,Image, Button,Pressable,SafeAreaView } from 'react-native';

// interface ImagePickerModalProps {
//   isVisible: boolean;
//   onClose: () => void;
//   onImageLibraryPress: () => void;
//   onCameraPress: () => void
// }


// export function ImagePickerModal({ isVisible, onClose, onImageLibraryPress, onCameraPress} :ImagePickerModalProps) {


//     return (
//       <Modal
//         isVisible={isVisible}
//         onBackButtonPress={onClose}
//         onBackdropPress={onClose}
//         style={styles.modal}>
//         <SafeAreaView style={styles.buttons}>
//           <Pressable style={styles.button} onPress={onImageLibraryPress}>
//             <Image style={styles.buttonIcon} source={images.image} />
//             <Text style={styles.buttonText}>Library</Text>
//           </Pressable>
//           <Pressable style={styles.button} onPress={onCameraPress}>
//             <Image style={styles.buttonIcon} source={images.camera} />
//             <Text style={styles.buttonText}>Camera</Text>
//           </Pressable>
//         </SafeAreaView>
//       </Modal>
//     );
//   }

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   blurContent: {
//     width: '100%',
// 		height:'50%',
//   },
//   modal: {

//   },
//   buttons: {

//   },
//   button: {

//   },
//   buttonIcon: {

//   },
//   buttonText: {

//   }
  
// });