import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, City } from './types';

const initialState:AppState = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  },
  // offers: [],
};

const appSlice = createSlice({
  name:'app',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<City>) {
      state.name = action.payload.name;
      state.location = action.payload.location;
    }
  }
});

export const { changeCity } = appSlice.actions;

export default appSlice.reducer;
