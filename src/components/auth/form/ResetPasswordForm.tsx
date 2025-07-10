import { useState } from 'react';
import { FaArrowLeft, FaEnvelope, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import FormButton from './components/FormButton';
// import { useAuth } from '../../../lib/providers/AuthProvider'; // Fixed import path
import { forgotPassword } from '../../../lib/requests/AuthRequest';
import SimpleButton from '../../demos/buttons/SimpleButton';

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
      <div className="w-full max-w-md bg-background-primary rounded-2xl px-xl py-lg space-y-md lg:space-y-lg shadow-xl border border-border-default">
        <Link
          to="/auth"
          className="flex items-center gap-sm text-para-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <FaArrowLeft />
          <span>Back to login</span>
        </Link>

        <div className="text-center space-y-lg">
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
      className="w-full max-w-md bg-background-primary rounded-2xl px-xl py-lg space-y-md lg:space-y-lg shadow-xl border border-border-default"
    >
      <Link
        to="/auth"
        className="flex items-center gap-sm text-para-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <FaArrowLeft />
        <span>Back to login</span>
      </Link>

      <div>
        <Heading level="h4" color="accent" weight="bold" className="mb-4">
          Reset Password
        </Heading>
        <p className="text-text-secondary text-para-sm mb-md">
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
        error={error && !error.includes('Failed') ? error : undefined}
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

      <div className="flex items-center gap-md text-text-tertiary text-para-sm py-md">
        <div className="flex-1 h-px bg-border-muted" />
        <span className="text-para-xs uppercase">or</span>
        <div className="flex-1 h-px bg-border-muted" />
      </div>

      <SimpleButton
        type="button"
        variant="outline"
        fullWidth
        className="flex items-center justify-center gap-sm text-text-primary bg-background-muted"
      >
        <FaUser className="text-para-lg" />
        Continue as Guest
      </SimpleButton>

      <p className="text-center text-accent-default hover:text-accent-hover font-medium text-para-sm">
        <Link to="/auth" className="hover:underline transition-colors">
          Back to Sign In
        </Link>
      </p>
    </form>
  );
};

export default ResetPasswordForm;
