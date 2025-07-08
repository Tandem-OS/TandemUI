import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBoxProps {
  value: string;
  onChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
  onClear?: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder = "Search...",
  className = "",
  showClearButton = true,
  onClear
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
  };

  const handleClear = () => {
    onChange?.('');
    onClear?.();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-5 left-0 pl-md lg:pl-lg flex items-center pointer-events-none">
        <FaSearch className="text-text-secondary text-icon-sm" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full pl-11 lg:pl-2xl pr-md py-md bg-background-primary-2 border border-border-default rounded-2xl text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-default focus:border-accent-default transition-all duration-300 text-para-sm lg:text-para-md hover:shadow-md"
      />
      {showClearButton && value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-lg flex items-center text-text-secondary hover:text-text-primary transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBox;