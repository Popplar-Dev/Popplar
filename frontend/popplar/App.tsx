import {ImageBackground, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';


import BottomTab from './components/BottomTab/BottomTab';
import FirstLanding from './components/Landing/FirstLanding';
import LoginPage from './components/Landing/LoginPage';
import Home from './components/Landing/Home';

function App() {
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

  const Stack = createNativeStackNavigator();

  return (
    <RecoilRoot>
      <SafeAreaProvider> 
        <SafeAreaView style={styles.container}>
          {/* <StatusBar style="light" /> */}
          <ImageBackground
            source={require('./assets/stars.png')}
            style={styles.backgroundImage}>
            <NavigationContainer theme={navTheme}>
              <Stack.Navigator initialRouteName="Home" 
              screenOptions={{headerShown: false}}
              >
                <Stack.Screen name="FirstLanding" component={FirstLanding} />
                <Stack.Screen name="LoginPage" component={LoginPage} />
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen name="Home" component={Home} />
                {/* <Stack.Screen name="Main" component={Main} /> */}
              </Stack.Navigator>
              {/* <BottomTab /> */}
            </NavigationContainer>
          </ImageBackground>
        </SafeAreaView>
      </SafeAreaProvider>
    </RecoilRoot>
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
