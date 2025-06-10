import { RootState } from './store';

export const selectFavorites = (state: RootState) => state.favorites.data;
export const selectFavoritesCount = (state: RootState) => state.favorites.count;
export const selectFavoritesLoading = (state: RootState) => state.favorites.loading;
export const selectFavoritesError = (state: RootState) => state.favorites.error;
