import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import FormButton from './components/FormButton';
import SimpleButton from '../../demos/buttons/SimpleButton';
import { useAuth } from '../../../lib/providers/AuthProvider'; // Fixed import path
import { Login, getGoogleOAuthURL } from '../../../lib/requests/AuthRequest';

const LoginForm = () => {
  const navigate = useNavigate();
  // const { signIn, signInWithGoogle } = useAuth();

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '', general: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!values.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleLogin = async () => {
    // Clear any previous errors
    setErrors({});

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await Login(values);
      if (response.data.success) {
        const { access_token, refresh_token, login_time } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('login_time', login_time);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await getGoogleOAuthURL();
     const data = res.data; 
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No URL returned");
      }
    } catch (error) {
      console.error("Google OAuth initiation failed:", error);
    }
  };


  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleLogin();
      }}
      className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl px-xl py-lg space-y-md lg:space-y-lg shadow-xl"
    >
      {/* Back to Home */}
      <div className="flex justify-end">
        <Link
          to="/"
          className="flex items-center gap-sm text-para-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FaArrowLeft />
          <span>Back to home</span>
        </Link>
      </div>

      {/* Header */}
      <div>
        <Heading level="h4" color="accent" align="left" weight="bold" className="mb-md">
          AI meets creativity.
        </Heading>
        <p className="text-gray-700 dark:text-gray-200 text-para-md mb-md">Login Your Account</p>
      </div>

      {/* General Error Message */}
      {errors.general && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      {/* Inputs */}
      <div className="space-y-sm">
        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter your email"
          icon={<FaEnvelope />}
          variant="filled"
          error={errors.email}
          className="bg-gray-900"
          disabled={loading}
        />

        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter your password"
            icon={<FaLock />}
            showPasswordToggle
            variant="filled"
            error={errors.password}
            className="bg-gray-900"
            disabled={loading}
          />
          <div className="text-right mt-xs">
            <Link
              to="/auth/reset-password"
              className="text-para-sm text-accent-default hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>

      {/* Submit with FormButton */}
      <FormButton
        size="md"
        fullWidth
        variant="solid"
        type="submit"
        isLoading={loading}
        onSubmit={handleLogin}
        disabled={loading}
      >
        Sign in
      </FormButton>

      {/* Social Buttons */}
      <div className="flex items-center gap-sm">
        <SimpleButton
          type="button"
          variant="outline"
          fullWidth
          className="flex items-center justify-center gap-2 mt-2"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <img src="/images/icons/google.svg" className="w-5" alt="google" />
          Sign in with Google
        </SimpleButton>
      </div>

      {/* Sign Up Redirect */}
      <p className="text-center text-gray-200 text-sm">
        Don't have an account?{' '}
        <Link to="/auth/signup" className="underline text-accent-default font-medium">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;