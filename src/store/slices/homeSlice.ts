import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { homeService } from '../../features/home/services/homeService';
import {
  CountryTab,
  HomeFeedResponse,
  LiveStreamCardData,
  SubTabType,
} from '../../features/home/types/home.types';

interface HomeState {
  activeSubTab: SubTabType;
  selectedCountryId: string;
  unreadNotifications: number;
  onlineCount: number;
  countries: CountryTab[];
  streams: LiveStreamCardData[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  activeSubTab: 'Stream',
  selectedCountryId: 'global',
  unreadNotifications: 3,
  onlineCount: 48290,
  countries: [],
  streams: [],
  loading: false,
  error: null,
};

export const fetchHomeFeedThunk = createAsyncThunk(
  'home/fetchHomeFeed',
  async (_, { rejectWithValue }) => {
    try {
      const data = await homeService.fetchHomeFeed();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch home feed');
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setActiveSubTab(state, action: PayloadAction<SubTabType>) {
      state.activeSubTab = action.payload;
    },
    setSelectedCountry(state, action: PayloadAction<string>) {
      state.selectedCountryId = action.payload;
    },
    toggleFollow(state, action: PayloadAction<string>) {
      const streamId = action.payload;
      const target = state.streams.find(s => s.id === streamId);
      if (target) {
        target.isFollowing = !target.isFollowing;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHomeFeedThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchHomeFeedThunk.fulfilled,
        (state, action: PayloadAction<HomeFeedResponse>) => {
          state.loading = false;
          state.unreadNotifications = action.payload.unreadNotifications;
          state.onlineCount = action.payload.onlineCount;
          state.countries = action.payload.countries;
          state.streams = action.payload.streams;
        },
      )
      .addCase(fetchHomeFeedThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveSubTab, setSelectedCountry, toggleFollow } =
  homeSlice.actions;

export default homeSlice.reducer;
