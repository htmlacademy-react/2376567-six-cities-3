import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData, AuthInfo, AuthResponse, ThunkConfig } from '../types';
import { saveToken } from '../token';
import { AuthorizationStatus, AuthState } from '../types';
import axios from 'axios';

export const loginAction = createAsyncThunk<AuthResponse, AuthData, ThunkConfig>(
  'auth/login',
  async ({ email, password }, { extra: { api }, rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthInfo & { email: string }>('/login', { email, password });
      saveToken(data.token);
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || { error: 'Authorization failed' });
      }
      return rejectWithValue({ error: 'Unknown error' });
    }
  }
);

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  error: null,
  userEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string | null>) => {
      state.userEmail = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
        state.userEmail = action.payload.email;
        state.error = null;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
        state.error = (action.payload as { error: string })?.error || 'Authorization failed';
      });
  },
});

export const { setAuthorizationStatus, setUserEmail, clearError } = authSlice.actions;
export default authSlice.reducer;
