import {View, ImageBackground, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import BottomTab from './components/BottomTab/BottomTab';
import MapScreen from './components/MapScreen';
import ChatScreen from './components/ChatScreen';
import MyPageScreen from './components/MyPageScreen';

function App() {
  const Tab = createBottomTabNavigator();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#613EEA',
      background: 'transparent',
      card: '#1E1E1E',
      text: '#9DB2CE',
      border: 'transparent',
    },
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <ImageBackground
          source={require('./assets/stars.png')} // 배경 이미지
          style={styles.backgroundImage}>
          <NavigationContainer theme={navTheme}>
            <Tab.Navigator
              initialRouteName="Map"
              screenOptions={{headerShown: false}}>
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Chat" component={ChatScreen} />
              <Tab.Screen name="MyPage" component={MyPageScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default App;
