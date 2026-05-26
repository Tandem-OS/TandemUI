import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenuLine, RiSettings4Line, RiLogoutBoxLine, RiArrowDownSLine } from 'react-icons/ri';
import { clsx } from 'clsx';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import Drawer from '../../../common-components/Drawer';
import Dropdown from '../../../common-components/Dropdown';
import ThemeToggle from '../../../components/theme-toggle/ThemeToggle';
import ProBadge from '../../../common-components/ProBadge';
import { menuItems } from '../config/menuItems';
import tandemLogoLight from '@/assets/images/tandem-logo-light.png';

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const plan = useSelector((state: RootState) => state.auth.user?.plan);
    const userName = useSelector((state: RootState) => state.auth.user?.name);
    const userEmail = useSelector((state: RootState) => state.auth.user?.email);
    const isPro = plan?.toLowerCase() === 'pro';

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
            onClick: () => {}
        }
    ];

    return (
        <>
            <header className="bg-background-primary-2 sticky top-0 border-b border-border-default leading-none z-20">
                <div className="container mx-auto px-md">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo — new Tandem branding */}
                        <Link to="/dashboard/client" className="flex items-center">
                            <img
                                src={tandemLogoLight}
                                alt="Tandem"
                                className="h-8 w-auto object-contain"
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

                            <ThemeToggle />

                            <Dropdown
                                trigger={
                                    <div className="flex items-center gap-sm cursor-pointer group">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border-default hover:border-accent-default transition-colors">
                                                <img
                                                    src={avatarUrl}
                                                    alt="Profile Avatar"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {isPro && (
                                                <ProBadge
                                                    size="sm"
                                                    className="absolute -bottom-1 -right-1"
                                                />
                                            )}
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
                    <div className="mb-lg">
                        <h3 className="text-h4-md font-poppins text-text-primary">
                            Menu
                        </h3>
                    </div>

                    <div className="flex items-center gap-md mb-lg pb-lg border-b border-border-default">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border-default">
                                <img
                                    src={avatarUrl}
                                    alt="Profile Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isPro && (
                                <ProBadge
                                    size="sm"
                                    className="absolute -bottom-1 -right-1"
                                />
                            )}
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-xs">
                                <p className="text-para-md font-poppins text-text-primary truncate">
                                    {userName ?? 'User'}
                                </p>
                                {isPro && <ProBadge size="md" />}
                            </div>
                            <p className="text-para-sm text-text-tertiary truncate">
                                {userEmail ?? ''}
                            </p>
                        </div>
                    </div>

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

                    <div className="flex items-center justify-between py-md border-t border-border-default">
                        <span className="text-para-md font-poppins text-text-secondary">
                            Dark Mode
                        </span>
                        <ThemeToggle />
                    </div>

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
