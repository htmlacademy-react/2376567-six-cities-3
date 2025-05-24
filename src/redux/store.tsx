import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './citySlice';
import offersReducer from './offersSlice';

export const store = configureStore({
  reducer: {
    city: cityReducer,
    offers: offersReducer,
  },
});
