import { FaSun, FaMoon } from 'react-icons/fa';
import { IoMoonOutline } from "react-icons/io5";
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="text-text-secondary leading-none"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <IoMoonOutline className="text-para-lg leading-none" />
            ) : (
                <FaSun className="text-para-lg leading-none" />
            )}
        </button>
    );
};

export default ThemeToggle;
