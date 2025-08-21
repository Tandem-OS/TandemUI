import { useEffect, useState } from 'react';
import { callMagicLinkVerification } from '@/lib/requests/AuthRequest';
import { store } from '@/store';
import { clearProjectId } from '@/features/project/projectSlice';

const MagicLinkSecurePage = () => {
  const [message, setMessage] = useState<string>('Signing in with Magic Link...');
  const [error, setError] = useState<string | null>(null);

  const fetchSecure = async () => {
    try {
       const response = await callMagicLinkVerification()
      setMessage(response.data.message);
      store.dispatch(clearProjectId());
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to authenticate.');
      store.dispatch(clearProjectId());
    }
  };

  useEffect(() => {
    fetchSecure();
  }, []);

  if (error) {
    return (
      <p className="text-red-500 para-md mt-4">
        {error}
      </p>
    );
  }

  return (
    <p className="text-text-primary dark:text-text-light para-md animate-pulse mt-4">
      {message}
    </p>
  );
};

export default MagicLinkSecurePage;
