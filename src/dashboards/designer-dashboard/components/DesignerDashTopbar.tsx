import React from 'react';
import {
    RiArrowDownSLine,
    RiUserLine,
    RiMenuLine,
    RiSettings3Line,
    RiLogoutBoxLine,
    RiUser3Line,
    RiMenuUnfoldLine,
    RiMenuFoldLine
} from 'react-icons/ri';
import Dropdown from '../../../comman-components/Dropdown';
import ThemeToggle from '../../../components/theme-toggle/ThemeToggle';
import { handleLogout } from '../../../lib/requests/AuthRequest';

interface DesignerDashTopbarProps {
    onMenuClick: () => void;
    isSidebarCollapsed?: boolean;
    onToggleSidebar?: () => void;
}

const logout = async () => {
    await handleLogout();
}

const DesignerDashTopbar: React.FC<DesignerDashTopbarProps> = ({
    onMenuClick,
    isSidebarCollapsed,
    onToggleSidebar
}) => {

    const userMenuItems = [
        {
            id: 'profile',
            label: 'My Profile',
            icon: <RiUser3Line />,
            onClick: () => console.log('Profile clicked')
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: <RiSettings3Line />,
            onClick: () => console.log('Settings clicked')
        },
        {
            id: 'logout',
            label: 'Logout',
            icon: <RiLogoutBoxLine />,
            onClick: () => logout(),
            divider: true
        }
    ];

    return (
        <header className="bg-background-primary-2 border-b border-border-default px-md lg:pr-xl lg:pl-md py-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-md">
                    {/* Desktop Sidebar Toggle - only show when collapsed */}
                    <button
                        onClick={onToggleSidebar}
                        className="hidden lg:block p-sm rounded-lg hover:bg-background-muted transition-colors"
                    >
                        {
                            isSidebarCollapsed ?
                                <RiMenuUnfoldLine className="text-h4-sm text-text-secondary" />
                                :
                                <RiMenuFoldLine className="text-h4-sm text-text-secondary" />
                        }
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-sm rounded-lg hover:bg-background-muted transition-colors"
                    >
                        <RiMenuLine className="text-h4-sm text-text-secondary" />
                    </button>
                </div>

                <div className="flex items-center gap-sm lg:gap-md">
                    {/* Theme Toggle */}

                    <ThemeToggle />

                    {/* User Dropdown */}
                    <Dropdown
                        trigger={
                            <div className="flex items-center gap-sm cursor-pointer hover:bg-background-muted rounded-lg px-sm py-xs transition-colors">
                                {/* Circular Avatar Image */}
                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-border-default shadow-sm">
                                    <img
                                        src="/images/avatar.png"
                                        alt="Profile Avatar"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback to icon if image fails to load
                                            const target = e.currentTarget as HTMLImageElement;
                                            target.style.display = 'none';
                                            const fallbackDiv = target.nextElementSibling as HTMLElement;
                                            if (fallbackDiv) {
                                                fallbackDiv.style.display = 'flex';
                                            }
                                        }}
                                    />
                                    {/* Fallback icon if image doesn't load */}
                                    <div className="w-full h-full bg-background-muted rounded-full flex items-center justify-center" style={{ display: 'none' }}>
                                        <RiUserLine className="text-h6-sm lg:text-h5-sm text-text-secondary" />
                                    </div>
                                </div>
                                <span className="hidden lg:block text-para-sm font-medium text-text-primary">
                                    Schongham
                                </span>
                                <RiArrowDownSLine className="text-h5-sm text-text-tertiary" />
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