import axios from 'axios';

const TIME_OUT = 5000;
const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';

export const API = axios({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});
