import axios from 'axios';

export const API_BASE_URL = 'https://api.aliveapp.com/v1';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    // Inject auth token headers here if needed
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  },
);
