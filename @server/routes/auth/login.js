import bcrypt from 'bcryptjs';
import { db } from '@server/lib/mongo-client.js';
import { clientBase, reactivateRedirect, loggedInRedirect } from '../../lib/client-path-helpers.js';

export default async ({ email, password }, { req }) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const user = await db.collections.accounts.findOne({ email });

    // If user doesn't exist, the client should redirect to signup
    if (!user) {
        return {
            success: false,
            redirect: '/signup',
            message: 'No account found. Please sign up for a free trial!'
        };
    }

    if (user.isSocial) {
        const providerHint = user.oauthProvider === 'google' || user.oauthProvider === 'facebook'
            ? `Use your ${user.oauthProvider.charAt(0).toUpperCase()}${user.oauthProvider.slice(1)} account`
            : 'Use your social login';
        const err = new Error(providerHint);
        err.status = 400;
        err.redirect = `${clientBase}/login`;
        throw err;
    }

    if (user.inactive) {
        const err = new Error('Account inactive. Please reactivate.');
        err.status = 403;
        err.redirect = reactivateRedirect(email);
        throw err;
    }

    const salt = process.env.PASSWORD_SALT || 'default_salt';
    const isMatch = await bcrypt.compare(password + salt, user.password || '');

    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    req.session.userId = user._id.toString();
    req.session.email = user.email;

    return {
        success: true,
        message: 'Login successful',
        redirect: loggedInRedirect
    };
};