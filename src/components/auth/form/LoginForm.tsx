import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import FormButton from './components/FormButton';
import SimpleButton from '../../demos/buttons/SimpleButton';
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
        const { access_token, refresh_token, login_time, user } = response.data;
        localStorage.setItem('access_token', user.id);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('login_time', login_time);
        localStorage.setItem('user_email', user.email);
        localStorage.setItem('id', user.id);
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
      className="w-full max-w-md bg-background-primary rounded-2xl px-xl py-lg space-y-md lg:space-y-lg shadow-xl border border-border-default"
    >
      <div className="flex justify-end leading-none">
        <Link
          to="/"
          className="flex items-center gap-sm text-para-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <FaArrowLeft />
          <span>Back to home</span>
        </Link>
      </div>

      <div>
        <Heading level="h4" color="accent" weight="bold" className="mb-md">
          AI meets creativity.
        </Heading>
        <p className="text-text-secondary text-para-sm mb-md">Login Your Account</p>
      </div>

      {/* General Error Message */}
      {errors.general && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      {/* General Error Message */}
      {errors.general && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

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
          />
          <div className="text-right mt-xs">
            <Link
              to="/auth/reset-password"
              className="text-para-sm text-accent-default hover:text-accent-hover hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>

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

      <p className="text-center text-text-secondary text-para-sm">
        Don't have an account?{' '}
        <Link
          to="/auth/signup"
          className="underline text-accent-default hover:text-accent-hover font-medium transition-colors"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
