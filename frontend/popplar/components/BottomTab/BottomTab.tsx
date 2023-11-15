import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, StyleSheet} from 'react-native';

import {TabNavigatorParamList} from '../types/NavigatorParams';

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
import SpeedTouch from '../Games/SpeedTouch';
import ClickGame from '../Games/ClickGame';
import QnaList from '../QnA/QnaList';
import QnaDetail from '../QnA/QnaDetail';
import FiveGame from '../Games/FiveGame';
import MessageDraft from '../Messages/MessageDraft';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();
const Stack = createNativeStackNavigator();

const MapScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#8B90F7',
        headerStyle: {backgroundColor: 'transparent'},
        headerShadowVisible: false,
      }}>
      {/* <Stack.Screen name="Mypage" component={MyPageScreen} options={{headerShown: false}}/> */}
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SpeedTouch"
        component={SpeedTouch}
        options={{headerTitle: 'SpeedTouchGame'}}
      />
      <Stack.Screen
        name="FiveGame"
        component={FiveGame}
        options={{headerTitle: 'FiveGame'}}
      />
      <Stack.Screen
        name="ClickGame"
        component={ClickGame}
        options={{headerTitle: 'ClickGame'}}
      />
      <Stack.Screen
        name="QnaList"
        component={QnaList}
        options={{headerTitle: 'QnaList'}}
      />
      <Stack.Screen
        name="QnaDetail"
        component={QnaDetail}
        options={{headerTitle: 'QnaDetail'}}
      />
      <Stack.Screen
        name="Draft"
        component={MessageDraft}
        options={{headerTitle: '쪽지 보내기'}}
      />
    </Stack.Navigator>
  );
};

const ChatScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatScreen">
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Draft"
        component={MessageDraft}
        options={{headerTitle: '쪽지 보내기'}}
      />
    </Stack.Navigator>
  );
};

const MyPageStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#8B90F7',
        headerStyle: {backgroundColor: 'transparent'},
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Mypage"
        component={MyPageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{headerTitle: 'SETTINGS'}}
      />
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSetting}
        options={{headerTitle: '프로필 수정'}}
      />
      <Stack.Screen
        name="AlarmSetting"
        component={AlarmSetting}
        options={{headerTitle: '알림 설정'}}
      />
      <Stack.Screen
        name="Inquire"
        component={Inquire}
        options={{headerTitle: '문의하기'}}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{headerTitle: '이용약관'}}
      />

      <Stack.Screen
        name="SpeedTouch"
        component={SpeedTouch}
        options={{headerTitle: 'SpeedTouchGame'}}
      />
      <Stack.Screen
        name="QnaList"
        component={QnaList}
        options={{headerTitle: 'QnaList'}}
      />
      <Stack.Screen
        name="QnaDetail"
        component={QnaDetail}
        options={{headerTitle: 'QnaDetail'}}
      />
    </Stack.Navigator>
  );
};

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      backBehavior="history"
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
        name="AllPlaces"
        component={AllPlacesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="list" size={25} color={focused ? '#613EEA' : 'white'} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreenStack}
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
        component={MapScreenStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.mapTabBackground}>
              <View
                style={
                  focused
                    ? [
                        styles.mapIconBackground,
                        {width: 60, height: 60, borderRadius: 30},
                      ]
                    : [styles.mapIconBackground]
                }>
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
            <Icon name="user" size={25} color={focused ? '#613EEA' : 'white'} />
          ),
          unmountOnBlur: true,
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
