import { useState } from 'react';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import FormButton from './components/FormButton'; // <-- your new FormButton
import SimpleButton from '../../demos/buttons/SimpleButton';

import { login } from '../../../api/auth';

const LoginForm = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogin = async () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!values.email.trim()) newErrors.email = 'Email is required';
    if (!values.password.trim()) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await login(values.email, values.password);

      if (res?.access_token) {
        localStorage.setItem('token', res.access_token);
        navigate('/dashboard'); // Redirect to dashboard or home page after successful login;
      } else {
        setErrors({ password: 'Invalid email or password' });
      }

    } catch (err) {
      console.error(err);
      setErrors({ password: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleLogin();
      }}
      
      className="w-full max-w-md bg-gray-800 rounded-2xl px-8 py-6 space-y-6 shadow-xl"
      
    >
      {/* Back to Home */}
      <Link
        to="/"
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
      >
        <FaArrowLeft />
        <span>Back to home</span>
      </Link>

      {/* Header */}
      <div>
        <Heading
          level="h4"
          color="accent"
          align="left"
          weight="bold"
          className="mb-4"
        >
          Welcome To Tandem
        </Heading>
        <p className="text-gray-200 text-sm">Login Your Account</p>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter your email"
          icon={<FaEnvelope />}
          variant="filled"
          primaryColor="#4f46e5"
          error={errors.email}
          className="bg-gray-900"
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
            primaryColor="#4f46e5"
            error={errors.password}
            className="bg-gray-900"
          />
          <div className="text-right mt-0.5">
            <Link to="/auth/forgot-password" className="text-sm text-accent-default"> 
            Forgot your password?
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
      >
        Sign in
      </FormButton>

      {/* Social Buttons */}
      <div className="flex items-center gap-3">
        <SimpleButton
          type="button"
          variant="outline"
          fullWidth
          className="flex items-center justify-center gap-2 mt-2"
        >
          <img src="/images/icons/google.svg" className="w-5" alt="google" />
          Sign in with Google
        </SimpleButton>
      </div>

      {/* Sign Up Redirect */}
      <p className="text-center text-gray-200 text-sm">
        Don’t have an account?{' '}
        <Link to="/auth/signup" className="underline text-accent-default font-medium">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
