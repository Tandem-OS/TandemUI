import api from './Axios';

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

export const logout = async () => {
  const token = localStorage.getItem('access_token');

  if (token) {
    await api.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
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

