import React, { useState } from 'react';
import DesignerDashSidebar from './components/DesignerDashSidebar';
import DesignerDashTopbar from './components/DesignerDashTopbar';
import DesignerDashMain from './components/DesignerDashMain';
import Drawer from '../../comman-components/Drawer';

const DesignerDashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DesignerDashSidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
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
        <DesignerDashTopbar 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        {/* Main Content */}
        <DesignerDashMain />
      </div>
    </div>
  );
};

export default DesignerDashboardLayout;