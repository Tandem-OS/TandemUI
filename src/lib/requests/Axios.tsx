import axios from 'axios';
import { store } from '@/store';
import { logout } from '@/features/authentication/authSlice';
import { clearProjectId } from '@/features/project/projectSlice';
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
  console.log(token)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const userRole = store.getState().auth.user.role;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (userRole === "Designer") {
        try {
          const newAccessToken = await handleRefreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          store.dispatch(logout());
          store.dispatch(clearProjectId());
          window.location.href = "/auth";
          return Promise.reject(err);
        }
      }

      if (userRole === "Client") {
        store.dispatch(logout());
        store.dispatch(clearProjectId());
        window.location.href = "/auth/magic-link-message";
        return Promise.reject(error);
      }

      // fallback for unknown role or missing userRole
      store.dispatch(logout());
      store.dispatch(clearProjectId());
      window.location.href = "/auth";
      return Promise.reject(error);
    }

    // for all other errors, just reject
    return Promise.reject(error);
  }
);

export default api;
