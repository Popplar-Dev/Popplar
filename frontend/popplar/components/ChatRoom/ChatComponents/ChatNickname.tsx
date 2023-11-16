import {View, Text, StyleSheet} from 'react-native';

type ChatNicknameProps = {
  children: string;
};

export default function ChatNickname({children}: ChatNicknameProps) {
  return (
    <View style={styles.nicknameContainer}>
      <Text style={styles.nickname}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nicknameContainer: {
    // borderColor: 'yellow',
    // borderWidth: 1,
    height: 20,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  nickname: {
    color: 'white',
    fontSize: 12,
  },
});
