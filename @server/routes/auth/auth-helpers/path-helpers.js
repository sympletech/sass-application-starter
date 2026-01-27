export const clientBase = process.env.VITE_MODE === 'development'
    ? `http://localhost:${process.env.VITE_CLIENT_PORT}`
    : '/';

export const loggedInRedirect = `${clientBase}/@`;

export const reactivateRedirect = (email) => `${clientBase}/reactivate?email=${encodeURIComponent(email)}`;