import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./lib/providers/AuthProvider";
import SessionManager from "./components/auth/form/SessionManager";
import { getLogoutChannel } from './utils/logoutChannel.tsx';
import { logout } from './features/authentication/authSlice.tsx';
import { store } from "./store.tsx";

const App = () => {

  useEffect(() => {
    const channel = getLogoutChannel();

    channel.onmessage = (e) => {
      if (e.data === "LOGOUT") {
        console.log('[BroadcastChannel] Received logout signal. Logging out...');
        store.dispatch(logout());
      }
    };

    return;
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <SessionManager />
          <Layout />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );;
};

export default App;
