import axios, { AxiosInstance } from 'axios';
import { getToken } from './token';
import { dropToken } from './token';
import { AxiosError } from 'axios';

const REQUEST_TIMEOUT = 5000;
const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        dropToken();
      }
      return Promise.reject(error);
    }
  );

  return api;
};
