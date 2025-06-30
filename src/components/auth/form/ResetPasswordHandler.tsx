import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from './components/Input';
import Heading from '../../demos/typography/Heading';
import SimpleButton from '../../demos/buttons/SimpleButton';
import { resetPassword, getUserInfo } from '../../../api/auth';

const ResetPasswordHandler = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get token from hash or query string
  const hashParams = new URLSearchParams(location.hash.slice(1)); // removes '#'
  const queryParams = new URLSearchParams(location.search);
  const token = hashParams.get('access_token') || queryParams.get('token');

  useEffect(() => {
    const fetchEmail = async () => {
      if (token) {
        try {
          const userInfo = await getUserInfo(token);
          setEmail(userInfo?.email || '');
        } catch (err) {
          setError("Invalid or expired token.");
        }
      } else {
        setError("Missing token in URL.");
      }
    };
    fetchEmail();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await resetPassword(newPassword, token);
      if (res?.success) {
        setSuccess(true);
        setTimeout(() => navigate("/auth"), 3000);
      } else {
        setError("Reset failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-gray-800 rounded-2xl px-8 py-6 space-y-6 shadow-xl"
    >
      <Heading level="h4" color="accent" align="left" weight="bold" className="mb-4">
        Set New Password
      </Heading>

      {success ? (
        <p className="text-green-400">✅ Password updated successfully! Redirecting...</p>
      ) : (
        <>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Input
            label="Email"
            value={email}
            disabled
            type="email"
            name="email"
            className="bg-gray-900"
            variant="filled"
          />

          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="bg-gray-900"
            variant="filled"
            primaryColor="#4f46e5"
          />

          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
            className="bg-gray-900"
            variant="filled"
            primaryColor="#4f46e5"
          />

          <SimpleButton type="submit" variant="solid" fullWidth>
            Update Password
          </SimpleButton>
        </>
      )}
    </form>
  );
};

export default ResetPasswordHandler;
