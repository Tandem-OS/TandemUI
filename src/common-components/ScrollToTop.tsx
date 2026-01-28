import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scrolls to top smoothly when pathname changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return null; // This component doesn't render anything
};

export default ScrollToTop;
