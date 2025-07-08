import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./lib/providers/AuthProvider"; // Adjust the import path as needed
import Layout from "./Layout";
import SessionManager from "./components/auth/form/SessionManager";

const App = () => {
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