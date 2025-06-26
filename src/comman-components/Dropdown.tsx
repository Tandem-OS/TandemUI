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
        <div ref={dropdownRef} className="relative">
            {/* Trigger */}
            <div onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>

            {/* Dropdown Menu */}
            <div
                className={clsx(
                    'absolute top-full mt-xs bg-white dark:bg-slate-950 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-xs z-50 transition-all duration-200',
                    width,
                    align === 'left' ? 'left-0' : 'right-0',
                    isOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
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