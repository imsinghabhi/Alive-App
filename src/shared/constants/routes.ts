export const ROUTES = {
  SplashScreen: 'SplashScreen',
  LoginScreen: 'LoginScreen',
  MainTab: 'MainTab',
  HomeScreen: 'HomeScreen',
  PartyScreen: 'PartyScreen',
  GoLiveScreen: 'GoLiveScreen',
  ChatsScreen: 'ChatsScreen',
  ProfileScreen: 'ProfileScreen',
} as const;

export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  MainTab: undefined;
};

export type MainTabParamList = {
  HomeScreen: undefined;
  PartyScreen: undefined;
  GoLiveScreen: undefined;
  ChatsScreen: undefined;
  ProfileScreen: undefined;
};