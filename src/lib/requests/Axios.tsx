import axios from 'axios';
import { store } from '@/store';
import { logout } from '@/features/authentication/authSlice';
import { handleRefreshToken } from '@/lib/requests/AuthRequest';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.tokens.access;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Optionally call /logout
      try {
        const newAccessToken = await handleRefreshToken();

        // Attach new access token to the original request and retry
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {

        store.dispatch(logout());
        window.location.href = "/auth";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
