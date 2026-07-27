import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthState {
  user: AuthUser | null;
  initializing: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  initializing: true,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
    },
    setInitializing: (state, action: PayloadAction<boolean>) => {
      state.initializing = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  setInitializing,
  setLoading,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
