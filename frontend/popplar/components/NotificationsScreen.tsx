import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ReceivedMessages from './Messages/ReceivedMessages';
import SentMessages from './Messages/SentMessages';

const NotificationsScreen = () => {
  const Tab = createMaterialTopTabNavigator(); 

  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="받은 쪽지함" component={ReceivedMessages} />
        <Tab.Screen name="보낸 쪽지함" component={SentMessages} />


      </Tab.Navigator>

    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
