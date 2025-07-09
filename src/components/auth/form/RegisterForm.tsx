import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import { FaEnvelope, FaLock, FaUser, FaArrowLeft } from 'react-icons/fa';
import FormButton from './components/FormButton';
import SimpleButton from '../../demos/buttons/SimpleButton';
// import { useAuth } from '../../../lib/providers/AuthProvider'; // Fixed import path
import { getGoogleOAuthURL, signUp } from '../../../lib/requests/AuthRequest';

const RegisterForm = () => {
  const navigate = useNavigate();
  // const { signInWithGoogle } = useAuth();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '', general: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Name validation
    if (!values.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (values.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!values.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSignup = async () => {
    setErrors({});
    setSuccessMessage('');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await signUp(values);
      if (response.data.success) {
        setSuccessMessage('Account created! Please check your email to verify your account.');
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const response = await getGoogleOAuthURL();

      const redirectUrl = response?.data?.url;

      if (redirectUrl) {
        setSuccessMessage('Account created! Please Login to your account.');
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
      } else {
        throw new Error('OAuth URL missing in response');
      }
    } catch (err) {
      console.error('Google signup error:', err);
      setErrors({ general: 'Failed to sign up with Google' });
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSignup();
      }}
      className="w-full max-w-md bg-background-primary rounded-2xl px-xl py-lg space-y-md lg:space-y-lg shadow-xl border border-border-default xl:mb-lg"
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
          Join Tandem
        </Heading>
        <p className="text-text-secondary text-para-md mb-md">
          Create Your Account
        </p>
      </div>

      {successMessage && (
        <div className="px-4 py-3 rounded-lg text-sm bg-green-500/10 border border-green-500/50 text-green-400">
          {successMessage}
        </div>
      )}

      {/* Success/Error Message */}
      {errors.general && (
        <div className={`px-4 py-3 rounded-lg text-sm ${errors.general.includes('Account created')
          ? 'bg-green-500/10 border border-green-500/50 text-green-400'
          : 'bg-red-500/10 border border-red-500/50 text-red-400'
          }`}>
          {errors.general}
        </div>
      )}

      {/* Inputs */}
      <div className="space-y-3">
        <Input
          label="Full Name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          icon={<FaUser />}
          variant="filled"
          error={errors.name}
        />

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

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          icon={<FaLock />}
          showPasswordToggle
          variant="filled"
          error={errors.confirmPassword}
        />
      </div>

      <FormButton
        size="md"
        fullWidth
        variant="solid"
        type="submit"
        isLoading={loading}
      >
        Sign up
      </FormButton>

      {/* Social Buttons */}
      <div className="flex items-center gap-3">
        <SimpleButton
          type="button"
          variant="outline"
          fullWidth
          className="flex items-center justify-center gap-2 mt-2"
          onClick={handleGoogleSignup}
          disabled={loading}
        >
          <img src="/images/icons/google.svg" className="w-5" alt="google" />
          Sign up with Google
        </SimpleButton>
      </div>

      <p className="text-center text-text-secondary text-para-sm">
        Already have an account?{' '}
        <Link
          to="/auth/"
          className="underline text-accent-default hover:text-accent-hover font-medium transition-colors"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
