import { useEffect } from 'react';

/**
 * Hook to handle scroll-reveal animations using IntersectionObserver.
 * It observes all elements with the '.reveal' class and adds '.reveal-visible' when they enter the viewport.
 */
export const useReveal = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);
};
