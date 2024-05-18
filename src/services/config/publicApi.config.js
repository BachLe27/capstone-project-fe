import axios from 'axios';

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default publicApi;
