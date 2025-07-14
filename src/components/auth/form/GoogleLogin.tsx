import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { exchangeCodeForTokens } from '../../../lib/requests/AuthRequest';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../features/authentication/authSlice';


const GoogleLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const hasFetched = useRef(false);

    const handleLogin = async (code: string) => {
        try {
            const data = await exchangeCodeForTokens(code);
            if (data.access_token && data.refresh_token) {
                dispatch(setAuth({
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    login_time: data.login_time,
                    user: {
                        id: data.user.id,
                        email: data.user.email,
                    }
                }));

                navigate('/dashboard/designer');
            } else {
                throw new Error("Token exchange failed");
            }
        } catch (err) {
            console.error("Google login failed:", err);
            navigate('/auth');
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');

        if (!code) {
            console.error("No code found in URL");
            navigate('/auth');
            return;
        }

        setTimeout(() => {
            handleLogin(code);
        }, 3000);

    }, [location, navigate]);

    return <p>Signing in with Google...</p>;
};

export default GoogleLogin;
