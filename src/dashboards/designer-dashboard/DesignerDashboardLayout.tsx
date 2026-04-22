import React, { useState } from 'react';
import DesignerDashSidebar from './components/DesignerDashSidebar';
import DesignerDashTopbar from './components/DesignerDashTopbar';
import DesignerDashMain from './components/DesignerDashMain';
import Drawer from '../../common-components/Drawer';
import { layoutTokens } from "@/design-system/tokens/layout";

const DesignerDashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={layoutTokens.designerDashboard.root}>
      {/* Desktop Sidebar */}
      <div className={layoutTokens.designerDashboard.sidebar}>
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
        width={layoutTokens.designerDashboard.drawerWidth}
      >
        <DesignerDashSidebar onNavigate={() => setIsMobileMenuOpen(false)} />
      </Drawer>
      
      {/* Main Content Area */}
      <div className={layoutTokens.designerDashboard.content}>
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