import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./lib/providers/AuthProvider"; // Adjust the import path as needed
import Layout from "./Layout";
import SessionManager from "./components/auth/form/SessionManager";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAutoLogout = () => {
      const loginTime = localStorage.getItem('login_time');
      if (!loginTime) return;

      const loginDate = new Date(loginTime);
      const now = new Date();
      const diffInMs = now.getTime() - loginDate.getTime();
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

      if (diffInMs >= sevenDaysInMs) {
        console.log('Auto-logout: 7 days session expired');

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('login_time');

        navigate('/login'); // redirect to login
      }
    };

    checkAutoLogout();
  }, [navigate]);
  return (
    <BrowserRouter>
      <AuthProvider>
        <SessionManager />
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;