import ClientDashMain from "./components/ClientDashMain";
import Header from "./components/Header";

const ClientDashboardLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Header />
            <div>
                <ClientDashMain />
            </div>
        </div>
    );
};

export default ClientDashboardLayout;