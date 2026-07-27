import React, { useCallback, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CountryFilterBar } from '../components/CountryFilterBar';
import { HomeHeader } from '../components/HomeHeader';
import { LiveStreamCard } from '../components/LiveStreamCard';
import { SubHeaderTabs } from '../components/SubHeaderTabs';
import { useHomeViewModel } from '../hooks/useHomeViewModel';
import { LiveStreamCardData } from '../types/home.types';
import { colors, spacing } from '../../../shared/theme';

export function HomeScreen() {
  const { state, actions } = useHomeViewModel();
  const flatListRef = useRef<FlatList<LiveStreamCardData>>(null);

  // Dynamic key based on active sub-tab and selected country.
  // Re-keying unmounts the previous VirtualizedList instance, purging stored cell
  // height metrics, scroll offsets, and virtualization caches completely.
  const listKey = `grid_${state.activeSubTab}_${state.selectedCountryId}`;

  // Reset scroll offset to 0 whenever sub-tab or country filter changes
  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [state.activeSubTab, state.selectedCountryId]);

  // Memoized renderItem to prevent item re-renders on parent state updates
  const renderItem: ListRenderItem<LiveStreamCardData> = useCallback(
    ({ item }) => (
      <LiveStreamCard
        item={item}
        onPressCard={() => {}}
        onToggleFollow={actions.toggleFollowHost}
      />
    ),
    [actions.toggleFollowHost],
  );

  // Memoized ListEmptyComponent positioned immediately below the country filter bar
  const renderEmptyComponent = useCallback(() => {
    if (state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accentEnd} />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No live streams found</Text>
      </View>
    );
  }, [state.loading]);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Top Header & Filter Controls */}
      <View style={styles.topSection}>
        <HomeHeader
          unreadCount={state.unreadNotifications}
          onPressNotification={() => {}}
          onPressGiftBag={() => {}}
        />

        <SubHeaderTabs
          activeTab={state.activeSubTab}
          onSelectTab={actions.selectSubTab}
        />

        <CountryFilterBar
          countries={state.countries}
          selectedCountryId={state.selectedCountryId}
          onSelectCountry={actions.selectCountry}
        />
      </View>

      {/* Live Stream Cards 2-Column Grid */}
      <FlatList
        ref={flatListRef}
        key={listKey}
        data={state.streams}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[
          styles.listContent,
          state.streams.length === 0 && styles.emptyListContent,
        ]}
        style={styles.flatList}
        extraData={state.streams}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={state.loading}
            onRefresh={actions.refresh}
            colors={[colors.accentEnd]}
            tintColor={colors.accentEnd}
          />
        }
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    backgroundColor: '#FFFFFF',
    flexGrow: 0,
    flexShrink: 0,
  },
  flatList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: 14,
    paddingBottom: spacing.xxl,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  emptyText: {
    color: '#888888',
    fontSize: 16,
    fontWeight: '600',
  },
});
