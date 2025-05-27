import axios, { AxiosInstance } from 'axios';

const TIME_OUT = 5000;
const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';

export const createAPI = ():AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
  });

  return api;
};
