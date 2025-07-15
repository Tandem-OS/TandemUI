import api from "@/lib/requests/Axios";
import { store } from '@/store';
import { logout, updateTokens } from '@/features/authentication/authSlice';
import { broadcastLogout } from '@/utils/logoutChannel';

interface SignUpValues {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

interface LoginValues {
  email: string;
  password: string;
}

interface ResetPasswordValues {
  password: string;
  token?: string;
}

export const signUp = async (values: SignUpValues) => {
  return await api.post('/signup', values);
};

export const Login = async (values: LoginValues) => {
  return await api.post('/login', values);
};

export const handleLogout = async () => {
  const user_id = store.getState().auth.user.id;
  const response = await api.post('/logout', user_id);
  if (response.data.success) {
    broadcastLogout();
    store.dispatch(logout());
  }
};

export const forgotPassword = async (email: string) => {
  return await api.post('/forgot-password', { email });
};

export const resetPassword = async (values: ResetPasswordValues) => {
  return await api.post('/reset-password', values);
};

export const getGoogleOAuthURL = async () => {
  return await api.get('/auth/google', { withCredentials: true });
};

export const exchangeCodeForTokens = async (code: string) => {
  const res = await api.post('/auth/callback', { code }, { withCredentials: true });
  return res.data;
};

export const handleRefreshToken = async () => {
  const token = store.getState().auth.tokens.refresh;
  if (!token) throw new Error("No refresh token");

  const response = await api.post("/refresh", {}, {
    headers: { "refresh-token": token },
  });

  const { access_token, refresh_token } = response.data;
  store.dispatch(updateTokens({ access_token, refresh_token }));

  return access_token;
};
