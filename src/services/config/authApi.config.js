import axios from 'axios';
import { redirect } from 'react-router-dom';
import token from '@/utils/token';
import { getNewToken } from '../api/authentication';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.statusText === 'Unauthorized'
    ) {
      const refreshToken = token.getRefreshToken();

      if (!refreshToken) {
        redirect('/login');
      }

      const response = await getNewToken(refreshToken);
      const newAccessToken = response.data.data.access_token;
      const newRefreshToken = response.data.data.refresh_token;

      token.setAccessToken(newAccessToken);
      token.setRefreshToken(newRefreshToken);

      authApi(originalRequest);
    }
  },
);

export default authApi;
