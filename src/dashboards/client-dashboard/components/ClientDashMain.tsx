import { Route, Routes } from "react-router-dom";
import ClientDashHome from "../pages/client-home/ClientDashHome";
import MyProject from "../pages/my-project/MyProject";
import Support from "../pages/support/Support";
import ProjectOverview from "../pages/project-overview/ProjectOverview";
import FinalTestimonial from "../pages/final-testimonial/FinalTestimonial";
import DesignerTestimonial from "../pages/designer-testimonial/DesignerTestimonial";
import ScrollToTop from "@/common-components/ScrollToTop";
import Swiper from "../pages/swiper/Swiper";
import IntakeForm from "@/components/intake-form/IntakeForm";
import OnboardingForm from "@/components/intake-form/OnboardingForm";
import OnboardComplete from "@/components/onboard-completed/OnboardComplete";
import ScraperIntelligencePage from "@/pages/scraper/ScraperIntelligencePage";
import ComposePage from "../pages/compose/ComposePage";


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
                <Route path="/scraper" element={<ScraperIntelligencePage />} />
                <Route path="/designer-testimonial" element={<DesignerTestimonial />} />
                <Route path="/intake" element={<IntakeForm />} />
                <Route path="/onboard" element={<OnboardingForm />} />
                <Route path="/onboard/onboard-compelete" element={<OnboardComplete />} />
                <Route path="/swiper" element={<Swiper />} />
                <Route path="/compose/:composition_id" element={<ComposePage />} />
            </Routes>
        </>

    );
};

export default ClientDashMain;