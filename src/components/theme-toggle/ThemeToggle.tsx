import { FaSun, FaMoon } from 'react-icons/fa';
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
                <FaMoon className="text-para-lg leading-none" />
            ) : (
                <FaSun className="text-para-lg leading-none" />
            )}
        </button>
    );
};

export default ThemeToggle;
