import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { OfferCard, Review, OffersState, AuthorizationStatus } from '../types';
import axios, { AxiosInstance } from 'axios';
import { toggleFavorite } from './favorites-slice';
import { logout, setAuthData } from './auth-slice';

const initialState: OffersState = {
  data: [],
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  reviewsLoading: false,
  reviewSubmitLoading: false,
  reviewSubmitError: null,
  loading: false,
  nearbyLoading: false,
  error: null,
  nearbyError:''
};

export const fetchOffers = createAsyncThunk<OfferCard[], void, { extra: { api: AxiosInstance } }>(
  'offers/fetchAll',
  async (_, { extra: { api } }) => {
    try {
      const response = await api.get<OfferCard[]>('/offers');
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  }
);

export const fetchOfferById = createAsyncThunk<OfferCard | null, string, { extra: { api: AxiosInstance } }>(
  'offers/fetchById',
  async (offerId, { extra: { api } }) => {
    try {
      const response = await api.get<OfferCard>(`/offers/${offerId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<OfferCard[], string, { extra: { api: AxiosInstance } }>('offers/fetchNearby', async (offerId, { extra: { api } }) => {
  try {
    const response = await api.get<OfferCard[]>(`/offers/${offerId}/nearby`);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
}
);

export const fetchReviews = createAsyncThunk<Review[],string,{ extra: { api: AxiosInstance } }>('offers/fetchReviews', async (offerId, { extra: { api }}) => {
  try {
    const response = await api.get<Review[]>(`/comments/${offerId}`);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
});

export const submitReview = createAsyncThunk<Review, { offerId: string | undefined; rating: number; comment: string }, { extra: { api: AxiosInstance } }>(
  'offers/submitReview',
  async ({ offerId, rating, comment }, { extra: { api } }) => {
    const response = await api.post<Review>(`/comments/${offerId}`, { rating, comment });
    return response.data;
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<OfferCard[]>) => {
      state.data = action.payload;
    },
    clearCurrentOffer: (state) => {
      state.currentOffer = null;
    },
    clearNearbyOffers: (state) => {
      state.nearbyOffers = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load offers';
        state.currentOffer = null;
      })
      .addCase(fetchOfferById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.nearbyOffers = [];
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.loading = false;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to load offer';
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.nearbyLoading = true;
        state.nearbyError = null;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.nearbyLoading = false;
      })
      .addCase(fetchNearbyOffers.rejected, (state, action) => {
        state.nearbyLoading = false;
        state.nearbyError = action.payload as string || 'Failed to load nearby offers';
      })
      .addCase(fetchReviews.pending, (state) => {
        state.reviewsLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsLoading = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.reviewsLoading = false;
      })
      .addCase(submitReview.pending, (state) => {
        state.reviewSubmitLoading = true;
        state.reviewSubmitError = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
        state.reviewSubmitLoading = false;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.reviewSubmitLoading = false;
        state.reviewSubmitError = action.payload as string;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        state.data = state.data.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );

        if (state.currentOffer?.id === updatedOffer.id) {
          state.currentOffer = updatedOffer;
        }

        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
      })
      .addCase(logout, (state) => {
        state.data = state.data.map((offer) => ({
          ...offer,
          isFavorite: false
        }));

        if (state.currentOffer) {
          state.currentOffer.isFavorite = false;
        }

        state.nearbyOffers = state.nearbyOffers.map((offer) => ({
          ...offer,
          isFavorite: false
        }));
      })
      .addCase(setAuthData, (state, action) => {
        if (action.payload.status === AuthorizationStatus.NO_AUTH) {
          state.data = state.data.map((offer) => ({
            ...offer,
            isFavorite: false
          }));
          if (state.currentOffer) {
            state.currentOffer.isFavorite = false;
          }
          state.nearbyOffers = state.nearbyOffers.map((offer) => ({
            ...offer,
            isFavorite: false
          }));
        }
      });
  }
});

export const { loadOffers, clearCurrentOffer, clearNearbyOffers } = offersSlice.actions;
export default offersSlice.reducer;
