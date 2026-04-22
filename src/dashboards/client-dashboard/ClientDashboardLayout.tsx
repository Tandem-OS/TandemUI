import ClientDashMain from "./components/ClientDashMain";
import Header from "./components/Header";
import { layoutTokens } from "@/design-system/tokens/layout";

const ClientDashboardLayout = () => {
    return (
        <div className={layoutTokens.clientDashboard.root}>
            <Header />
            <div className={layoutTokens.clientDashboard.content}>
                <ClientDashMain />
            </div>
        </div>
    );
};

export default ClientDashboardLayout;