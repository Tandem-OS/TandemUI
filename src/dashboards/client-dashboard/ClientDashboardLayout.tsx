import ClientDashMain from "./components/ClientDashMain";
import Header from "./components/Header";

const ClientDashboardLayout = () => {
    return (
        <div className="min-h-screen bg-background-secondary">
            <Header />
            <div>
                <ClientDashMain />
            </div>
        </div>
    );
};

export default ClientDashboardLayout;