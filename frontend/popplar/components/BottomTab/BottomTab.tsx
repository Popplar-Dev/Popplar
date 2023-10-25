import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, StyleSheet} from 'react-native';

//스크린 컴포넌트
import MapScreen from '../MapScreen';
import ChatScreen from '../ChatScreen';
import MyPageScreen from '../MyPageScreen';
import AllPlacesScreen from '../AllPlacesScreen';
import NotificationsScreen from '../NotificationsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      backBehavior='history'
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
        component={MyPageScreen}
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
