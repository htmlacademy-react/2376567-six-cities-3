import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData, AuthInfo, AuthResponse, ThunkConfig } from '../types';
import { dropToken, saveToken } from '../token';
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

export const registerAction = createAsyncThunk<
  AuthResponse,
  { email: string; password: string; name: string },
  ThunkConfig
>(
  'auth/register',
  async ({ email, password, name }, { extra: { api }, rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthResponse>('/register', {
        email,
        password,
        name
      });
      saveToken(data.token);
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || { error: 'Registration failed' });
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
    setAuthData: (state, action: PayloadAction<{
      status: AuthorizationStatus;
      email?: string;
    }>) => {
      state.authorizationStatus = action.payload.status;
      if (action.payload.email) {
        state.userEmail = action.payload.email;
      }
    },
    clearAuth: (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.userEmail = null;
    },
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string | null>) => {
      state.userEmail = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.userEmail = null;
      dropToken();
    }
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
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.AUTH;
        state.userEmail = action.payload.email;
        state.error = null;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
        state.error = (action.payload as { error: string })?.error || 'Registration failed';
      });
  },
});

export const { setAuthorizationStatus, setUserEmail, clearError, setAuthData, clearAuth } = authSlice.actions;
export default authSlice.reducer;
