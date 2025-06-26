// src/dashboards/designer-dashboard/DesignerDashboardLayout.tsx
import React, { useState } from 'react';
import DesignerDashSidebar from './components/DesignerDashSidebar';
import DesignerDashTopbar from './components/DesignerDashTopbar';
import DesignerDashMain from './components/DesignerDashMain';
import Drawer from '../../comman-components/Drawer';

const DesignerDashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DesignerDashSidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        position="left"
        width="w-64"
      >
        <DesignerDashSidebar onNavigate={() => setIsMobileMenuOpen(false)} />
      </Drawer>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <DesignerDashTopbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        
        {/* Main Content */}
        <DesignerDashMain />
      </div>
    </div>
  );
};

export default DesignerDashboardLayout;