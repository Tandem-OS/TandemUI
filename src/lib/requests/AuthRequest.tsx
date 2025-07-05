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

export const forgotPassword = async (email: string) => {
  return await api.post('/forgot-password', { email });
};

export const resetPassword = async (values: ResetPasswordValues) => {
  return await api.post('/reset-password', values);
};
