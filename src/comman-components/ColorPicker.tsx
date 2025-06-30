import React, { useState } from 'react';
import { RiSettings4Line } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { type AccentColor } from '../types/component.types';

// Fixed Color Picker
interface ColorPickerProps {
    accentColor: AccentColor;
    setAccentColor: (color: AccentColor) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ accentColor, setAccentColor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const colors: AccentColor[] = ['blue', 'purple', 'emerald', 'rose', 'amber'];

    const colorPreview = {
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        emerald: 'bg-emerald-500',
        rose: 'bg-rose-500',
        amber: 'bg-amber-500'
    };

    return (
        <div className="fixed top-[70px] right-[20px] z-50">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
            >
                <RiSettings4Line className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute top-full right-0 mt-3 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                    >
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Theme Color</p>
                        <div className="flex gap-3">
                            {colors.map((color) => (
                                <motion.button
                                    key={color}
                                    onClick={() => {
                                        setAccentColor(color);
                                        setIsOpen(false);
                                    }}
                                    className={`w-10 h-10 rounded-lg ${colorPreview[color]} shadow-lg ${accentColor === color ? `ring-2 ring-offset-2 ring-slate-400 dark:ring-slate-600 shadow-xl` : ''
                                        }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.15 }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ColorPicker