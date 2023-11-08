import {View, Text, StyleSheet} from 'react-native';

type chatDateProps = {
  children: string;
};

export default function ChatDate({children}: chatDateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    // borderWidth: 1,
    // borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    color: 'white',
    fontSize: 12,
  },
});
