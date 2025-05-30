import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { OfferCard } from '../types';
import { AxiosInstance } from 'axios';

type OffersState = {
  data: OfferCard[];
  loading: boolean;
  error: string | null;
};

const initialState: OffersState = {
  data: [],
  loading: false,
  error: null
};


export const fetchOffers = createAsyncThunk<OfferCard[], void, { extra: { api: AxiosInstance } }>(
  'offers/fetchAll',
  async (_, { extra: { api } }) => {
    const response = await api.get<OfferCard[]>('/offers');
    return response.data;
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<OfferCard[]>) => {
      state.data = action.payload;
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
        state.error = action.error.message || 'Failed to load offers';
      });
  }
});

export const { loadOffers } = offersSlice.actions;
export default offersSlice.reducer;
