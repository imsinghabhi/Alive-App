import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchHomeFeedThunk,
  setActiveSubTab,
  setSelectedCountry,
  toggleFollow,
} from '../../../store/slices/homeSlice';
import { SubTabType } from '../types/home.types';

export function useHomeViewModel() {
  const dispatch = useAppDispatch();
  const {
    activeSubTab,
    selectedCountryId,
    unreadNotifications,
    onlineCount,
    countries,
    streams,
    loading,
    error,
  } = useAppSelector(state => state.home);

  useEffect(() => {
    dispatch(fetchHomeFeedThunk());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchHomeFeedThunk());
  }, [dispatch]);

  const handleSelectSubTab = useCallback(
    (tab: SubTabType) => {
      dispatch(setActiveSubTab(tab));
    },
    [dispatch],
  );

  const handleSelectCountry = useCallback(
    (countryId: string) => {
      dispatch(setSelectedCountry(countryId));
    },
    [dispatch],
  );

  const handleToggleFollow = useCallback(
    (id: string) => {
      dispatch(toggleFollow(id));
    },
    [dispatch],
  );

  // Filter streams strictly based on selected tab and country
  const filteredStreams = streams.filter(stream => {
    const matchesTab =
      activeSubTab === 'Stream' ||
      (activeSubTab === 'Hot' && stream.category === 'Hot') ||
      (activeSubTab === 'Follow' && stream.isFollowing);

    const matchesCountry =
      selectedCountryId === 'global' ||
      stream.countryId === selectedCountryId ||
      stream.countryName.toLowerCase() === selectedCountryId.toLowerCase();

    return matchesTab && matchesCountry;
  });

  return {
    state: {
      activeSubTab,
      selectedCountryId,
      unreadNotifications,
      onlineCount,
      countries,
      streams: filteredStreams,
      loading,
      error,
    },
    actions: {
      refresh: handleRefresh,
      selectSubTab: handleSelectSubTab,
      selectCountry: handleSelectCountry,
      toggleFollowHost: handleToggleFollow,
    },
  };
}
