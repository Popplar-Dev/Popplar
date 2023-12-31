import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';

function AlarmSetting() {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = (value: boolean) => setIsEnabled(value);

  return (
    <View style={styles.container}>
				<View>
          <Text style={styles.text}>알림 {isEnabled ? '끄기' : '켜기'}</Text>
          <Switch
            trackColor={{false: '#767577', true: '#8B90F7'}}
            thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color:'white',
    fontSize:15
  },
	backgroundImage: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
});

export default AlarmSetting;
