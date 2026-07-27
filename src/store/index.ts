import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/homeSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch'];