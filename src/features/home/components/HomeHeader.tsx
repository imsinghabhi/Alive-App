import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing } from '../../../shared/theme';
import { SplashLogo } from '../../splash/components/SplashLogo';

interface HomeHeaderProps {
  unreadCount?: number;
  onlineCount?: number;
  onPressSearch?: () => void;
  onPressNotification?: () => void;
  onPressGiftBag?: () => void;
}

export function HomeHeader({
  unreadCount = 3,
  onlineCount = 48290,
  onPressSearch,
  onPressNotification,
  onPressGiftBag,
}: HomeHeaderProps) {
  const formattedOnline =
    onlineCount > 999
      ? `${(onlineCount / 1000).toFixed(1)}K`
      : onlineCount.toString();

  return (
    <View style={styles.container}>
      {/* Left: Alive Logo + Online User Count Badge */}
      <View style={styles.leftWrap}>
        <SplashLogo size={42} />
        <View style={styles.onlinePill}>
          <View style={styles.livePulseDot} />
          <Text style={styles.onlineText}>{formattedOnline} Online</Text>
        </View>
      </View>

      {/* Right Icons: Search, Notifications, Store Gift Bag */}
      <View style={styles.actionsRight}>
        {/* Search Button */}
        <Pressable
          onPress={onPressSearch}
          style={styles.iconCircle}
          hitSlop={8}
        >
          <Icon name="search-outline" size={20} color="#444444" />
        </Pressable>

        {/* Notification Bell */}
        <Pressable
          onPress={onPressNotification}
          style={styles.iconCircle}
          hitSlop={8}
        >
          <Icon name="notifications-outline" size={20} color="#444444" />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </Pressable>

        {/* Gift / Store Bag Icon */}
        <Pressable
          onPress={onPressGiftBag}
          style={styles.giftCircle}
          hitSlop={8}
        >
          <Icon name="bag-handle-outline" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
    backgroundColor: '#FFFFFF',
  },
  leftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F2F9F1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(60, 191, 35, 0.2)',
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3CBF23',
  },
  onlineText: {
    color: '#2E7D23',
    fontSize: 11,
    fontWeight: '700',
  },
  actionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  giftCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.accentEnd,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accentEnd,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});
