import React from 'react';
import {
    RiArrowDownSLine,
    RiUserLine,
    RiMenuLine,
    RiSunLine,
    RiMoonLine,
    RiSettings3Line,
    RiLogoutBoxLine,
    RiUser3Line,
    RiMenuUnfoldLine,
    RiMenuFoldLine
} from 'react-icons/ri';
import { useTheme } from '../../../contexts/ThemeContext';
import Dropdown from '../../../comman-components/Dropdown';

interface DesignerDashTopbarProps {
    onMenuClick: () => void;
    isSidebarCollapsed?: boolean;
    onToggleSidebar?: () => void;
}

const DesignerDashTopbar: React.FC<DesignerDashTopbarProps> = ({
    onMenuClick,
    isSidebarCollapsed,
    onToggleSidebar
}) => {
    const { theme, toggleTheme } = useTheme();

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
            onClick: () => console.log('Logout clicked'),
            divider: true
        }
    ];

    return (
        <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 px-md lg:pr-xl lg:pl-md py-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-md">
                    {/* Desktop Sidebar Toggle - only show when collapsed */}

                    <button
                        onClick={onToggleSidebar}
                        className="hidden lg:block p-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        {
                            isSidebarCollapsed ?
                                <RiMenuUnfoldLine className="text-h4-sm text-slate-700 dark:text-slate-200" />

                                :
                                <RiMenuFoldLine className="text-h4-sm text-slate-700 dark:text-slate-200" />

                        }
                    </button>


                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        <RiMenuLine className="text-h4-sm text-slate-700 dark:text-slate-200" />
                    </button>
                </div>

                <div className="flex items-center gap-sm lg:gap-md">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        {theme === 'light' ? (
                            <RiMoonLine className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                        ) : (
                            <RiSunLine className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                        )}
                    </button>

                    {/* User Dropdown */}
                    <Dropdown
                        trigger={
                            <div className="flex items-center gap-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg px-sm py-xs transition-colors">
                                {/* Circular Avatar Image */}
                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-sm">
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
                                    <div className="w-full h-full bg-slate-300 dark:bg-slate-900 rounded-full flex items-center justify-center" style={{ display: 'none' }}>
                                        <RiUserLine className="text-h6-sm lg:text-h5-sm text-slate-600 dark:text-slate-300" />
                                    </div>
                                </div>
                                <span className="hidden lg:block text-para-sm font-medium text-slate-700 dark:text-slate-200">
                                    Schongham
                                </span>
                                <RiArrowDownSLine className="text-h5-sm text-slate-500 dark:text-slate-400" />
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