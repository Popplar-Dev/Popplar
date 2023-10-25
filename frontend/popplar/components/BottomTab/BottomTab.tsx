import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, StyleSheet} from 'react-native';

//스크린 컴포넌트
import MapScreen from '../MapScreen';
import ChatScreen from '../ChatScreen';
import MyPageScreen from '../MyPageScreen';
import AllPlacesScreen from '../AllPlacesScreen';
import NotificationsScreen from '../NotificationsScreen';
import SettingScreen from '../Settings/SettingScreen';
import ProfileSetting from '../Settings/ProfileSetting';
import AlarmSetting from '../Settings/AlarmSetting';
import Terms from '../Settings/Terms';
import Inquire from '../Settings/Inquire';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyPageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mypage" component={MyPageScreen} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
      <Stack.Screen name="AlarmSetting" component={AlarmSetting} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Inquire" component={Inquire} />
    </Stack.Navigator>
  );
}

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'flex',
          position: 'absolute',
          elevation: 5,
        },
      }}>
      <Tab.Screen
        name="AllPlacesScreen"
        component={AllPlacesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="list" size={25} color={focused ? '#613EEA' : 'white'} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="comment-dots"
              size={25}
              color={focused ? '#613EEA' : 'white'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.mapTabBackground}>
              <View style={focused ? [styles.mapIconBackground, {width: 60, height: 60, borderRadius: 30}] : [styles.mapIconBackground]}>
                <Icon
                  name="map-marked-alt"
                  size={focused ? 28 : 25}
                  color="white"
                />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="bell" size={25} color={focused ? '#613EEA' : 'white'} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="user"
              size={25}
              color={focused ? '#613EEA' : 'white'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  mapTabBackground: {
    width: 70,
    height: 70,
    top: -35,
    position: 'absolute',
    backgroundColor: '#1E1E1E',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIconBackground: {
    width: 50,
    height: 50,
    backgroundColor: '#613EEA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
