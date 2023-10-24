import {ImageBackground, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import BottomTab from './components/BottomTab/BottomTab';

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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <ImageBackground
          source={require('./assets/stars.png')}
          style={styles.backgroundImage}>
          <NavigationContainer theme={navTheme}>
            <BottomTab />
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