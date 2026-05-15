import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';
import DesignerDashSidebar from './components/DesignerDashSidebar';
import DesignerDashTopbar from './components/DesignerDashTopbar';
import DesignerDashMain from './components/DesignerDashMain';
import Drawer from '../../common-components/Drawer';
import UpgradeSuccessModal from '@/common-components/UpgradeSuccessModal';
import { layoutTokens } from "@/design-system/tokens/layout";
import { BillingProvider } from './context/BillingContext';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { updatePlan } from '@/features/authentication/authSlice';

// ─── Upgrade param values ─────────────────────────────────────────────────────

type UpgradeParam = 'success' | 'cancelled' | null;

// ─── Cancelled toast ──────────────────────────────────────────────────────────

const CancelledToast: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-sm px-md py-sm rounded-lg bg-amber-50 border border-amber-200 text-amber-800 shadow-md text-para-sm w-[calc(100vw-2rem)] max-w-md"
    >
      <span className="flex-1">
        Upgrade cancelled. You are still on the free plan.
      </span>
      <button
        onClick={onDismiss}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-amber-100 transition-colors"
      >
        <RiCloseLine className="text-amber-700 text-icon-sm" />
      </button>
    </motion.div>
  </AnimatePresence>
);

// ─── Layout ───────────────────────────────────────────────────────────────────

const DesignerDashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchParams] = useSearchParams();
  const [upgradeState, setUpgradeState] = useState<UpgradeParam>(null);
  const [showCancelledToast, setShowCancelledToast] = useState(false);

  const userEmail = useSelector((state: RootState) => state.auth.user.email);
  const dispatch = useDispatch();

  // ── Read ?upgrade= on mount, then immediately clean the URL ──────────────
  useEffect(() => {
    const param = searchParams.get('upgrade') as UpgradeParam;

    if (param === 'success') {
      setUpgradeState('success');
      dispatch(updatePlan('pro')); // update Pro badge immediately
      window.history.replaceState({}, '', '/dashboard');
    } else if (param === 'cancelled') {
      setShowCancelledToast(true);
      window.history.replaceState({}, '', '/dashboard');
      // Auto-dismiss toast after 6 seconds
      const timer = setTimeout(() => setShowCancelledToast(false), 6000);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount only — searchParams intentionally excluded

  const handleSuccessClose = () => setUpgradeState(null);

  return (
    <BillingProvider>
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

        {/* ── Upgrade success modal ── */}
        <UpgradeSuccessModal
          isOpen={upgradeState === 'success'}
          onClose={handleSuccessClose}
          userEmail={userEmail ?? undefined}
        />

        {/* ── Upgrade cancelled toast ── */}
        {showCancelledToast && (
          <CancelledToast onDismiss={() => setShowCancelledToast(false)} />
        )}

      </div>
    </BillingProvider>
  );
};

export default DesignerDashboardLayout;
