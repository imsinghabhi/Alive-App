import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { SplashScreen } from '../features/splash/screens/SplashScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { ROUTES, type RootStackParamList } from '../shared/constants/routes';
import { durations } from '../shared/constants/durations';
import { useAppSelector } from '../store/hooks';
import { useAuthListener } from '../features/auth/hooks/useAuthListener';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  useAuthListener();
  const { user, initializing } = useAppSelector(state => state.auth);
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashFinished(true);
    }, durations.splashHold);

    return () => clearTimeout(timer);
  }, []);

  const isAppReady = !initializing && splashFinished;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAppReady ? (
          <Stack.Screen name={ROUTES.SplashScreen} component={SplashScreen} />
        ) : user ? (
          <Stack.Screen name={ROUTES.MainTab} component={MainTabNavigator} />
        ) : (
          <Stack.Screen name={ROUTES.LoginScreen} component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}