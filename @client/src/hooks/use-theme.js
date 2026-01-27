import { useState, useEffect } from 'react';

/**
 * Custom hook to manage dark mode theme state and sync with DOM.
 * Automatically applies `data-theme` attribute and `.dark` class to document root.
 */
export const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        root.dataset.theme = isDarkMode ? 'dark' : 'light';
        root.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return { isDarkMode, toggleTheme };
};
