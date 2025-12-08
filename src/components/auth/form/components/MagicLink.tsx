import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/features/authentication/authSlice';

function parseJWT(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Failed to parse JWT', e);
    return {};
  }
}

const MagicLinkLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const queryParams = new URLSearchParams(location.search);
    const hashParams = new URLSearchParams(location.hash.substring(1));

    const designerId = queryParams.get('designer_id');
    const designerEmail = queryParams.get('designer_email');

    const access_token = hashParams.get('access_token');
    const refresh_token = hashParams.get('refresh_token');

    if (!access_token || !refresh_token) {
      console.error('Missing access_token or refresh_token in URL hash');
      navigate('/auth');
      return;
    }

    const decoded = parseJWT(access_token);
    const user_metadata = decoded?.user_metadata || {};

    dispatch(setAuth({
      access_token,
      refresh_token,
      login_time: new Date().toISOString(),
      user: {
        id: decoded.sub,
        email: decoded.email || user_metadata.email,
        name: user_metadata.full_name || user_metadata.name || 'Client',
        role: 'Client',
        designerId,
        designerEmail,
      }
    }));

    navigate('/dashboard/client');
  }, [dispatch, location, navigate]);

  return (
    <p className="text-text-primary dark:text-text-light para-md animate-pulse mt-4">
      Signing in with Magic Link...
    </p>
  );
};

export default MagicLinkLogin;
