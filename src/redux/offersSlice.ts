import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OffersState } from '../types';

const initialState:OffersState = [];

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    loadOffers(_, action: PayloadAction<OffersState>) {
      return action.payload;
    }
  }
});

export const { loadOffers } = offersSlice.actions;

export default offersSlice.reducer;
