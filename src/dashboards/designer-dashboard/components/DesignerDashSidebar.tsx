// src/dashboards/designer-dashboard/components/DesignerDashSidebar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { clsx } from 'clsx';
import { menuItems, type MenuItem } from '../config/menuItems';

interface DesignerDashSidebarProps {
    onNavigate?: () => void;
}

const DesignerDashSidebar: React.FC<DesignerDashSidebarProps> = ({ onNavigate }) => {
    const location = useLocation();
    // Initialize expanded items based on active children
    const [expandedItems, setExpandedItems] = useState<string[]>(() => {
        const expanded: string[] = [];
        menuItems.forEach(item => {
            if (item.children) {
                const hasActiveChild = item.children.some(child => location.pathname === child.path);
                if (hasActiveChild) {
                    expanded.push(item.id);
                }
            }
        });
        return expanded;
    });

    const toggleExpanded = (itemId: string) => {
        setExpandedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const isItemActive = (item: MenuItem): boolean => {
        if (location.pathname === item.path) return true;
        if (item.children) {
            return item.children.some(child => location.pathname === child.path);
        }
        return false;
    };

    const renderMenuItem = (item: MenuItem, level: number = 0) => {
        const isActive = isItemActive(item);
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.includes(item.id);

        return (
            <div key={item.id}>
                {hasChildren ? (
                    // For items with children - make entire div clickable for expansion
                    <div
                        className={clsx(
                            'flex items-center justify-between rounded-lg transition-all duration-200 cursor-pointer',
                            'hover:bg-slate-100 dark:hover:bg-slate-800/50',
                            isActive && 'bg-accent-default/5 dark:bg-slate-800/70',
                            level === 0 ? 'px-md py-4 mb-sm' : 'px-lg py-3 mb-sm ml-md'
                        )}
                        onClick={() => toggleExpanded(item.id)}
                    >
                        <div className="flex items-center gap-sm flex-1">
                            <item.icon
                                className={clsx(
                                    'text-h5-sm',
                                    isActive ? 'text-accent-default dark:text-accent-default/90' : 'text-gray-600 dark:text-gray-400'
                                )}
                            />
                            <span
                                className={clsx(
                                    'text-para font-medium leading-[1]',
                                    isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                )}
                            >
                                {item.name}
                            </span>
                        </div>
                        <RiArrowDownSLine
                            className={clsx(
                                'text-h5-sm text-gray-500 dark:text-gray-400 transition-transform duration-200',
                                isExpanded && 'rotate-180'
                            )}
                        />
                    </div>
                ) : (
                    // For items without children - make entire Link clickable
                    <Link
                        to={item.path}
                        className={clsx(
                            'flex items-center gap-sm rounded-lg transition-all duration-200 cursor-pointer',
                            'hover:bg-slate-100 dark:hover:bg-slate-800/50',
                            isActive && 'bg-accent-default/5 dark:bg-slate-800/30',
                            level === 0 ? 'px-md py-4 mb-sm' : 'px-lg py-3 mb-sm ml-md'
                        )}
                        onClick={() => onNavigate?.()}
                    >
                        <item.icon
                            className={clsx(
                                'text-h5-sm',
                                isActive ? 'text-accent-default dark:text-accent-default/90' : 'text-gray-600 dark:text-gray-400'
                            )}
                        />
                        <span
                            className={clsx(
                                'text-para font-medium leading-[1]',
                                isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                            )}
                        >
                            {item.name}
                        </span>
                    </Link>
                )}

                {hasChildren && isExpanded && (
                    <div className="mt-xs">
                        {item.children!.map(child => renderMenuItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <aside className="w-64 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 flex flex-col">
            {/* Logo */}
            <div className="px-md py-md lg:py-sm border-b border-slate-200 dark:border-slate-900">
                <div className="flex items-center gap-sm">
                    <img
                        src="/images/logo.png"
                        alt="Tandem"
                        className="h-8 lg:h-12 w-auto"
                    />
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-sm py-md overflow-y-auto">
                {menuItems.map(item => renderMenuItem(item))}
            </nav>
        </aside>
    );
};

export default DesignerDashSidebar;