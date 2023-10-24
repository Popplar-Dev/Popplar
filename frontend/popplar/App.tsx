import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';

//스크린 컴포넌트
import MapScreen from './components/MapScreen';
import ChatScreen from './components/ChatScreen';
import MyPageScreen from './components/MyPageScreen';

function MapStackScreen() {
  return <MapScreen/>
    // <MapStack.Navigator>
    //   <MapStack.Screen name="MapStackScreenMap" component={MapScreen} />
    // </MapStack.Navigator>
  
}

function ChatStackScreen() {
  return <ChatScreen/>
}

function MyPageStackScreen() {
  return <MyPageScreen/>
}

// Bottom Tab 네비게이터
const Tab = createBottomTabNavigator();

function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Map" component={MapStackScreen} />
          <Tab.Screen name="Chat" component={ChatStackScreen} />
          <Tab.Screen name="MyPage" component={MyPageStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C', // 배경색??
  },
});

export default App;
