import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//스크린 컴포넌트
import MapScreen from '../MapScreen';
import ChatScreen from '../ChatScreen';
import MyPageScreen from '../MyPageScreen';

export default function BottomTab() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
