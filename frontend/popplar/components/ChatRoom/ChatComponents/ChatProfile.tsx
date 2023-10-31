import {View, Image, StyleSheet} from 'react-native';

type ChatProfileProps = {
  imgUrl: string
}

export default function ChatProfile({imgUrl}: ChatProfileProps) {
  return (
    <View style={sytles.container}>
      <View style={sytles.profilePicContainer}>
        <Image
          source={{
            uri: imgUrl,
          }}
          style={sytles.profilePic}
          alt="profilepic"
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const sytles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    // borderWidth: 1,
    // borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  profilePicContainer: {
    width: 40,
    height: 40,
    borderRadius: 15,
    // borderWidth: 1,
    // borderColor: 'white',
    overflow: 'hidden',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
});
