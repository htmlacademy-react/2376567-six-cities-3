import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './city-slice';
import offersReducer from './offers-slice';
import { createAPI } from '../api';
import authReducer from './auth-slice';
import { useDispatch } from 'react-redux';
import favoritesReducer from './favorites-slice';
import reviewReducer from './review-slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    city: cityReducer,
    offers: offersReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    review: reviewReducer,
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
export const useAppDispatch = () => useDispatch<AppDispatch>();
