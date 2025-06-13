import axios, { AxiosInstance, AxiosError } from 'axios';
import { getToken, dropToken } from './token';
import { AuthResponse } from './types';
import { api } from './redux/store';

const REQUEST_TIMEOUT = 5000;
const BASE_URL = 'https://16.design.htmlacademy.pro/six-cities';

export const createAPI = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        dropToken();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const checkAuth = async (): Promise<AuthResponse | null> => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const response = await api.get<AuthResponse>('/login');
    return response.data;
  } catch {
    dropToken();
    return null;
  }
};
