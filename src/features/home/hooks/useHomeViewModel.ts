import { useCallback, useEffect, useState } from 'react';
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

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const handleToggleSearch = useCallback(() => {
    setIsSearchOpen(prev => {
      if (prev) {
        setSearchQuery('');
      }
      return !prev;
    });
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Filter streams strictly based on selected tab, country, and search query
  const filteredStreams = streams.filter(stream => {
    const matchesTab =
      activeSubTab === 'Stream' ||
      (activeSubTab === 'Hot' && stream.category === 'Hot') ||
      (activeSubTab === 'Follow' && stream.isFollowing);

    const matchesCountry =
      selectedCountryId === 'global' ||
      stream.countryId === selectedCountryId ||
      stream.countryName.toLowerCase() === selectedCountryId.toLowerCase();

    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      stream.hostName.toLowerCase().includes(query) ||
      stream.countryName.toLowerCase().includes(query) ||
      stream.category.toLowerCase().includes(query);

    return matchesTab && matchesCountry && matchesQuery;
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
      searchQuery,
      isSearchOpen,
    },
    actions: {
      refresh: handleRefresh,
      selectSubTab: handleSelectSubTab,
      selectCountry: handleSelectCountry,
      toggleFollowHost: handleToggleFollow,
      setSearchQuery,
      toggleSearch: handleToggleSearch,
      clearSearch: handleClearSearch,
    },
  };
}
