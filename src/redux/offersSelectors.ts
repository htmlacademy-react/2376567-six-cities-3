import { OffersState } from '../types';

export const selectOffers = (state: {offers: OffersState}) => state.offers;
