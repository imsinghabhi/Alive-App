import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../../shared/theme';
import { SubTabType } from '../types/home.types';

interface SubHeaderTabsProps {
  activeTab: SubTabType;
  onSelectTab: (tab: SubTabType) => void;
}

const TABS: SubTabType[] = ['Stream', 'Hot', 'Follow'];

export function SubHeaderTabs({ activeTab, onSelectTab }: SubHeaderTabsProps) {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = activeTab === tab;
        return (
          <Pressable
            key={tab}
            onPress={() => onSelectTab(tab)}
            style={styles.tabItem}
            hitSlop={6}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    gap: spacing.xl,
    backgroundColor: '#FFFFFF',
  },
  tabItem: {
    paddingVertical: spacing.xs,
    position: 'relative',
  },
  tabText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#888888',
  },
  activeTabText: {
    color: colors.accentEnd,
    fontWeight: '800',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.accentEnd,
    borderRadius: 2,
  },
});
