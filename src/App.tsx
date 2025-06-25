import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./lib/providers/AuthProvider"; // Adjust the import path as needed
import Layout from "./Layout";

const App = () => {
  return (
    <BrowserRouter> 
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;