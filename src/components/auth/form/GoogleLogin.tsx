import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { exchangeCodeForTokens } from '../../../lib/requests/AuthRequest';

const GoogleLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const hasFetched = useRef(false);

    const handleLogin = async (code: string) => {
        try {
            const data = await exchangeCodeForTokens(code);
            if (data.access_token && data.refresh_token) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                localStorage.setItem('login_time', Date.now().toString());
                navigate('/dashboard');
            } else {
                throw new Error("Token exchange failed");
            }
        } catch (err) {
            console.error("Google login failed:", err);
            navigate('/login');
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');

        if (!code) {
            console.error("No code found in URL");
            navigate('/login');
            return;
        }

        setTimeout(() => {
            handleLogin(code);
        }, 3000);

    }, [location, navigate]);

    return <p>Signing in with Google...</p>;
};

export default GoogleLogin;
