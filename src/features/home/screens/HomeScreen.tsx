import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CountryFilterBar } from '../components/CountryFilterBar';
import { HomeHeader } from '../components/HomeHeader';
import { LiveStreamCard } from '../components/LiveStreamCard';
import { SubHeaderTabs } from '../components/SubHeaderTabs';
import { useHomeViewModel } from '../hooks/useHomeViewModel';
import { colors, spacing } from '../../../shared/theme';

export function HomeScreen() {
  const { state, actions } = useHomeViewModel();

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <HomeHeader
        unreadCount={state.unreadNotifications}
        onPressNotification={() => {}}
        onPressGiftBag={() => {}}
      />

      {/* Sub-Header Tabs */}
      <SubHeaderTabs
        activeTab={state.activeSubTab}
        onSelectTab={actions.selectSubTab}
      />

      {/* Country Filter Chips */}
      <CountryFilterBar
        countries={state.countries}
        selectedCountryId={state.selectedCountryId}
        onSelectCountry={actions.selectCountry}
      />

      {/* Live Stream Cards 2-Column Grid */}
      <FlatList
        data={state.streams}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={state.streams.length > 0 ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={state.loading}
            onRefresh={actions.refresh}
            colors={[colors.accentEnd]}
            tintColor={colors.accentEnd}
          />
        }
        renderItem={({ item }) => (
          <LiveStreamCard
            item={item}
            onPressCard={() => {}}
            onToggleFollow={actions.toggleFollowHost}
          />
        )}
        ListEmptyComponent={
          !state.loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No live streams found</Text>
            </View>
          ) : (
            <ActivityIndicator
              size="large"
              color={colors.accentEnd}
              style={{ marginTop: 40 }}
            />
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888888',
    fontSize: 16,
    fontWeight: '600',
  },
});
