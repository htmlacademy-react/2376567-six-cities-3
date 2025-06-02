import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './citySlice';
import offersReducer from './offersSlice';
import { createAPI } from '../api';
import authReducer from './authSlice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    city: cityReducer,
    offers: offersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
