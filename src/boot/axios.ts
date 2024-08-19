import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apolo.afcoma.com.mx/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://apolo.afcoma.com.mx',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['x-api-key'] = 'cls[ty-5JDrkzE1HFN9v';
  }

  return config;
});

export { api };
