import { useState } from 'react';
import { FaArrowLeft, FaEnvelope, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import SimpleButton from '../../demos/buttons/SimpleButton';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setError(null);
    console.log('Sending reset email to:', email);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          Reset Password
        </Heading>
        <p className="text-text-secondary text-para-md mb-md">
          Enter your email to reset your password
        </p>
      </div>

      <Input
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        icon={<FaEnvelope />}
        variant="filled"
        error={error || undefined}
        className="bg-background-primary"
      />

      <SimpleButton size="md" fullWidth type="submit" variant="solid">
        Send Reset Email
      </SimpleButton>

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
