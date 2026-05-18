import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, type MenuItem } from '../config/menuItems';
import tandemLogoDark from '@/assets/images/tandem-logo-dark.png';

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
        base: 'flex items-center rounded-[38px] transition-all duration-300 cursor-pointer relative group',
        active: {
            expanded: 'bg-blue-violet border-l-accent-default',
            collapsed: 'bg-blue-violet border-l-accent-default'
        },
        inactive: 'border-l-transparent hover:bg-blue-violet hover:border-l-accent-default',
        padding: {
            level0: 'px-sm py-sm mb-sm',
            nested: 'px-md py-sm mb-xs ml-sm',
            collapsed: 'h-12 w-12 mx-auto justify-center'
        }
    },
    iconBox: {
        base: 'w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200 shadow-sm bg-transparent',
        active: 'bg-accent-default shadow-md',
        inactive: 'bg-background-muted dark:bg-background-primary group-hover:bg-accent-default group-hover:shadow-md'
    },
    icon: {
        base: 'transition-colors duration-200',
        active: 'text-accent-foreground',
        inactive: 'text-text-tertiary group-hover:text-accent-foreground'
    },
    text: {
        active: 'text-text-light',
        inactive: 'text-text-tertiary group-hover:text-text-light'
    }
};

// ===== TOOLTIP COMPONENT =====
const Tooltip: React.FC<TooltipProps> = ({ children, content, show }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
    const [isPositioned, setIsPositioned] = useState<boolean>(false);
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
        setIsPositioned(true);
    }, [isHovered]);

    useEffect(() => {
        if (!isHovered) setIsPositioned(false);
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
            {isHovered && isPositioned && ReactDOM.createPortal(
                <div
                    className="fixed px-sm py-xs bg-background-dark text-text-light text-para-sm rounded-md shadow-lg pointer-events-none whitespace-nowrap z-[99999] transition-opacity duration-150 opacity-100"
                    style={{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        transform: 'translateY(-50%)'
                    }}
                >
                    {content}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-background-dark" />
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
        isActive
            ? (isCollapsed ? styles.menuItem.active.collapsed : styles.menuItem.active.expanded)
            : styles.menuItem.inactive,
        isCollapsed
            ? styles.menuItem.padding.collapsed
            : (level === 0 ? styles.menuItem.padding.level0 : styles.menuItem.padding.nested)
    );

    const iconBoxClasses = clsx(
        styles.iconBox.base,
        isActive ? styles.iconBox.active : styles.iconBox.inactive
    );

    const iconClasses = clsx(
        styles.icon.base,
        isActive ? styles.icon.active : styles.icon.inactive
    );

    const textClasses = clsx(
        'text-para-md font-medium leading-[1] transition-colors duration-200',
        isActive ? styles.text.active : styles.text.inactive
    );

    const content = (
        <>
            <div className={clsx('flex items-center', !isCollapsed && 'gap-sm flex-1')}>
                <div className={iconBoxClasses}>
                    <Icon style={ICON_SIZE} className={iconClasses} />
                </div>
                {!isCollapsed && <span className={textClasses}>{item.name}</span>}
            </div>
            {!isCollapsed && hasChildren && (
                <RiArrowDownSLine
                    style={ICON_SIZE}
                    className={clsx(
                        'text-text-tertiary transition-all duration-200 group-hover:text-text-primary',
                        isExpanded && 'rotate-180'
                    )}
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
// Uses new Tandem transparent logo — Dylan's updated branding
const Logo: React.FC<LogoProps> = ({ isCollapsed }) => (
    <AnimatePresence mode="wait">
        <motion.div
            key={isCollapsed ? 'collapsed' : 'expanded'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={isCollapsed ? 'flex justify-center' : 'flex items-center'}
        >
            {isCollapsed ? (
                // Collapsed: show dark logo cropped to icon area
                <img
                    src={tandemLogoDark}
                    alt="Tandem"
                    className="w-9 h-9 object-cover object-left"
                />
            ) : (
                // Expanded: show full dark logo — transparent background, white text
                <img
                    src={tandemLogoDark}
                    alt="Tandem"
                    className="h-8 w-auto object-contain"
                />
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
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    useEffect(() => {
        const parentsToExpand = menuItems
            .filter(item =>
                item.children?.some(child => location.pathname === (child.path ?? ''))
            )
            .map(item => item.id);

        setExpandedItems(prev => {
            const merged = Array.from(new Set([...prev, ...parentsToExpand]));
            return merged.length === prev.length && parentsToExpand.every(id => prev.includes(id))
                ? prev
                : merged;
        });
    }, [location.pathname]);

    useEffect(() => {
        if (externalCollapsed !== undefined) {
            setIsCollapsed(externalCollapsed);
            if (externalCollapsed) setExpandedItems([]);
        }
    }, [externalCollapsed]);

    const isItemActive = useCallback((item: MenuItem): boolean => {
        return location.pathname === (item.path ?? '');
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

        if (isCollapsed && level > 0) return null;

        const handleToggle = (): void => {
            if (isCollapsed && hasChildren) {
                handleCollapsedParentClick(item.id);
            } else {
                toggleExpanded(item.id);
            }
        };

        return (
            <div key={item.id} className={level === 0 ? 'mb-xs' : ''}>
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
                    <div className="mt-xs">
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
            className="h-screen bg-background-primary-3 border-r border-border-default flex flex-col"
        >
            {/* Header */}
            <div className="border-border-default flex flex-col">
                <div className="px-md py-2.5">
                    <Logo isCollapsed={isCollapsed} />
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-sm py-md overflow-y-auto">
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

            <div className="p-md mt-auto">
                <button className="flex items-center gap-sm text-text-light hover:text-white w-full px-sm py-xs transition">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
                    </svg>
                    <span className="text-sm font-medium">Sign Out</span>
                </button>
            </div>
        </motion.aside>
    );
};

export default DesignerDashSidebar;
