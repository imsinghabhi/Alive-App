import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing } from '../../../shared/theme';

interface HomeHeaderProps {
  unreadCount?: number;
  onPressNotification?: () => void;
  onPressGiftBag?: () => void;
}

export function HomeHeader({
  unreadCount = 3,
  onPressNotification,
  onPressGiftBag,
}: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Alive Logo Badge */}
      <View style={styles.logoWrap}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>Alive</Text>
          <View style={styles.cameraIconWrap}>
            <Icon name="videocam" size={14} color="#FFFFFF" />
          </View>
        </View>
      </View>

      {/* Right Icons */}
      <View style={styles.actionsRight}>
        {/* Notification Bell */}
        <Pressable
          onPress={onPressNotification}
          style={styles.iconCircle}
          hitSlop={8}
        >
          <Icon name="notifications-outline" size={22} color="#444444" />
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
          <Icon name="bag-handle-outline" size={20} color="#FFFFFF" />
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
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBox: {
    backgroundColor: '#3CBF23',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#3CBF23',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  cameraIconWrap: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 999,
    padding: 3,
  },
  actionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  giftCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
