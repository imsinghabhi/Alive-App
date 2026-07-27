import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomBottomTabBar } from '../features/home/components/CustomBottomTabBar';
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { PartyScreen } from '../features/party/screens/PartyScreen';
import { GoLiveScreen } from '../features/live/screens/GoLiveScreen';
import { ChatsScreen } from '../features/chats/screens/ChatsScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { MainTabParamList, ROUTES } from '../shared/constants/routes';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HomeScreen}
      tabBar={props => <CustomBottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={ROUTES.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={ROUTES.PartyScreen} component={PartyScreen} />
      <Tab.Screen name={ROUTES.GoLiveScreen} component={GoLiveScreen} />
      <Tab.Screen name={ROUTES.ChatsScreen} component={ChatsScreen} />
      <Tab.Screen name={ROUTES.ProfileScreen} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
