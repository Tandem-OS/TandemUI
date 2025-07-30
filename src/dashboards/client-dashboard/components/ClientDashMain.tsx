import { Route, Routes } from "react-router-dom";
import ClientDashHome from "../pages/client-home/ClientDashHome";
import MyProject from "../pages/my-project/MyProject";
import Support from "../pages/support/Support";
import ProjectOverview from "../pages/project-overview/ProjectOverview";
import FinalTestimonial from "../pages/final-testimonial/FinalTestimonial";
import DesignerTestimonial from "../pages/desinger-testimonial/DesignerTestimonial";
import ScrollToTop from "../../../comman-components/ScrollToTop";
import Swiper from "../pages/swiper/Swiper";

const ClientDashMain = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<ClientDashHome />} />
                <Route path="/my-project" element={<MyProject />} />
                <Route path="/project-overview/:id" element={<ProjectOverview />} />
                <Route path="/support" element={<Support />} />
                <Route path="/final-testimonial" element={<FinalTestimonial />} />
                <Route path="/designer-testimonial" element={<DesignerTestimonial />} />
                <Route path="/swiper" element={<Swiper />} />
            </Routes>
        </>

    );
};

export default ClientDashMain;