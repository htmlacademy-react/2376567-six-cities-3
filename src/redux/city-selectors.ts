import { CityState } from '../types';
export const selectCity = (state: { city: CityState }) => state.city;
export const selectCurrentCityName = ((state: { city: CityState }) => state.city.city.name);
