import { useState } from 'react';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import SimpleButton from '../../demos/buttons/SimpleButton';
import { forgotPassword } from '../../../api/auth';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await forgotPassword(email);
      if (res?.message?.includes("sent")) {
        setSent(true);
        // Optional: Navigate to a confirmation screen or just show message
        setTimeout(() => navigate('/auth/reset-password'), 2000);
      } else {
        setError('Failed to send reset email. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-gray-800 rounded-2xl px-8 py-6 space-y-6 shadow-xl"
    >
      <Heading level="h4" color="accent" align="left" weight="bold" className="mb-4">
        Reset Password
      </Heading>

      {sent ? (
        <p className="text-green-400 text-sm">
          ✅ Reset link sent! Check your email and follow the instructions.
        </p>
      ) : (
        <>
          <p className="text-gray-200 text-sm">
            Enter your email to receive a reset link.
          </p>

          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            icon={<FaEnvelope />}
            variant="filled"
            primaryColor="#4f46e5"
            error={error || undefined}
            className="bg-gray-900"
          />

          <SimpleButton
            size="md"
            fullWidth
            type="submit"
            variant="solid"
            isLoading={loading}
          >
            Send Reset Email
          </SimpleButton>

          <div className="flex items-center gap-4 text-gray-400 text-sm py-4">
            <div className="flex-1 h-px bg-gray-600" />
            <span className="text-xs uppercase">or</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>

          <SimpleButton
            type="button"
            variant="outline"
            fullWidth
            className="flex items-center justify-center gap-2 text-white bg-gray-700 hover:bg-gray-600"
          >
            <FaUser className="text-lg" />
            Continue as Guest
          </SimpleButton>

          <p className="text-center text-accent-default font-medium text-sm">
            <Link to="/auth" className="hover:underline">
              Back to Sign In
            </Link>
          </p>
        </>
      )}
    </form>
  );
};

export default ResetPasswordForm;
