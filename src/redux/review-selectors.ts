import { RootState } from './store';

export const selectAuthorizationStatus = (state: RootState) => state.auth;
export const selectReviews = (state: RootState) => state.offers.reviews || [];
export const selectReviewsLoading = (state: RootState) => state.offers.reviewsLoading;
export const selectReviewSubmitLoading = (state: RootState) => state.offers.reviewSubmitLoading;
export const selectReviewSubmitError = (state: RootState) => state.offers.reviewSubmitError;
