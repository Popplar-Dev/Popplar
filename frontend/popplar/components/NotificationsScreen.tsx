import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ReceivedMessages from './Messages/ReceivedMessages';
import SentMessages from './Messages/SentMessages';
import MessageDetail from './Messages/MessageDetail';
import {messageType} from '../types/message';
import MessageDraft from './Messages/MessageDraft';

type RootStackParamList = {
  MessageHome: undefined;
  Detail: {message: messageType, tab: 'received'|'sent'};
  Draft: {memberId: number, memberName: string}; 
};

type SentMessagesStackParamList = {
  MessageHome: undefined;
  Detail: {message: messageType, tab: 'received'|'sent'}; 

}

const ReceivedMessagesStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="MessageHome"
      screenOptions={{
        headerTintColor: '#8B90F7',
        headerStyle: {backgroundColor: 'transparent'},
        headerShadowVisible: false,
        
      }}>
      <Stack.Screen name="MessageHome" component={ReceivedMessages} options={{title: '쪽지함'}}/>
      <Stack.Screen name="Detail" component={MessageDetail} options={{title: '쪽지 내용'}}/>
      <Stack.Screen name="Draft" component={MessageDraft} options={{title: '쪽지 작성'}}/>
    </Stack.Navigator>
  );
};

const SentMessagesStack = () => {
  const Stack = createNativeStackNavigator<SentMessagesStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="MessageHome"
      screenOptions={{
        headerTintColor: '#8B90F7',
        headerStyle: {backgroundColor: 'transparent'},
        headerShadowVisible: false,
        
      }}>
      <Stack.Screen name="MessageHome" component={SentMessages} options={{title: '쪽지함'}}/>
      <Stack.Screen name="Detail" component={MessageDetail} options={{title: '쪽지 내용'}}/>
    </Stack.Navigator>
  );
};

const NotificationsScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="받은 쪽지함" component={ReceivedMessagesStack} />
        <Tab.Screen name="보낸 쪽지함" component={SentMessagesStack} />
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
