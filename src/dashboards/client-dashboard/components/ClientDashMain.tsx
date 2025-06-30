import { Route, Routes } from "react-router-dom";
import ClientDashHome from "../pages/client-home/ClientDashHome";

const ClientDashMain = () => {
    return (
        <Routes>
            <Route path="/" element={<ClientDashHome />} />
            {/* Add more routes as needed */}
            <Route path="/intake" element={<div className="p-xl text-center">Intake Form Page</div>} />
            <Route path="/preferences" element={<div className="p-xl text-center">Preferences Page</div>} />
            <Route path="/feedback" element={<div className="p-xl text-center">Feedback Page</div>} />
            <Route path="/approval" element={<div className="p-xl text-center">Design Approval Page</div>} />
            <Route path="/design-swiper" element={<div className="p-xl text-center">Design Swiper Page</div>} />
        </Routes>
    );
};

export default ClientDashMain;