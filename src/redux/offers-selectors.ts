import { RootState } from './store';

export const selectOffers = (state: RootState) => state.offers.data;
export const selectLoading = (state: RootState) => state.offers.loading;
export const selectError = (state: RootState) => state.offers.error;
export const selectCurrentOffer = (state: RootState) => state.offers.currentOffer;
export const selectNearbyOffers = (state: RootState) => state.offers.nearbyOffers;

