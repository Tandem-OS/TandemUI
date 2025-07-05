import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import { FaEnvelope, FaLock, FaUser, FaArrowLeft } from 'react-icons/fa';
import FormButton from './components/FormButton';
import SimpleButton from '../../demos/buttons/SimpleButton';
import { useAuth } from '../../../lib/providers/AuthProvider'; // Fixed import path
import { signUp } from '../../../lib/requests/AuthRequest';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

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
      const { error } = await signInWithGoogle();
      if (error) {
        setErrors({ general: error.message || 'Failed to sign up with Google' });
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
          Create Your Account
        </Heading>
        <p className="text-gray-200 text-sm">Join Tandem today</p>
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
          primaryColor="#4f46e5"
          error={errors.name}
          className="bg-gray-900"
          disabled={loading}
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
          primaryColor="#4f46e5"
          error={errors.email}
          className="bg-gray-900"
          disabled={loading}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Create a password"
          icon={<FaLock />}
          showPasswordToggle
          variant="filled"
          primaryColor="#4f46e5"
          error={errors.password}
          className="bg-gray-900"
          disabled={loading}
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
          primaryColor="#4f46e5"
          error={errors.confirmPassword}
          className="bg-gray-900"
          disabled={loading}
        />
      </div>

      {/* Submit Button */}
      <FormButton
        size="md"
        fullWidth
        variant="solid"
        type="submit"
        isLoading={loading}
        disabled={loading}
      >
        Create Account
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

      {/* Sign In Redirect */}
      <p className="text-center text-gray-200 text-sm">
        Already have an account?{' '}
        <Link to="/auth" className="underline text-accent-default font-medium">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;