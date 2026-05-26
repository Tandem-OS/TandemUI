
// ─── Designer Dashboard Topbar — Redesign ────────────────────────────────────


import React from 'react';
import {
  RiMenuLine,
  RiLogoutBoxLine,
  RiUser3Line,
  RiNotification3Line,
  RiSearchLine,
} from 'react-icons/ri';
import Dropdown from '../../../common-components/Dropdown';
import ThemeToggle from '../../../components/theme-toggle/ThemeToggle';
import { handleLogout } from '../../../lib/requests/AuthRequest';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

// ─── Copy ─────────────────────────────────────────────────────────────────────

const COPY = {
  search: {
    placeholder:  'Search projects, clients, sections...',
    shortcut:     '⌘K',
    ariaLabel:    'Search',
  },
  notifications: {
    ariaLabel:    'Notifications',
  },
  menu: {
    profileId:    'profile',
    profileLabel: 'My Profile',
    logoutId:     'logout',
    logoutLabel:  'Logout',
    // TODO: . — restore Settings when profile-settings route is wired
    // settingsId:    'settings',
    // settingsLabel: 'Settings',
  },
  avatar: {
    ariaLabel:      'Profile',
    menuAriaLabel:  'Open menu',
    unknownInitial: '?',
  },
  mobile: {
    menuAriaLabel: 'Open sidebar',
  },
} as const;

// ─── Routes ───────────────────────────────────────────────────────────────────

const ROUTES = {
  auth:        '/auth',
  profileView: '/dashboard/designer/profile-view',
  // TODO: . — replace profileView with profileSettings when route is wired
} as const;

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const BRAND = {
  // --accent-default: 77 67 228 ✓
  purple:      'rgb(var(--accent-default))',
  // accent-default at 12% opacity — no alpha token in theme.css yet
  avatarAlpha: 'rgba(var(--accent-default) / 0.12)',
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface DesignerDashTopbarProps {
  onMenuClick: () => void;
  // TODO: . — wire when search endpoint available
  onSearch?: (query: string) => void;
  // TODO: . — wire when notifications endpoint available
  onNotificationsClick?: () => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const DesignerDashTopbar: React.FC<DesignerDashTopbarProps> = ({
  onMenuClick,
  onSearch,
  onNotificationsClick,
}) => {
  const navigate = useNavigate();

  const name = useSelector((state: RootState) => state.auth.user.name);
  const role = useSelector((state: RootState) => state.auth.user.role);
  // TODO: . — add company when available in auth.user
  // const company = useSelector((state: RootState) => state.auth.user.company);

  const initial = (name?.[0] ?? COPY.avatar.unknownInitial).toUpperCase();

  const logout = async () => {
    const result = await handleLogout();
    if (result?.data.success) {
      navigate(ROUTES.auth);
    }
  };

  const handleProfile = () => {
    navigate(ROUTES.profileView);
  };

  const userMenuItems = [
    {
      id: COPY.menu.profileId,
      label: COPY.menu.profileLabel,
      icon: <RiUser3Line />,
      onClick: handleProfile,
    },
    // TODO: . — restore when profile-settings route is wired:
    // { id: COPY.menu.settingsId, label: COPY.menu.settingsLabel, icon: <RiSettings3Line />, onClick: () => navigate(ROUTES.profileSettings) },
    {
      id: COPY.menu.logoutId,
      label: COPY.menu.logoutLabel,
      icon: <RiLogoutBoxLine />,
      onClick: logout,
      divider: true,
    },
  ];

  return (
    <header className="bg-background-secondary-2 border-b border-border-default px-md lg:pr-xl lg:pl-md py-sm">
      <div className="flex items-center justify-between gap-md">

        {/* Mobile — sidebar toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-sm rounded-lg hover:bg-background-muted transition-colors flex-shrink-0"
          aria-label={COPY.mobile.menuAriaLabel}
        >
          <RiMenuLine className="text-h4-sm text-text-secondary" />
        </button>

        {/* Centre — search bar */}
        {/* TODO: . — wire onSearch handler when search endpoint is available */}
        <div className="hidden lg:flex flex-1 max-w-[420px]">
          <div className="relative w-full">
            <RiSearchLine className="absolute left-md top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4 pointer-events-none" />
            <input
              type="text"
              placeholder={COPY.search.placeholder}
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full pl-[2.25rem] pr-[3rem] py-sm text-para-sm text-text-primary placeholder:text-text-secondary bg-background-primary-2 border border-border-default rounded-full focus:outline-none focus:border-accent-default transition-colors"
            />
            <span className="absolute right-md top-1/2 -translate-y-1/2 text-[11px] font-medium text-text-secondary bg-background-muted px-xs py-[2px] rounded-md pointer-events-none">
              {COPY.search.shortcut}
            </span>
          </div>
        </div>

        {/* Right — notifications + theme + user */}
        <div className="flex items-center gap-sm lg:gap-md flex-shrink-0">

          {/* Notifications bell */}
          {/* TODO: . — wire onNotificationsClick when notifications endpoint is available */}
          <button
            onClick={onNotificationsClick}
            className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border border-border-default bg-background-primary-2 flex items-center justify-center text-text-secondary hover:bg-background-muted transition-colors"
            aria-label={COPY.notifications.ariaLabel}
          >
            <RiNotification3Line className="w-4 h-4" />
          </button>

          {/* Theme toggle */}
          <div className="w-8 h-8 lg:w-9 lg:h-9 bg-background-primary-2 rounded-full flex items-center justify-center border border-border-default">
            <ThemeToggle />
          </div>

          {/* User dropdown */}
          <Dropdown
            trigger={
              <div className="flex items-center gap-sm cursor-pointer hover:bg-background-muted rounded-lg px-sm py-xs transition-colors">
                {/* Name + role — desktop only */}
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-para-sm font-semibold text-text-primary leading-tight">
                    {name}
                  </span>
                  {role && (
                    <span className="text-[11px] text-text-secondary leading-tight capitalize">
                      {role}
                      {/* TODO: . — append · {company} when available in auth.user */}
                    </span>
                  )}
                </div>
                {/* Avatar circle */}
                <div
                  className="w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center flex-shrink-0 text-para-sm font-bold border border-border-default"
                  style={{ background: BRAND.avatarAlpha, color: BRAND.purple }}
                  aria-label={COPY.avatar.ariaLabel}
                >
                  {initial}
                </div>
              </div>
            }
            items={userMenuItems}
          />
        </div>

      </div>
    </header>
  );
};

export default DesignerDashTopbar;
