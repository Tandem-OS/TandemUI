import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenuLine, RiSettings4Line, RiLogoutBoxLine, RiArrowDownSLine } from 'react-icons/ri';
import { clsx } from 'clsx';
import Drawer from '../../../comman-components/Drawer';
import Dropdown from '../../../comman-components/Dropdown';
import ThemeToggle from '../../../components/theme-toggle/ThemeToggle';
import { menuItems } from '../config/menuItems';

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    // Avatar image URL
    const avatarUrl = "/images/avatar.png";

    const profileDropdownItems = [
        {
            id: 'settings',
            label: 'Settings',
            icon: <RiSettings4Line />,
            onClick: () => navigate('/settings')
        },
        {
            id: 'logout',
            label: 'Logout',
            icon: <RiLogoutBoxLine />,
            divider: true,
            onClick: () => {
                // Handle logout logic
                console.log('Logout');
            }
        }
    ];

    return (
        <>
            <header className="bg-background-primary-2 sticky top-0 z-50 border-b border-border-default leading-none">
                <div className="container mx-auto px-md">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/dashboard/client" className="flex items-center">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="h-8 w-auto"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-lg">
                            {menuItems.map((item: any) => (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className={clsx(
                                        'text-para-md font-poppins text-text-secondary',
                                        'hover:text-accent-default',
                                        'transition-colors duration-200'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Theme Toggle */}
                            <div>
                                <ThemeToggle />
                            </div>

                            {/* Profile Dropdown */}
                            <Dropdown
                                trigger={
                                    <div className="flex items-center gap-sm cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border-default hover:border-accent-default transition-colors">
                                            <img
                                                src={avatarUrl}
                                                alt="Profile Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <RiArrowDownSLine className="text-text-tertiary group-hover:text-accent-default transition-colors" />
                                    </div>
                                }
                                items={profileDropdownItems}
                            />
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="lg:hidden p-sm rounded-lg hover:bg-background-muted transition-colors"
                        >
                            <RiMenuLine className="text-h4-sm text-text-secondary" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                position="right"
                width="w-72"
            >
                <div className="p-lg">
                    {/* Drawer Header */}
                    <div className="mb-lg">
                        <h3 className="text-h4-md font-poppins text-text-primary">
                            Menu
                        </h3>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center gap-md mb-lg pb-lg border-b border-border-default">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border-default">
                            <img
                                src={avatarUrl}
                                alt="Profile Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-para-md font-poppins text-text-primary">
                                John Doe
                            </p>
                            <p className="text-para-sm text-text-tertiary">
                                john@example.com
                            </p>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <nav className="space-y-sm mb-lg">
                        {menuItems.map((item: any) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                onClick={() => setIsDrawerOpen(false)}
                                className={clsx(
                                    'block px-md py-sm rounded-lg text-para-md font-poppins',
                                    'text-text-secondary',
                                    'hover:bg-background-muted',
                                    'hover:text-accent-default',
                                    'transition-all duration-200'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Theme Toggle Section */}
                    <div className="flex items-center justify-between py-md border-t border-border-default">
                        <span className="text-para-md font-poppins text-text-secondary">
                            Dark Mode
                        </span>
                        <ThemeToggle />
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-lg space-y-sm">
                        <button
                            onClick={() => {
                                setIsDrawerOpen(false);
                                navigate('/settings');
                            }}
                            className={clsx(
                                'w-full flex items-center gap-sm px-md py-sm rounded-lg',
                                'text-para-md font-poppins text-text-secondary',
                                'hover:bg-background-muted',
                                'transition-colors duration-200'
                            )}
                        >
                            <RiSettings4Line className="text-h6-sm" />
                            Settings
                        </button>
                        <button
                            onClick={() => {
                                setIsDrawerOpen(false);
                                console.log('Logout');
                            }}
                            className={clsx(
                                'w-full flex items-center gap-sm px-md py-sm rounded-lg',
                                'text-para-md font-poppins text-text-error',
                                'hover:bg-background-error',
                                'transition-colors duration-200'
                            )}
                        >
                            <RiLogoutBoxLine className="text-h6-sm" />
                            Logout
                        </button>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default Header;