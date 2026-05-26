import { useState, useEffect } from 'react';
import tandemLogoWhite from '@/assets/images/logo-new.svg';
import tandemLogoLight from '@/assets/images/logo-new-light.png';
import ThemeToggle from "@/components/theme-toggle/ThemeToggle";

// ===== DARK MODE HOOK =====
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

const SimpleHeader = () => {
  const isDark = useIsDark();
  const logoSrc = isDark ? tandemLogoWhite : tandemLogoLight;

  return (
    <div className="flex justify-between items-center px-lg py-md">
      <img
        src={logoSrc}
        alt="Tandem"
        className="h-8 w-auto object-contain"
      />
      <ThemeToggle />
    </div>
  );
};

export default SimpleHeader;