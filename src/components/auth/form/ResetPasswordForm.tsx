import { useState } from 'react';
import { FaArrowLeft, FaEnvelope, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import FormButton from './components/FormButton';
// import { useAuth } from '../../../lib/providers/AuthProvider'; // Fixed import path
import { forgotPassword } from '../../../lib/requests/AuthRequest';

const ResetPasswordForm = () => {
  // const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await forgotPassword(email);
      // Check if response has expected structure
      if (response?.data?.message === 'Password reset email sent') {
        setSuccess(true);
      } else if (response?.data?.detail) {
        setError(response.data.detail); // Show backend error
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md bg-gray-800 rounded-2xl px-8 py-6 space-y-6 shadow-xl">
        <Link
          to="/auth"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <FaArrowLeft />
          <span>Back to login</span>
        </Link>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <Heading level="h4" color="accent" align="center" weight="bold">
            Check Your Email
          </Heading>

          <p className="text-gray-300">
            We've sent a password reset link to <span className="font-medium text-white">{email}</span>
          </p>

          <p className="text-sm text-gray-400">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
              className="text-accent-default hover:underline"
            >
              try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleResetPassword();
      }}
      className="w-full max-w-md bg-gray-800 rounded-2xl px-8 py-6 space-y-6 shadow-xl"
    >
      <Link
        to="/auth"
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
      >
        <FaArrowLeft />
        <span>Back to login</span>
      </Link>

      <div>
        <Heading level="h4" color="accent" align="left" weight="bold" className="mb-4">
          Reset Password
        </Heading>
        <p className="text-gray-200 text-sm">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Input
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');
        }}
        placeholder="Enter your email"
        icon={<FaEnvelope />}
        variant="filled"
        primaryColor="#4f46e5"
        error={error && !error.includes('Failed') ? error : undefined}
        className="bg-gray-900"
        disabled={loading}
      />

      <FormButton
        size="md"
        fullWidth
        variant="solid"
        type="submit"
        isLoading={loading}
        disabled={loading}
      >
        Send Reset Link
      </FormButton>
    </form>
  );
};

export default ResetPasswordForm;