import { useState } from 'react';
import Input from './components/Input';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import FormButton from './components/FormButton';
import SimpleButton from '../../demos/buttons/SimpleButton';
import Heading from '../../demos/typography/Heading';

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
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Logged in!', values);
      navigate("/onboard");
    } catch (err) {
      console.error(err);
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
        <Heading level="h4" color="accent" align="left" weight="bold" className="mb-md">
          AI meets creativity.
        </Heading>
        <p className="text-text-secondary text-para-sm mb-md">Login Your Account</p>
      </div>

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
      >
        Sign in
      </FormButton>

      <div className="flex items-center gap-sm">
        <SimpleButton
          type="button"
          variant="outline"
          fullWidth
          className="flex items-center justify-center gap-sm mt-sm"
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
