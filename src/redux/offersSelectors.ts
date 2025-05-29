import { RootState } from './store';

export const selectOffers = (state: RootState) => state.offers.data;
export const selectLoading = (state: RootState) => state.offers.loading;
export const selectError = (state: RootState) => state.offers.error;
