// src/common-components/Dropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';

interface DropdownItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    divider?: boolean;
}

interface DropdownProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
    align?: 'left' | 'right';
    width?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
    trigger,
    items,
    align = 'right',
    width = 'w-48'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block">
            {/* Trigger - Using button for stability */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="block"
                type="button"
            >
                {trigger}
            </button>

            {/* Dropdown Menu - Always rendered but hidden */}
            <div
                style={{
                    visibility: isOpen ? 'visible' : 'hidden',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
                    transition: 'opacity 150ms, transform 150ms, visibility 150ms'
                }}
                className={clsx(
                    'absolute top-full mt-xs bg-white dark:bg-slate-950 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-xs z-50',
                    width,
                    align === 'left' ? 'left-0' : 'right-0'
                )}
            >
                {items.map((item, index) => (
                    <React.Fragment key={item.id}>
                        {item.divider && index > 0 && (
                            <div className="h-px bg-slate-200 dark:bg-slate-900 my-xs mx-sm" />
                        )}
                        <button
                            onClick={() => {
                                item.onClick?.();
                                setIsOpen(false);
                            }}
                            className="w-full px-md py-sm text-left hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center gap-sm"
                            type="button"
                        >
                            {item.icon && (
                                <span className="text-h6-sm text-slate-500 dark:text-slate-400">
                                    {item.icon}
                                </span>
                            )}
                            <span className="text-para-sm text-slate-700 dark:text-slate-200">
                                {item.label}
                            </span>
                        </button>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;