import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { OfferCard } from '../types';
import { AxiosInstance } from 'axios';
import { OffersState } from '../types';

const initialState: OffersState = {
  data: [],
  currentOffer: null,
  nearbyOffers: [],
  loading: false,
  nearbyLoading: false,
  error: null,
  nearbyError: null
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

export const fetchOfferById = createAsyncThunk<OfferCard, string, { extra: { api: AxiosInstance } }>(
  'offers/fetchById',
  async (offerId, { extra: { api } }) => {
    try {
      const response = await api.get<OfferCard>(`/offers/${offerId}`);
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw error;
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<OfferCard[], string, { extra: { api: AxiosInstance } }>(
  'offers/fetchNearby',
  async (offerId, { extra: { api } }) => {
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
      });
  }
});

export const { loadOffers, clearCurrentOffer, clearNearbyOffers } = offersSlice.actions;
export default offersSlice.reducer;
