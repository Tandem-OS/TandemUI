import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, type MenuItem } from '../config/menuItems';

// ===== CONSTANTS =====
const ANIMATION_CONFIG = { duration: 0.3, ease: "easeInOut" as const };
const ICON_SIZE = { width: '18px', height: '18px' };
const EXPAND_DELAY = 100;

// ===== INTERFACES =====
interface Position {
    top: number;
    left: number;
}

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    show: boolean;
}

interface MenuItemComponentProps {
    item: MenuItem;
    level: number;
    isActive: boolean;
    isExpanded: boolean;
    isCollapsed: boolean;
    onToggle: () => void;
    onNavigate?: () => void;
}

interface LogoProps {
    isCollapsed: boolean;
}

interface DesignerDashSidebarProps {
    onNavigate?: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

// ===== STYLE CONFIGURATION =====
const styles = {
    menuItem: {
        base: 'flex items-center rounded-lg transition-all duration-300 cursor-pointer border-l-4 relative',
        hover: 'hover:bg-slate-100 dark:hover:bg-slate-800/50',
        active: {
            expanded: 'bg-blue-500/10 dark:bg-slate-800/70 border-l-blue-500',
            collapsed: 'bg-blue-500/10 dark:bg-blue-500/20 border-l-blue-500'
        },
        inactive: 'border-l-transparent',
        padding: {
            level0: 'px-3 py-3 mb-2',
            nested: 'px-4 py-2.5 mb-1.5 ml-3',
            collapsed: 'h-12 w-12 mx-auto justify-center'
        }
    },
    iconBox: {
        base: 'w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200 shadow-sm',
        active: 'bg-blue-500 shadow-md',
        inactive: 'bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50'
    },
    icon: {
        base: 'transition-colors duration-200',
        active: 'text-white',
        inactive: 'text-gray-600 dark:text-gray-400'
    },
    text: {
        active: 'text-gray-900 dark:text-white',
        inactive: 'text-gray-700 dark:text-gray-300'
    }
};

// ===== TOOLTIP COMPONENT =====
const Tooltip: React.FC<TooltipProps> = ({ children, content, show }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
    const [isPositioned, setIsPositioned] = useState<boolean>(false); // New state to track if position is calculated
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isHovered || !triggerRef.current) {
            setIsPositioned(false);
            return;
        }
        
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({ 
            top: rect.top + rect.height / 2, 
            left: rect.right + 8 
        });
        setIsPositioned(true); // Mark as positioned after calculation
    }, [isHovered]);

    // Reset positioned state when hover ends
    useEffect(() => {
        if (!isHovered) {
            setIsPositioned(false);
        }
    }, [isHovered]);

    if (!show) return <>{children}</>;

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {children}
            </div>
            {isHovered && isPositioned && ReactDOM.createPortal( // Only show when positioned
                <div
                    className="fixed px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-md shadow-lg pointer-events-none whitespace-nowrap z-[99999] transition-opacity duration-150 opacity-100"
                    style={{ 
                        top: `${position.top}px`, 
                        left: `${position.left}px`, 
                        transform: 'translateY(-50%)' 
                    }}
                >
                    {content}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900 dark:border-r-gray-700" />
                </div>,
                document.body
            )}
        </>
    );
};

// ===== MENU ITEM COMPONENT =====
const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
    item,
    level,
    isActive,
    isExpanded,
    isCollapsed,
    onToggle,
    onNavigate
}) => {
    const hasChildren = !!item.children?.length;
    const Icon = item.icon;

    const itemClasses = clsx(
        styles.menuItem.base,
        styles.menuItem.hover,
        isActive ? (isCollapsed ? styles.menuItem.active.collapsed : styles.menuItem.active.expanded) : styles.menuItem.inactive,
        isCollapsed ? styles.menuItem.padding.collapsed : (level === 0 ? styles.menuItem.padding.level0 : styles.menuItem.padding.nested)
    );

    const iconBoxClasses = clsx(
        styles.iconBox.base,
        isActive ? styles.iconBox.active : styles.iconBox.inactive
    );

    const iconClasses = clsx(
        styles.icon.base,
        isActive ? styles.icon.active : styles.icon.inactive
    );
    
    const textClasses = clsx('text-para font-medium leading-[1]', isActive ? styles.text.active : styles.text.inactive);

    const content = (
        <>
            <div className={clsx('flex items-center', !isCollapsed && 'gap-3 flex-1')}>
                <div className={iconBoxClasses}>
                    <Icon style={ICON_SIZE} className={iconClasses} />
                </div>
                {!isCollapsed && <span className={textClasses}>{item.name}</span>}
            </div>
            {!isCollapsed && hasChildren && (
                <RiArrowDownSLine
                    style={ICON_SIZE}
                    className={clsx('text-gray-500 dark:text-gray-400 transition-transform duration-200', isExpanded && 'rotate-180')}
                />
            )}
        </>
    );

    if (hasChildren) {
        return (
            <div className={itemClasses} onClick={onToggle}>
                {content}
            </div>
        );
    }

    return (
        <Link to={item.path!} className={itemClasses} onClick={onNavigate}>
            {content}
        </Link>
    );
};

// ===== LOGO COMPONENT =====
const Logo: React.FC<LogoProps> = ({ isCollapsed }) => (
    <AnimatePresence mode="wait">
        <motion.div
            key={isCollapsed ? 'collapsed' : 'expanded'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={isCollapsed ? 'flex justify-center' : 'flex items-center gap-3'}
        >
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">T</span>
            </div>
            {!isCollapsed && (
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Tandem</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Design Studio</span>
                </div>
            )}
        </motion.div>
    </AnimatePresence>
);

// ===== MAIN SIDEBAR COMPONENT =====
const DesignerDashSidebar: React.FC<DesignerDashSidebarProps> = ({
    onNavigate,
    isCollapsed: externalCollapsed,
    onToggleCollapse
}) => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState<boolean>(externalCollapsed || false);
    const [expandedItems, setExpandedItems] = useState<string[]>(() => {
        return menuItems
            .filter(item => item.children?.some(child => location.pathname === child.path))
            .map(item => item.id);
    });

    // Sync with external collapsed state
    useEffect(() => {
        if (externalCollapsed !== undefined) {
            setIsCollapsed(externalCollapsed);
            if (externalCollapsed) setExpandedItems([]);
        }
    }, [externalCollapsed]);

    const isItemActive = useCallback((item: MenuItem): boolean => {
        return location.pathname === item.path ||
            item.children?.some(child => location.pathname === child.path) || false;
    }, [location.pathname]);

    const toggleExpanded = useCallback((itemId: string): void => {
        if (isCollapsed) return;
        setExpandedItems(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        );
    }, [isCollapsed]);

    const handleCollapsedParentClick = useCallback((itemId: string): void => {
        setIsCollapsed(false);
        onToggleCollapse?.();
        setTimeout(() => {
            setExpandedItems(prev =>
                prev.includes(itemId) ? prev : [...prev, itemId]
            );
        }, EXPAND_DELAY);
    }, [onToggleCollapse]);

    const renderMenuItem = useCallback((item: MenuItem, level: number = 0): React.ReactNode => {
        const isActive = isItemActive(item);
        const hasChildren = !!item.children?.length;
        const isExpanded = expandedItems.includes(item.id);

        // Skip nested items in collapsed view
        if (isCollapsed && level > 0) return null;

        const handleToggle = (): void => {
            if (isCollapsed && hasChildren) {
                handleCollapsedParentClick(item.id);
            } else {
                toggleExpanded(item.id);
            }
        };

        return (
            <div key={item.id} className={level === 0 ? 'mb-1' : ''}>
                <Tooltip content={item.name} show={isCollapsed && level === 0}>
                    <MenuItemComponent
                        item={item}
                        level={level}
                        isActive={isActive}
                        isExpanded={isExpanded}
                        isCollapsed={isCollapsed}
                        onToggle={handleToggle}
                        onNavigate={onNavigate}
                    />
                </Tooltip>
                {hasChildren && isExpanded && !isCollapsed && (
                    <div className="mt-1">
                        {item.children!.map(child => renderMenuItem(child, level + 1))}
                    </div>
                )}
            </div>
        );
    }, [isCollapsed, expandedItems, isItemActive, toggleExpanded, handleCollapsedParentClick, onNavigate]);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 256 }}
            transition={ANIMATION_CONFIG}
            className="h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 flex flex-col"
        >
            {/* Header */}
            <div className="border-b border-slate-200 dark:border-slate-900 flex flex-col">
                <div className="px-4 py-3">
                    <Logo isCollapsed={isCollapsed} />
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isCollapsed ? 'collapsed' : 'expanded'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {menuItems.map(item => renderMenuItem(item))}
                    </motion.div>
                </AnimatePresence>
            </nav>
        </motion.aside>
    );
};

export default DesignerDashSidebar;