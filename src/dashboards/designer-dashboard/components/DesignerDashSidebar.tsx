import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { RiArrowDownSLine, RiLogoutBoxLine } from 'react-icons/ri';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, type MenuItem } from '../config/menuItems';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { getSubscription, type SubscriptionResponse } from '@/lib/requests/BillingRequest';
// import tandemNewIcon from '@/assets/images/tandem.svg';
import tandemNewIcon from '@/assets/images/logo-new.svg'

// ===== CONSTANTS =====
const ANIMATION_CONFIG = { duration: 0.3, ease: 'easeInOut' as const };
const ICON_SIZE = { width: '18px', height: '18px' };
const EXPAND_DELAY = 100;

// Billing sub-items only visible to Pro users.
// Free users see Subscription only — no billing portal, invoices, or payment methods
// because they have no Stripe customer.
const PRO_ONLY_BILLING_PATHS = [
    '/dashboard/designer/billing/overview',
    '/dashboard/designer/billing/payment-methods',
    '/dashboard/designer/billing/invoices',
    '/dashboard/designer/billing/history',
];

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

// ===== DARK MODE HOOK =====
// Watches document.documentElement for the same class/attribute changes
// that drive sidebar CSS variables — works with any theme implementation.
const useIsDark = (): boolean => {
    const isDarkNow = (): boolean => {
        const el = document.documentElement;
        return (
            el.classList.contains('dark') ||
            el.getAttribute('data-theme') === 'dark' ||
            el.getAttribute('data-color-scheme') === 'dark'
        );
    };

    const [isDark, setIsDark] = useState<boolean>(isDarkNow);

    useEffect(() => {
        const observer = new MutationObserver(() => setIsDark(isDarkNow()));
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'data-theme', 'data-color-scheme'],
        });
        return () => observer.disconnect();
    }, []);

    return isDark;
};

// ===== TOOLTIP =====
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
        setPosition({ top: rect.top + rect.height / 2, left: rect.right + 8 });
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
                    className="fixed px-sm py-xs bg-background-dark text-text-light text-para-sm rounded-md shadow-lg pointer-events-none whitespace-nowrap z-[99999]"
                    style={{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        transform: 'translateY(-50%)',
                    }}
                >
                    {content}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-background-dark" />
                </div>,
                document.body,
            )}
        </>
    );
};

// ===== SECTION LABEL =====
const SectionLabel: React.FC<{ label: string; isCollapsed: boolean }> = ({ label, isCollapsed }) => {
    if (isCollapsed) {
        return <div className="h-px bg-border-default mx-xs my-xs" />;
    }
    return (
        <p className="px-sm pt-md pb-xs text-[10px] font-semibold tracking-widest uppercase text-text-tertiary select-none">
            {label}
        </p>
    );
};

// ===== MENU ITEM =====
const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
    item,
    level,
    isActive,
    isExpanded,
    isCollapsed,
    onToggle,
    onNavigate,
}) => {
    const hasChildren = !!item.children?.length;
    const Icon = item.icon;

    // ── Sub-item (level > 0): dot + text, no icon box ──────────────────────
    if (level > 0) {
        return (
            <Link
                to={item.path!}
                onClick={onNavigate}
                className={clsx(
                    'flex items-center gap-xs pl-[38px] pr-sm py-xs rounded-md text-para-sm transition-colors duration-150',
                    isActive
                        ? 'text-accent-default font-medium'
                        : 'text-text-tertiary hover:text-text-secondary',
                )}
            >
                <span
                    className={clsx(
                        'w-1 h-1 rounded-full flex-shrink-0',
                        isActive ? 'bg-accent-default' : 'bg-text-tertiary',
                    )}
                />
                {item.name}
            </Link>
        );
    }

    // ── Top-level item ──────────────────────────────────────────────────────
    const itemClasses = clsx(
        'flex items-center rounded-lg transition-all duration-200 cursor-pointer select-none group',
        isCollapsed ? 'h-10 w-10 mx-auto justify-center' : 'px-xs py-xs gap-xs',
        isActive ? 'bg-accent-subtle' : 'hover:bg-background-secondary',
    );

    const iconBoxClasses = clsx(
        'w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200',
        isActive
            ? 'bg-accent-default shadow-sm'
            : 'bg-background-muted group-hover:bg-accent-default',
    );

    const iconClasses = clsx(
        'transition-colors duration-200',
        isActive
            ? 'text-accent-foreground'
            : 'text-text-tertiary group-hover:text-accent-foreground',
    );

    const textClasses = clsx(
        'text-para-sm font-medium flex-1 leading-none transition-colors duration-200',
        isActive ? 'text-text-primary' : 'text-text-secondary',
    );

    const content = (
        <>
            <div className={iconBoxClasses}>
                <Icon style={ICON_SIZE} className={iconClasses} />
            </div>
            {!isCollapsed && (
                <>
                    <span className={textClasses}>{item.name}</span>
                    {hasChildren && (
                        <RiArrowDownSLine
                            style={ICON_SIZE}
                            className={clsx(
                                'text-text-tertiary transition-transform duration-200 group-hover:text-text-primary',
                                isExpanded && 'rotate-180',
                            )}
                        />
                    )}
                </>
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

// ===== LOGO =====
const Logo: React.FC<LogoProps> = ({ isCollapsed }) => {
    const isDark = useIsDark();
    const logoFilter = isDark ? 'none' : 'brightness(0)';

    return (
        <AnimatePresence mode="wait">
            {isCollapsed ? (
                <motion.div
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-center"
                >
                    {/* Collapsed — icon only, purple box works on both themes */}
                    <div className="w-8 h-8 rounded-md bg-accent-default flex items-center justify-center flex-shrink-0">
                        <img
                            src={tandemNewIcon}
                            alt="Tandem"
                            className="w-5 h-5 object-contain"
                            style={{ filter: logoFilter }}
                        />
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="expanded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                >
                    {/* Expanded — full logo, filter switches on theme toggle */}
                    <img
                        src={tandemNewIcon}
                        alt="Tandem"
                        className="h-7 w-auto object-contain"
                        style={{ filter: logoFilter }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ===== PLAN CARD =====
const PlanCard: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
    const [subscription, setSubscription] = useState<SubscriptionResponse | null>(null);
    const planFromAuth = useSelector((state: RootState) => state.auth.user.plan);

    useEffect(() => {
        getSubscription()
            .then(setSubscription)
            .catch(() => { /* silent — card simply won't render */ });
    }, []);

    // Hide when collapsed, no data yet, or free plan
    if (isCollapsed || !subscription || !planFromAuth || planFromAuth === 'free') return null;

    const renewalDate = subscription.next_renewal_date
        ? new Date(subscription.next_renewal_date * 1000).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
          })
        : null;

    const isActive = subscription.status === 'active';

    const planLabel = subscription.plan
        ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) + ' plan'
        : 'Pro plan';

    return (
        <div className="mx-sm mb-sm p-sm rounded-xl bg-background-secondary border border-border-default">
            {/* Plan name + active badge */}
            <div className="flex items-center justify-between mb-xs">
                <span className="text-para-sm font-semibold text-text-primary">
                    {planLabel}
                </span>
                {isActive && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-xs py-[2px] rounded-full bg-accent-subtle text-accent-default">
                        Active
                    </span>
                )}
            </div>

            {/* Renewal info */}
            {renewalDate && (
                <p className="text-para-xs text-text-tertiary mb-xs leading-snug">
                    Renews {renewalDate}
                </p>
            )}

            {/* Usage progress bar */}
            <div className="h-1 rounded-full bg-background-muted overflow-hidden mb-sm">
                <div
                    className="h-full rounded-full bg-accent-default"
                    style={{ width: '40%' }}
                />
            </div>

            {/* Manage plan link */}
            <Link
                to="/dashboard/designer/billing/subscription"
                className="text-para-xs font-medium text-accent-default hover:underline"
            >
                Manage plan →
            </Link>
        </div>
    );
};

// ===== SECTION MAP =====
const SECTION_MAP: Record<string, string> = {
    'dashboard':          'WORKSPACE',
    'my-projects':        'WORKSPACE',
    'website-scraper':    'WORKSPACE',
    'testimonials':       'WORKSPACE',
    'subscription':       'SUBSCRIPTION',
    'profile-settings':   'ACCOUNT',
};

const SECTION_ORDER = ['WORKSPACE', 'SUBSCRIPTION', 'ACCOUNT'];

// ===== MAIN SIDEBAR =====
const DesignerDashSidebar: React.FC<DesignerDashSidebarProps> = ({
    onNavigate,
    isCollapsed: externalCollapsed,
    onToggleCollapse,
}) => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState<boolean>(externalCollapsed || false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    // Plan from Redux — used to filter billing nav items
    const planFromAuth = useSelector((state: RootState) => state.auth.user.plan);
    const isPro = planFromAuth === 'pro';

    // Filter menu items based on plan.
    // Free users: hide all Pro-only billing sub-items (Billing overview, Payment methods,
    // Invoices, Billing history). Only Subscription is shown.
    // Pro users: see everything.
    const filteredMenuItems = React.useMemo(() => {
        return menuItems.map(item => {
            if (!item.children?.length) return item;

            // Filter children — remove Pro-only billing paths for Free users
            const filteredChildren = isPro
                ? item.children
                : item.children.filter(
                      child => !PRO_ONLY_BILLING_PATHS.includes(child.path ?? ''),
                  );

            return { ...item, children: filteredChildren };
        });
    }, [isPro]);

    // Auto-expand parent whose child matches current route
    useEffect(() => {
        const parentsToExpand = filteredMenuItems
            .filter(item =>
                item.children?.some(child => location.pathname === (child.path ?? '')),
            )
            .map(item => item.id);

        setExpandedItems(prev => {
            const merged = Array.from(new Set([...prev, ...parentsToExpand]));
            return merged.length === prev.length && parentsToExpand.every(id => prev.includes(id))
                ? prev
                : merged;
        });
    }, [location.pathname, filteredMenuItems]);

    useEffect(() => {
        if (externalCollapsed !== undefined) {
            setIsCollapsed(externalCollapsed);
            if (externalCollapsed) setExpandedItems([]);
        }
    }, [externalCollapsed]);

    const isItemActive = useCallback(
        (item: MenuItem): boolean => location.pathname === (item.path ?? ''),
        [location.pathname],
    );

    const toggleExpanded = useCallback(
        (itemId: string): void => {
            if (isCollapsed) return;
            setExpandedItems(prev =>
                prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId],
            );
        },
        [isCollapsed],
    );

    const handleCollapsedParentClick = useCallback(
        (itemId: string): void => {
            setIsCollapsed(false);
            onToggleCollapse?.();
            setTimeout(() => {
                setExpandedItems(prev => (prev.includes(itemId) ? prev : [...prev, itemId]));
            }, EXPAND_DELAY);
        },
        [onToggleCollapse],
    );

    const renderMenuItem = useCallback(
        (item: MenuItem, level: number = 0): React.ReactNode => {
            const isActive = isItemActive(item);
            const hasChildren = !!item.children?.length;
            const isExpanded = expandedItems.includes(item.id);

            if (isCollapsed && level > 0) return null;

            const handleToggle = (): void => {
                if (isCollapsed && hasChildren) handleCollapsedParentClick(item.id);
                else toggleExpanded(item.id);
            };

            return (
                <div key={item.id}>
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
                        <div className="mt-xs mb-xs">
                            {item.children!.map(child => renderMenuItem(child, level + 1))}
                        </div>
                    )}
                </div>
            );
        },
        [isCollapsed, expandedItems, isItemActive, toggleExpanded, handleCollapsedParentClick, onNavigate],
    );

    // Group filtered items into sections
    const sections = React.useMemo(() => {
        const grouped: Record<string, MenuItem[]> = {};
        for (const item of filteredMenuItems) {
            const section = SECTION_MAP[item.id] ?? 'WORKSPACE';
            if (!grouped[section]) grouped[section] = [];
            grouped[section].push(item);
        }
        return SECTION_ORDER
            .filter(s => grouped[s]?.length)
            .map(s => ({ label: s, items: grouped[s] }));
    }, [filteredMenuItems]);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 256 }}
            transition={ANIMATION_CONFIG}
            className="h-screen bg-background-primary border-r border-border-default flex flex-col overflow-hidden"
        >
            {/* Logo */}
            <div className="px-md py-sm border-b border-border-default">
                <Logo isCollapsed={isCollapsed} />
            </div>

            {/* Nav sections */}
            <nav className="flex-1 overflow-y-auto px-xs py-xs">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isCollapsed ? 'collapsed' : 'expanded'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {sections.map(({ label, items }) => (
                            <div key={label}>
                                <SectionLabel label={label} isCollapsed={isCollapsed} />
                                {items.map(item => renderMenuItem(item))}
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </nav>

            {/* Plan card — Pro only */}
            <PlanCard isCollapsed={isCollapsed} />

            {/* Sign out */}
            <div className="px-sm py-sm border-t border-border-default">
                <button
                    className={clsx(
                        'flex items-center gap-xs text-text-tertiary hover:text-text-secondary transition-colors duration-150 w-full rounded-lg py-xs',
                        isCollapsed ? 'justify-center px-0' : 'px-xs',
                    )}
                >
                    <RiLogoutBoxLine style={ICON_SIZE} />
                    {!isCollapsed && (
                        <span className="text-para-sm font-medium">Sign out</span>
                    )}
                </button>
            </div>
        </motion.aside>
    );
};

export default DesignerDashSidebar;