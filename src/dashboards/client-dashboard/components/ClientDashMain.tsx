import { Route, Routes } from "react-router-dom";
import ClientDashHome from "../pages/client-home/ClientDashHome";
import MyProject from "../pages/my-project/MyProject";
import Support from "../pages/support/Support";

const ClientDashMain = () => {
    return (
        <Routes>
            <Route path="/" element={<ClientDashHome />} />
            <Route path="/my-project" element={<MyProject />} />
            <Route path="/support" element={<Support />} />
        </Routes>
    );
};

export default ClientDashMain;