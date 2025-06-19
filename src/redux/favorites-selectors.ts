import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const selectFavoritesState = (state: RootState) => state.favorites;

export const selectFavorites = createSelector(
  selectFavoritesState,
  (favorites) => favorites.data
);

export const selectFavoritesCount = createSelector(
  selectFavoritesState,
  (favorites) => favorites.count
);

export const selectFavoritesLoading = createSelector(
  selectFavoritesState,
  (favorites) => favorites.loading
);
