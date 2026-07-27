import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CustomBottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const getIconName = (routeName: string, isFocused: boolean) => {
    switch (routeName) {
      case 'HomeScreen':
        return isFocused ? 'home' : 'home-outline';
      case 'PartyScreen':
        return isFocused ? 'sparkles' : 'sparkles-outline';
      case 'GoLiveScreen':
        return 'radio';
      case 'ChatsScreen':
        return isFocused ? 'navigate' : 'navigate-outline';
      case 'ProfileScreen':
        return isFocused ? 'person' : 'person-outline';
      default:
        return 'ellipse';
    }
  };

  const getTabLabel = (routeName: string) => {
    switch (routeName) {
      case 'HomeScreen':
        return 'Home';
      case 'PartyScreen':
        return 'Party';
      case 'GoLiveScreen':
        return 'Go Live';
      case 'ChatsScreen':
        return 'Chats';
      case 'ProfileScreen':
        return 'Profile';
      default:
        return routeName;
    }
  };

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.tabBarBackground}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isCenter = route.name === 'GoLiveScreen';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isCenter) {
            return (
              <View key={route.key} style={styles.centerTabContainer}>
                <Pressable
                  onPress={onPress}
                  style={({ pressed }) => [
                    styles.centerButton,
                    pressed && styles.centerButtonPressed,
                  ]}
                >
                  <Icon name="radio" size={26} color="#3CBF23" />
                </Pressable>
                <Text style={styles.centerTabLabel}>{getTabLabel(route.name)}</Text>
              </View>
            );
          }

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              hitSlop={6}
            >
              <Icon
                name={getIconName(route.name, isFocused)}
                size={22}
                color={isFocused ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.activeTabLabel : styles.inactiveTabLabel,
                ]}
              >
                {getTabLabel(route.name)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: '#3CBF23',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    position: 'relative',
  },
  tabBarBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  activeTabLabel: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  inactiveTabLabel: {
    color: 'rgba(255, 255, 255, 0.75)',
  },
  centerTabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
    gap: 3,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#3CBF23',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  centerButtonPressed: {
    transform: [{ scale: 0.94 }],
  },
  centerTabLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 2,
  },
});
