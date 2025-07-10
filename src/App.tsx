import { BrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./lib/providers/AuthProvider";
import SessionManager from "./components/auth/form/SessionManager";

const App = () => {
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
