import { AuthorizationStatus } from '../types';
import { RootState } from './store';

export const selectAuthorizationStatus = (state: RootState) => state.auth.authorizationStatus;
export const selectIsAuth = (state: RootState) => state.auth.authorizationStatus === AuthorizationStatus.AUTH;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUserEmail = (state: RootState) => state.auth.userEmail;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
