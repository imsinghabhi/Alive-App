import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { SplashScreen } from '../features/splash/screens/SplashScreen';
import { ROUTES, type RootStackParamList } from '../shared/constants/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.SplashScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={ROUTES.SplashScreen} component={SplashScreen} />
        <Stack.Screen name={ROUTES.LoginScreen} component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}