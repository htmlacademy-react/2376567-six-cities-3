import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityState, City } from '../types';

const initialState:CityState = {
  city:{
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  }
};

const citySlice = createSlice({
  name:'city',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<City>) {
      state.city.name = action.payload.name;
      state.city.location = action.payload.location;
    }
  }
});

export const { changeCity } = citySlice.actions;

export default citySlice.reducer;
