import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, OfferCard } from '../types';
import { AxiosInstance } from 'axios';
import { logout, setAuthData } from './auth-slice';

type FavoritesState = {
  data: OfferCard[];
  loading: boolean;
  error: string | null;
  count: number;
};

const initialState: FavoritesState = {
  data: [],
  loading: false,
  error: null,
  count: 0,
};

type AuthPayload = {
  status: AuthorizationStatus;
  email?: string;
};

export const fetchFavorites = createAsyncThunk<OfferCard[], void, { extra: { api: AxiosInstance } }>(
  'favorites/fetchFavorites',
  async (_, { extra: { api: apiInstance } }) => {
    const response = await apiInstance.get<OfferCard[]>('/favorite');
    return response.data;
  }
);

export const toggleFavorite = createAsyncThunk<OfferCard, { offerId: string; status: number }, { extra: { api: AxiosInstance } }>(
  'favorites/toggleFavorite',
  async ({ offerId, status }, { extra: { api: apiInstance } }) => {
    const response = await apiInstance.post<OfferCard>(`/favorite/${offerId}/${status}`);
    return response.data;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.count = action.payload.length;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch favorites';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (updatedOffer.isFavorite) {
          if (!state.data.some((offer) => offer.id === updatedOffer.id)) {
            state.data.push(updatedOffer);
          }
        } else {
          state.data = state.data.filter((offer) => offer.id !== updatedOffer.id);
        }
        state.count = state.data.length;
      })
      .addCase(logout, (state) => {
        state.data = [];
        state.count = 0;
        state.error = null;
        state.loading = false;
      })
      .addCase(setAuthData, (state, action: PayloadAction<AuthPayload>) => {
        if (action.payload.status === AuthorizationStatus.AUTH) {
          state.loading = true;
        }
      });
  },
});

export default favoritesSlice.reducer;
