import { useState, useEffect } from 'react';

/**
 * Custom hook to detect responsive breakpoints.
 * Returns true when viewport width is below 768px (mobile).
 */
export const useResponsive = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMobile };
};
