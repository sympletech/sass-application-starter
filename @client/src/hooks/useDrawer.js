import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to manage drawer visibility state.
 * Automatically closes drawer when route changes.
 */
export const useDrawer = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setDrawerVisible(false);
    }, [location]);

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    return { drawerVisible, toggleDrawer };
};
