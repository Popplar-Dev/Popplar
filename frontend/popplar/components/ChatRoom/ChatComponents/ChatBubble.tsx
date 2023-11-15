import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type chatBubbleProps = {
  // #613EEA, #2b204a, #2c1a74
  color?: string;
  msgStart?: boolean;
  myMsg?: boolean;
  children?: string | React.ReactNode;
};

export default function ChatBubble({
  color = "#613EEA",
  msgStart = false,
  myMsg = false,
  children = '',
}: chatBubbleProps) {
  return (
    <View
      style={
        msgStart
          ? myMsg
            ? [styles.bubbleContainer, styles.myStartMsg, {backgroundColor: color}]
            : [styles.bubbleContainer, styles.othersStartMsg, {backgroundColor: color}]
          : [styles.bubbleContainer, {backgroundColor: color}]
      }>
      <Text style={styles.bubbleText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    maxWidth: 200,
    minHeight: 30,
    marginStart: 10,
    marginEnd: 4,
    marginTop: 3,
    marginBottom: 7,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderColor: 'black',
    borderEndWidth: 1,
    borderBottomWidth: 1,
  },
  bubbleText: {
    color: 'white',
    fontSize: 14,

  },
  myStartMsg: {
    borderTopRightRadius: 0,
  },
  othersStartMsg: {
    borderTopLeftRadius: 0,
  },
});
