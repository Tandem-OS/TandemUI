import React, { memo, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBoxProps {
  value: string;
  onChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
  onClear?: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = memo(({
  value,
  onChange,
  onKeyDown,
  placeholder = "Search...",
  className = "",
  showClearButton = true,
  onClear
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  }, [onChange]);

  const handleClear = useCallback(() => {
    onChange?.('');
    onClear?.();
  }, [onChange, onClear]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <FaSearch className="absolute left-md top-1/2 transform -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-sm rounded-lg bg-background-secondary border border-border-default text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none transition-colors"
        />
        {showClearButton && value && (
          <button
            onClick={handleClear}
            className="absolute right-md top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;